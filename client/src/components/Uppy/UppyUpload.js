import {useRef,useEffect} from 'react';

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/url/dist/style.css";

import Url from "@uppy/url";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";
import ImageCompressor from 'uppy-plugin-image-compressor';
import { DashboardModal } from "@uppy/react";
import axios from 'axios';



function UppyUpload() {

  const dashboard=useRef();
  let imageUrl='';

 
  useEffect(()=>{
    if(dashboard.current){
      const btn =dashboard.current.container.querySelector(`[aria-controls="uppy-DashboardContent-panel--Url"]`);
      btn.setAttribute("class","hidden");
      const broweseBtn=dashboard.current.container.querySelector(".uppy-Dashboard-browse");
      
      console.log(broweseBtn)
      console.log(dashboard.current.container.querySelector(".uppy-Dashboard-AddFiles-title").textContent =`Drop files or `);
      console.log(dashboard.current.container.querySelector(".uppy-Dashboard-AddFiles-title").appendChild(broweseBtn));
    }
  },[dashboard,imageUrl])
  let count = 0;

  const uppy = new Uppy({ maxFileSize: 50000000 })
    .use(Url, {
      target: null,
      companionUrl: "https://companion.uppy.io/",
      locale: {},
    }).use(XHRUpload, {
      endpoint: "https://xhr-server.herokuapp.com/upload/",
      fieldName: "photo",
      FormData: true,
    }).use(ImageCompressor, {
      quality: 0.6,
    }).on("upload-success",async (file, response) => {
      console.log("response", response);
      console.log("file", file); // extracted response data;
      const prefix = "https://deepbase.herokuapp.com/image_url?name=";
      const prefix2 = "https://deepbase1.herokuapp.com/image_url?name=";
      let res = prefix.concat(response.body.url);
      let res2 = prefix2.concat(response.body.url);
      let metaUrl = `|${file.name}|${file.type}|${file.size}`;
      let fullUrl = res.concat(metaUrl);
      let fullUrl2 = res2.concat(metaUrl);
      console.log("fullUrl", fullUrl,fullUrl2);
      imageUrl=response.body.url;

      try{
        const getResponse = await axios.get(fullUrl);
        const getResponse2 = await axios.get(fullUrl2);
        const {data} = await axios.get("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572");

        if(getResponse.status === 200){
          count++;
        }
        document.querySelector(".uppy-DashboardContent-title").textContent=`${count} Upload complete`;
        
        const userInfo = {
          city:data.city, 
          country_name:data.country_name,
          country_code:data.country_code,
          appCodeName: navigator.appCodeName,
          appName: navigator.appName,
          appVersion: navigator.appVersion,
          cookieEnabled: navigator.cookieEnabled,
          language: navigator.language,
          onLine: navigator.onLine,
          platform: navigator.platform,
          product: navigator.product,
          userAgent: navigator.userAgent,
          screenHeight: window.screen.height,
          screenWidth: window.screen.width,
          screenPixelDepth: window.screen.pixelDepth
        }
        let url=(process.env.NODE_ENV==='development')?'http://localhost:5000/api':'https://deepbase-upload.herokuapp.com/api';

        

        const postUserInfo = await axios.post(url,userInfo);
        console.log("userInfo:",userInfo);
        
     }catch(err){
             console.log(err); 
     }
    })

  return (
    <div>
      <DashboardModal
        ref={dashboard}
        uppy={uppy}
        plugins={[ "Url"]}
      />
    </div>
  


  );
}

export default UppyUpload;

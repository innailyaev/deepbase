import {useRef,useEffect} from 'react';
import "./uppyUpload.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/url/dist/style.css";

import Url from "@uppy/url";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import axios from 'axios';


function UppyUpload({signUrl}) {

  const dashboard=useRef();

  useEffect(()=>{
    if(dashboard.current){
      const btn =dashboard.current.container.querySelector(`[aria-controls="uppy-DashboardContent-panel--Url"]`);
      btn.setAttribute("class","hidden");
      const broweseBtn=dashboard.current.container.querySelector(".uppy-Dashboard-browse");
      console.log(broweseBtn)
      // dashboard.current.container.querySelector(".uppy-size--md .uppy-Dashboard-AddFiles-title").setAttribute('contentEditable',true)
      // dashboard.current.container.querySelector(".uppy-size--md .uppy-Dashboard-AddFiles-title").setAttribute('dangerouslySetInnerHTML', { __html: `drop files here ${broweseBtn}`});

      console.log(dashboard.current.container.querySelector(".uppy-Dashboard-AddFiles-title").textContent =`Drop files or `);
      console.log(dashboard.current.container.querySelector(".uppy-Dashboard-AddFiles-title").appendChild(broweseBtn));


    }
  },[dashboard])
  let count = 0;

  const uppy = new Uppy({ maxFileSize: 20000000 })
    .use(Url, {
      target: null,
      companionUrl: "https://companion.uppy.io/",
      locale: {},
    }).use(XHRUpload, {
      endpoint: "https://xhr-server.herokuapp.com/upload/",
      fieldName: "photo",
      FormData: true,
    })
    .on("upload-success",async (file, response) => {
      console.log("response.status", response.status); // HTTP status code
      console.log("response.uploadURL", response.body);
      console.log("response", response);
      console.log("file", file); // extracted response data;
      const prefix = "https://deepbase.herokuapp.com/image_url?name=";
      let res = prefix.concat(response.body.url);
      console.log("res", res);
      try{
        const getResponse = await axios.get(res);
        signUrl(response.body.url);
        if(getResponse.status === 200){
          count++;
        }
        console.log("count",count);
        console.log(getResponse); 
        document.querySelector(".uppy-DashboardContent-title").textContent=`${count} Upload complete`;

     }catch(err){
             console.log(err); 
     }
    });
  return (
    <DashboardModal
      ref={dashboard}
      uppy={uppy}
      plugins={[ "Url"]}
    />
  );
}

export default UppyUpload;

import {useRef,useEffect} from 'react';
import "./App.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/url/dist/style.css";

import Url from "@uppy/url";
import XHRUpload from "@uppy/xhr-upload";
import Uppy from "@uppy/core";
import ImageCompressor from'uppy-plugin-image-compressor';
import { DashboardModal } from "@uppy/react";
import axios from 'axios';




function App() {

  const dashboard=useRef();
  let imageUrl='';

  // const [details, setDetails] = useState(null);
  // const getUserGeolocationDetails = async() => {
  //   let {data} = await axios.get("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
    // setDetails(data);
    // {`${details.city}, ${details.country_name}(${details.country_code})`}
    


  // useEffect(()=>{
  //   getUserGeolocationDetails();
  // },[])

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
  },[dashboard,imageUrl])
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
    }).use(ImageCompressor, {
      quality: 0.6,
    }).on("upload-success",async (file, response) => {
      console.log("response", response);
      console.log("file", file); // extracted response data;
      const prefix = "https://deepbase.herokuapp.com/image_url?name=";
      let res = prefix.concat(response.body.url);
      console.log("res", res);
      imageUrl=response.body.url;

      try{
        const getResponse = await axios.get(res);
        if(getResponse.status === 200){
          count++;
        }
        document.querySelector(".uppy-DashboardContent-title").textContent=`${count} Upload complete`;
        
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        });
        console.log("appCodeName:",navigator.appCodeName);
        console.log("appName:",navigator.appName);
        console.log("appVersion:",navigator.appVersion);
        console.log("cookieEnabled:",navigator.cookieEnabled);
        console.log("language:",navigator.language);
        console.log("onLine:",navigator.onLine);
        console.log("platform:",navigator.platform);
        console.log("product:",navigator.product);
        console.log("userAgent:",navigator.userAgent);
        console.log("screen.height:",window.screen.height);
        console.log("screen.width::",window.screen.width);
        console.log("screen.pixelDepth::",window.screen.pixelDepth);



     }catch(err){
             console.log(err); 
     }
    })

  return (
      <DashboardModal
        ref={dashboard}
        uppy={uppy}
        plugins={[ "Url"]}
      />

      
  
      
 
  );
  }


export default App;

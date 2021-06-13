import {useState,useRef,useEffect} from 'react';
import "./App.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/url/dist/style.css";

import Webcam from "@uppy/webcam";
import Url from "@uppy/url";
import XHRUpload from "@uppy/xhr-upload";
import Tus from "@uppy/tus";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import axios from 'axios';


function App() {


  //const [count,setCount] = useState(0);
  const dashboard=useRef();
  useEffect(()=>{
    console.log('test')
    if(dashboard.current){
      console.log(dashboard.current.container)
      const btn =dashboard.current.container.querySelector(`[aria-controls="uppy-DashboardContent-panel--Url"]`);
      console.log(btn)
      btn.setAttribute("class","hidden");
    }
  },[dashboard])
  let count = 0;
  document.querySelector(".uppy-DashboardContent-title");
  const uppy = new Uppy({ maxFileSize: 20000000 })
    .use(Url, {
      target: null,
      companionUrl: "https://companion.uppy.io/",
      locale: {},
    }).use(XHRUpload, {
      endpoint: "https://xhr-server.herokuapp.com/upload/",
      fieldName: "photo",
      FormData: true,
      // }).use(Tus, {
      //   endpoint: 'https://tusd.tusdemo.net/files/', // use your tus endpoint here
      //   resume: true,
      //   retryDelays: [0, 1000, 3000, 5000]
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
        const response = await axios.get(res);
        if(response.status === 200){
          // setCount(prevState=>prevState+1);
          count++;
        }
        console.log("count",count);
        console.log(response); 
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


export default App;

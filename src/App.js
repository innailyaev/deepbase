import "./App.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/file-input/dist/style.css";
import '@uppy/url/dist/style.css';

import { useState } from "react";
import Webcam from "@uppy/webcam";
import Url from '@uppy/url';
import XHRUpload from '@uppy/xhr-upload';
import Tus from '@uppy/tus';
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const uppy = new Uppy({ maxFileSize: 20000000 })
    .use(Webcam, {
      id: "Webcam",
      modes: ["picture"],
    }).use(Url, {
      target: null,
      companionUrl: 'https://companion.uppy.io/',
      locale: {}
    }).use(XHRUpload, {
      endpoint: 'https://xhr-server.herokuapp.com/upload/',
      fieldName:'photo',
      FormData:true
    // }).use(Tus, {
    //   endpoint: 'https://tusd.tusdemo.net/files/', // use your tus endpoint here
    //   resume: true,
    //   retryDelays: [0, 1000, 3000, 5000]
    }).on('upload-success', (file, response) => {
      console.log("response.status",response.status);// HTTP status code
      console.log("response.uploadURL",response.body);
      console.log("file",file);   // extracted response data;
      const prefix = 'https://deepbase.herokuapp.com/image_url?name=';
      let res = prefix.concat(response.body.url);
      console.log("res",res);   
    })
  return (
    <DashboardModal
      uppy={uppy}
      open={open}
      onRequestClose={handleClose}
      plugins={["Webcam","Url"]}
    />
  );
}

export default App;

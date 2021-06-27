import {useRef,useEffect,useState} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import UppyUpload from './components/Uppy/UppyUpload';
import Button from './components/Button/Button';
import "./App.css";




function App() {


  return (
    <div>
      <BrowserRouter>
        <Route path='/' exact component={UppyUpload} />
        <Route path='/button' exact component={Button} />
      </BrowserRouter> 
    </div>
  


  );
}

export default App;

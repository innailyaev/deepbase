import { useState } from "react";
import UppyUpload from "../Uppy/UppyUpload";
import './Button.css';

const Button = () =>{

    const [popUpSeen,setPopUpSeen] = useState(false);

    const togglePop = () => {
        console.log(popUpSeen);
        setPopUpSeen(!popUpSeen);
    };  

    return (
        <>
            <button className="btn" onClick={togglePop}>click</button>
            {
                    popUpSeen ? <UppyUpload/> : null
            }
        </>

    )
}

export default Button;
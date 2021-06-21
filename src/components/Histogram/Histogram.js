
const his4gram = require('his4gram');

const Histogram =  ({url})=>{
    console.log("frommmmmmmmmmmmmmmmmm histogram",url);
    let URL = 'https://api.allorigins.win/raw?url=https://www.guidedogs.org/wp-content/uploads/2019/11/website-donate-mobile.jpg';
    his4gram(URL, './Histogram-imageOutput.jpg');
    return null;
}
export default Histogram


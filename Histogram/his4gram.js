// let his4gram = require('his4gram');
var his4gram = require('./histogram');

let URL = 'https://api.allorigins.win/raw?url=https://www.guidedogs.org/wp-content/uploads/2019/11/website-donate-mobile.jpg';
his4gram(URL, './imageOutput.jpg');

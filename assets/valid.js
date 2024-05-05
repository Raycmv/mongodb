const sanitizeHtml = require('sanitize-html');
const validator = require('validator');

const regexp =/(?:[\\(\);\/<>]|%28|%29|%3b|%2f|%3c|%3e|\\u0028|\\u0029|\\u003b|\\u002f|\\u003c|\\u003e)/;
const valid = {};

valid.text = (txt)=>{
    // Validación de texto
    const textRegexp = /^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]+$/g;
    
    if (typeof txt !== 'string' || regexp.test(txt)) {
        txt = null;
        return 'Danger'; // No es una cadena
    }
    const sanaTxt = sanitizeHtml(txt);
    const validTxt = validator.escape(txt);
 
    if( !txt || sanaTxt !== txt || validTxt !== txt){
        // Se ha detectado código HTML o JavaScript
        txt = null;
        return 'Danger';
    } else if (!txt.match(textRegexp) || txt.length < 2 || txt.length > 30) {
        return 'Invalid';
    }
    return 'Valid'
}
valid.number = (num)=>{
    // Validación de numeros
    const numRegexp = /^[0-9]+$/;
    const numFloat = parseFloat(num);

    if (isNaN(numFloat) || !isFinite(numFloat) || regexp.test(num)) {
        num = null;
        return 'Danger'; // No es un numero
    } else if(!num || !num.match(numRegexp)){
        num = null;
        return 'Invalid';
    }
    return 'Valid';
}

valid.mixta = (param, mixtoRegexp) => {
    if (typeof param !== 'string' || regexp.test(param)) {
        param = null;
        return 'Danger'; // No es una cadena
    } else if (!param || !param.match(mixtoRegexp)){
        email = null;
        return 'Invalid';
    }
    return 'Valid';
}

valid.email = (email) =>{
    const emailRegexp = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
    // Validación de correo electrónico
    if (typeof email !== 'string' || regexp.test(email)) {
        email = null;
        return 'Danger'; // No es una cadena
    }
    
    if (!email || !email.match(emailRegexp)) {
        email = null;
        return 'Invalid';
    }
    return 'Valid';
}

valid.password = (passw) => {
    // Validación de contraseña
    if (!passw || typeof passw !== 'string' || passw.length < 6 || passw.length > 20) {
        passw = null;
        return 'Invalid';
    }
}

module.exports = valid;


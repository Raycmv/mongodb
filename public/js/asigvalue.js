import {key, keyUp, objForm} from './arrTecl.js';
import crearTecl from './teclad.js';
let teclUp = false;

export default function asignValue(val, inptid, inpt){

    if(val == "Space"){
        if(!inptid.match(/passw/) && objForm[inptid].length >0){
            objForm[inptid] += " ";
        }else {
            return
        }
    }else if(val == "C. Letter"){
        if(teclUp){
            crearTecl(key); teclUp = false
        }else{
            crearTecl(keyUp); teclUp = true
        }
    }else if(val == "🔙"){
        let carc= '';
        for(let x = 0; x < objForm[inptid].length-1; x++){
            carc += objForm[inptid][x]
        }
        objForm[inptid] = carc;
    }else if(val=="Clear"){
        objForm[inptid]="";
    }else{
        if(objForm[inptid]){
            objForm[inptid] += val;
        }else{
            objForm[inptid] = val;
        }
    }

    if(inptid.match(/passw/)){
        if(val == "Clear"){
            inpt.textContent = objForm[inptid];
        } else if(val == "🔙") {
            inpt.textContent = inpt.textContent.slice(0, inpt.textContent.length -1);
        } else if(val == "C. Letter") {
            return
        } else {
            inpt.textContent += '*';
        }
    } else {
        inpt.textContent = objForm[inptid];
    }
    
}
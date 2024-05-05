const contecl = document.getElementById('contecl');
import {num} from './arrTecl.js';

export default function crearTecl(parm){
    let tablcont = "";
    
    tablcont = `<table cellpadding="1" cellspacing="1">`;

    let ini = 0;
    let fin = 10;

    tablcont += "<tr>";

    for ( let n=0; n < 10; n++ ){
        tablcont += `<td align="center">
        <input type="button" value="${num[n]}" class="keyButton"> 
        </td>`;
    }

    tablcont += "</tr>";

    for ( let i=0; i < 3; i++ ){
        tablcont += "<tr>";
        for ( let j=ini; j < fin; j++ ){
            tablcont += `<td align="center">
             <input type="button" value="${parm[j]}" class="keyButton">
             </td>`;
        }
        if(i == 0){
            ini = 10;
            fin = 20;
        }else{
            ini = 20;
            fin = 30;
        }
        tablcont += "</tr>";
    }
    tablcont += `<tr><td colspan="2" class="esptd">
                <input type="button" value="@" class="espbutton">
                </td>
                <td id="spc" class="esptd" colspan="2">
                <input type="button" value="$" class="espbutton">
                </td>
                <td id="clr" class="esptd" colspan="2">
                <input type="button" value="*" class="espbutton">
                </td>
                <td id="bck" class="esptd" colspan="2">
                <input type="button" value="%" class="espbutton">
                </td>
                <td class="esptd" colspan="2">
                <input type="button" value="&" class="espbutton">
                </td></tr>`;
    tablcont += `<tr><td id="may" class="esptd" colspan="2">
                <input type="button" value="C. Letter" class="espbutton">
                </td>
                <td id="spc" class="esptd" colspan="4">
                <input type="button" value="Space" class="espbutton">
                </td>
                <td id="clr" class="esptd" colspan="2">
                <input type="button" value="Clear" class="espbutton">
                </td>
                <td id="bck" class="esptd" colspan="2">
                <input type="button" value="🔙" class="espbutton">
                </td></tr>`;
    tablcont += "</table><br>";
    contecl.innerHTML=tablcont;
}
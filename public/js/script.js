import ChartBar from './d3_chart.js';
import crearTecl from './teclad.js';
import {key, objForm} from './arrTecl.js';
import formDataSend from './formData.js';
import asignValue from './asigvalue.js';
let box = document.getElementById('messBox');

const textRegexp = /^[a-zA-Z\ñÑ\s]+$/g;
const numRegexp = /^[0-9]+$/;4
const emailRegexp = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
const passwRegexp = /[a-zA-Z0-9%&$@.\-_*]{6,20}/g;
let formid = '';
let inpt = '';
let inptid = '';

function main(){
    let chartArr = '';
    if(sessionStorage.getItem("txt")){
        messBox(sessionStorage.getItem("txt"),
        sessionStorage.getItem("title"),
        sessionStorage.getItem("cls"));
        sessionStorage.setItem("txt", '');
        sessionStorage.setItem("title", '');
        sessionStorage.setItem("cls", '');
    }
    document.addEventListener('click',(e)=>{
        
        if(e.target.id == 'equis'){
            box.classList.add('hide');
        }
    
        if(e.target.classList == 'ord' && e.target.textContent == '🔽'){
            location.replace('/movies/sort/'+ e.target.dataset.title +'/-1');
        } else if(e.target.classList == 'ord'){
            location.replace('/movies/sort/'+ e.target.dataset.title +'/1');
        }

        if(e.target.id == 'butinpt'){
            let sele = document.getElementById('sele');
            let inpt = document.getElementById('inpt');
            location.replace('/movies/search/'+ sele.value +'/'+ inpt.value);
        }
        if(e.target.matches('#inptconten div')){
            inpt = e.target;
            inpt.style.backgroundColor = '#EFE';
            inptid = e.target.id;
        }
        if(e.target.matches('#contecl input') && inpt){
            asignValue(e.target.value, inptid, inpt)
        }
        if(location.pathname == '/signup' && e.target.id == 'submitButton'){
            if(!objForm.inptname || !objForm.inptemail || !objForm.inptpassw1 || !objForm.inptpassw2){
                messBox('Fields are required');
            } else if(!objForm.inptname.match(textRegexp)){
                messBox('The name format is not correct');
            } else if(!objForm.inptemail.match(emailRegexp)){
                messBox('The email format is not correct');
            } else if(!objForm.inptpassw1.match(passwRegexp) || !objForm.inptpassw2.match(passwRegexp)){
                messBox('The password format is not correct, it must have between 6 and 20 characters, uppercase, lowercase and symbols without blank spaces.');
            } else if(objForm.inptpassw1 != objForm.inptpassw2){
                messBox('The passwords do not match');
            } else {
                formDataSend({name: objForm.inptname, email: objForm.inptemail, password1: objForm.inptpassw1, password2: objForm.inptpassw2, code: formid},'/users/newuser');
            }
        }
        if(location.pathname == '/signin' && e.target.id == 'submitButton'){
            if(!objForm.inptemail || !objForm.inptpassw){
                messBox('Fields are required');
            } else if(!objForm.inptemail.match(emailRegexp)){
                messBox('The email format is not correct');
            } else if(!objForm.inptpassw.match(passwRegexp)){
                messBox('The password format is not correct.');
            } else {
                formDataSend({email: objForm.inptemail, password: objForm.inptpassw, code: formid},'/users/validate');
            }
        }
    })
    
    if(location.pathname.match(/movie/)){
        setTimeout(()=>{
            let imgArr = document.querySelectorAll('td img');
            for (let i=0; i < imgArr.length; i++){
                if (imgArr[i].naturalHeight == 0){
                    imgArr[i].setAttribute('src','/img/default.jpg');
                }
            }
        }, 1000);
    }

    if(location.pathname == '/grafic'){
       fetch('http://localhost:4000/grafic/json')
            .then(response => response.json())
            .then(data => {
                ChartBar(data);
                chartArr = data; 
            })
        
    };
    if(location.pathname == '/signin' || location.pathname == '/signup'){
        formid = document.querySelector('#formtecl span').id;
        crearTecl(key);
    }
    document.addEventListener("mouseover",(e)=>{
        if(location.pathname == '/grafic'){
            let span = document.getElementById('tooltip')
            if(e.target.matches('circle')){
                span.innerHTML = `<img src="${chartArr[e.target.id - 1].avatar}"><br>
                                    <b>Name: ${chartArr[e.target.id - 1].name}</b> <br>
                                    <b>Year: ${chartArr[e.target.id - 1].year}</b> <b>Month: ${chartArr[e.target.id - 1].month}</b> <br>`;
                span.setAttribute("data-year", chartArr[e.target.id - 1].year);
                span.classList.remove("hide");
                span.style.left = e.clientX + 20 + "px";
                span.style.top = e.clientY - 30 + "px";
            } else {
                span.classList.add("hide");
            }
        }
    }, false);
}

function messBox(param, title = 'Error', cls = 'redbox'){
    box.childNodes[3].textContent= title;
    box.childNodes[5].textContent= param;
    box.classList.add(cls);
    box.classList.remove('hide');
}



document.addEventListener('DOMContentLoaded', main);
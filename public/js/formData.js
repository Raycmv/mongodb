let urlresp = '';
let status = false;

export default async function formDataSend( datos, url){
// Configuración de la solicitud
const opciones = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // Tipo de contenido JSON
    },
    body: JSON.stringify(datos) // Convertir datos a formato JSON
};


// Enviar la solicitud
await fetch(url, opciones)
    .then(response => {
        if (response.status === 400){
            status = true;
        } else if (response.status === 200 && response.url.match(/signin/)){console.log(response.url)
            sessionStorage.setItem("txt", 'El usuario se a creado satisfactoriamente, puede entrar');
            sessionStorage.setItem("title", 'Exito');
            sessionStorage.setItem("cls", 'greenbox');
        }
        urlresp = response.url;
        return response.text();
    }).then(data=>{
        if (status){
            status = false;
            location.reload();
        } else {
            window.location.href = urlresp;
            
        }
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
}
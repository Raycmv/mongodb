
function encript(message){
	const alphabet = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    const number = '0123456789';
    let encrypted_text = '';
    let extr = 1;
    let cont = 0;

    if (message.length > 20){
    	message = message.slice(0, 20)
    }
    let code = Math.floor(message.length / 2);


    for (let x = 0; x < 3; x++){
        for (let i = 0; i < message.length; i ++){
            if(extr >= 5){ extr = 1;}
            if (alphabet.indexOf(message[i]) == -1 && number.indexOf(message[i]) == -1){
                encrypted_text += alphabet[code + x + extr]; extr += 1;
            }
            else if (alphabet.indexOf(message[i]) == -1){
                encrypted_text += alphabet[parseInt(message[i]) + code + x + extr]; extr += 2;
            }else{
                index = alphabet.indexOf(message[i])
                new_index = (index + code + x + extr) % alphabet.length;
                encrypted_text += alphabet[new_index];  extr += 3;
            }
        }
    }
    while (encrypted_text.length < 60){
        encrypted_text += alphabet[(extr + code + cont) % alphabet.length];
        cont += extr;
        if(extr >= 5){ 
            extr = 1;
        } else {
            extr += 2; 
        }
    }
    return encrypted_text
}

module.exports = encript;
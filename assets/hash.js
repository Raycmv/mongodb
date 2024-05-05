const caract = '0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNñÑoOpPqQrRsStTuUvVwWxXyYzZ';
let runer = false;
const hashobj = {};
hashobj.arr = [];
hashobj.hash = '';

hashobj.makeHash = ()=>{
    hashobj.hash = '';
    for (let i=0; i < 15; i++){
        hashobj.hash += caract[Math.floor(Math.random() * 63)];
    }
    hashobj.arr.push(hashobj.hash);         //console.log('hashobj', hashobj.arr);
    if(!runer && hashobj.arr.length > 20){
        hashobj.clear(); runer=true;
    }
}
hashobj.clear = ()=>{                       //console.log('Executing')
    let check = [...hashobj.arr];           
    setTimeout(()=>{                        //console.log('Executing clear')                    
        check.forEach((elem)=>{
            hashobj.arr = hashobj.arr.filter(el=> el !== elem);
            runer=false;
        })
    },300000);
}
hashobj.valid = (param)=>{
    let verif = hashobj.arr.find(el => el === param);
    if(!verif){ 
        return false
    } else{
        hashobj.arr = hashobj.arr.filter(el=> el !== verif);
        return true;
    }
}

module.exports = hashobj;
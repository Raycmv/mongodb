const Animals = require('../models/animal_model.js');

const data = [
    {
      name: 'Yumko',
      type: 'dog',
      color: 'black',
      size: 40
    },
    {
      name: 'Britni',
      type: 'rabit',
      color: 'black',
      size: 15
    },
    {
      name: 'Chinie',
      type: 'goat',
      color: 'brown',
      size: 70
    },
    {
      name: 'Tuti',
      type: 'chicken',
      color: 'yellow',
      size: 20
    },
    {
      name: 'Pelusa',
      type: 'cat',
      color: 'black',
      size: 20
    }
  ];

  async function funcdefault(){
    await Animals.deleteMany();
    data.forEach(async (e)=>{
        await Animals.create(e);
    })
  }
 module.exports = funcdefault;
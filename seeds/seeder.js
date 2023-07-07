const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground  = require('../models/campground');
const cities = require('./cities');
const {places, descriptors, images} = require('./seedhelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')
    .then(() => {
        console.log('CONECTADO AO BANCO PELA PORTA: 27017')
    })
    .catch(err => {
        console.log('ERRO DE CONEXÃO COM O BANCO');
        console.log(err);
    });


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<100; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [sample(images), sample(images)],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate nobis deleniti ipsum rem veritatis pariatur in est quia eum itaque eius dolorum beatae molestiae facilis cumque ullam, omnis architecto voluptates.',
            author: '640149347ede7385a15286c2',
            geometry:{
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            price
        })
        await camp.save()
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});
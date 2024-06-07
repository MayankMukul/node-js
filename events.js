const EventEmitter = require('events');
const em = new EventEmitter();

const fs = require('fs');
const rr = fs.createReadStream(''); // file path

rr.on('data',(data)=>{
    console.log(data);
})

rr.on('end',(data)=>{
    console.log(data);
})



//events
em.on('demo',(data)=>{
    console.log('demo',data)
})

setTimeout(()=>{
    em.emit('demo',{name:'dummy'}); //object can also be passed
},4000);
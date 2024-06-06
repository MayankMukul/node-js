const EventEmitter = require('events');

const em = new EventEmitter();

em.on('demo',()=>{
    console.log('demo')
})

setTimeout(()=>{
    em.emit('demo');
},4000);
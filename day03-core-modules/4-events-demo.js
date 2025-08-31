// 4. Module events → Event Emitter

const EventEmitter = require('events');

const emitter = new EventEmitter();

// Listener (akan jalan kalau event di picu)
emitter.on('greet',(name) => {
    console.log(`Hallo, ${name}`);
})

// trigger event
emitter.emit('greet','Iqbal');

emitter.emit('greet','Budi');

emitter.emit('greet','Siti');

// contoh lain
emitter.on('bye',() => {
    console.log("Good bye!");
})

emitter.emit('bye');
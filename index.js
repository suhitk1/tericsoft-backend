const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port =  8080;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  
  console.log("Server connected");
});

io.on('connection', () => {
    function randomNumber(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    }
    obj = {
        circle : {
            location:{
                x: randomNumber(1,250),
                y: randomNumber(1,500)
            }
        },
        square : {
            location:{
                x: randomNumber(251,500),
                y: randomNumber(1,500)
            }
        }
    }
    
    setInterval(()=>io.emit('serverMessage', obj),1000);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

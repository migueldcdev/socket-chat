import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '../');

const publicDir = join(rootDir, 'public');


app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile(join(publicDir, 'index.html'));
});

io.on('connection', (socket) => {    
    socket.on('chat message', (msg) => {        
        io.emit('chat message', msg)
    });
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    })
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
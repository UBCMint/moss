import { Server, Socket } from 'socket.io';

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        function sendRandomIntegers(socket: Socket) {
            setInterval(() => {
                const randomInt = Math.floor(Math.random() * 100);
                socket.emit('randomNumber', randomInt); // Emit the random integer event to the client
            }, 1000); // Send every 1 second
        }

        io.on('connection', (socket: Socket) => {
            sendRandomIntegers(socket); 
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    res.end();
};

export default SocketHandler;

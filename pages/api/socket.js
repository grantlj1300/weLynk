import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
        socket.on("join", (id) => {
            socket.join(id);
        });
        socket.on("send-message", (obj) => {
            io.to(obj.eventId).emit("receive-message", obj);
        });
    });

    console.log("Setting up socket");
    res.end();
}

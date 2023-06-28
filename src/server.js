import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000');

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) =>{
    console.log(socket);
});

httpServer.listen(3000, handleListen);





// const wss = new WebSocket.Server({ server });
// const sockets = [];

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anonymous";
//     console.log('Connected to the Browser!!');
//     socket.on("close", () => console.log("Disconnected from the Browser!!"));
//     socket.on("message", (message) => {
//         const messageString = message.toString('utf8');
//         const parsed = JSON.parse(messageString);
//         switch (parsed.type){
//             case "new_message":
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${parsed.payload}`));
//             case "nickname":
//                 socket["nickname"] = parsed.payload;
//         }
//     });
// });

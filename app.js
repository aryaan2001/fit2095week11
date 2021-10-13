let express = require("express");
let path = require("path");
const  teamsObj  = require("./teams");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let port = 8080;
app.use("/", express.static(path.join(__dirname, "dist/chartapp")));
io.on("connection", (socket) => {
    console.log("new connection made from client with ID="+socket.id);
      socket.emit("initialData",  teamsObj);
      console.log(teamsObj)

      socket.on('purchaseTickets', (purchaseTicketsData)=>{
          let result;
        socket.emit("initialData",  teamsObj);
      })
    });
    server.listen(port, () => {
        console.log("Listening on port " + port);
      });
      
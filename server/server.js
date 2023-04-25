const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  // handle incoming messages from the client
  socket.on("send-changes", (delta) => {
    console.log(`Received message from ${socket.id}: ${delta}`);
    socket.broadcast.emit("received-changes", delta);


    // send a response back to the client
    // socket.emit("received-changes", delta);
  });

  // handle disconnections
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

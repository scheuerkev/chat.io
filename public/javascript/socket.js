const ioClient = io({
  reconnection: false,
});

ioClient.on("connect", () => {
  console.log("Client connexion ok");
});

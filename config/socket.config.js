const socketio = require("socket.io");
const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
const { request } = require("express");

const initSocketServer = () => {
  const ios = socketio(server, {
    allowRequest: ensureAuthenticatedOnSocketHandshake,
  });

  ios.on("connect", (socket) => {
    console.log("Connexion ok");
  });
};

initSocketServer();

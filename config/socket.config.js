const socketio = require("socket.io");

const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
const { getNamespace } = require("../queries/namespace.queries");
const { findRoomPerNamespaceId } = require("../queries/room.queries");
const {
  findMessagePerRoomId,
  createMessage,
} = require("../queries/message.queries");

let ios;
let namespaces;

const initNamespaces = async () => {
  try {
    namespaces = await getNamespace();
    for (let namespace of namespaces) {
      const ns = ios.of(`/${namespace._id}`);
      ns.on("connect", async (nsSocket) => {
        try {
          const rooms = await findRoomPerNamespaceId(namespace._id);
          nsSocket.emit("rooms", rooms);
        } catch (e) {
          throw e;
        }
        nsSocket.on("joinRoom", async (roomId) => {
          try {
            nsSocket.join(`/${roomId}`);
            const messages = await findMessagePerRoomId(roomId);
            nsSocket.emit("history", messages);
          } catch (e) {
            throw e;
          }
        });
        nsSocket.on("message", async ({ text, roomId }) => {
          try {
            const { _id, username } = await nsSocket.request.user;

            const message = await createMessage({
              data: text,
              room: roomId,
              author: _id,
              authorName: username,
            });
            ns.to(`/${roomId}`).emit("message", message);
          } catch (e) {
            throw e;
          }
        });
      });
    }
  } catch (e) {}
};

const initSocketServer = () => {
  ios = socketio(server, {
    allowRequest: ensureAuthenticatedOnSocketHandshake,
  });

  ios.on("connect", (socket) => {
    console.log("Connexion ok");
    socket.emit("namespaces", namespaces);
  });

  initNamespaces();
};

initSocketServer();

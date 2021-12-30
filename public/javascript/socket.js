let namespaces;
let namespaceSockets = [];
let rooms = [];
let init = false;
let activeNsSocket;
let activeRoom;
let messages = [];

const ioClient = io({
  reconnection: false,
});

ioClient.on("connect", () => {
  console.log("Client connection ok");
});

ioClient.on("namespaces", (data) => {
  namespaces = data;
  for (let ns of namespaces) {
    const nsSocket = io(`/${ns._id}`);
    nsSocket.on("rooms", (data) => {
      rooms.push(...data);
      if (!init) {
        init = true;
        activateNamespace(nsSocket);
        displayNamespaces(namespaces, nsSocket.nsp);
      }
    });
    nsSocket.on("history", (data) => {
      messages = data;
      displayMessages(messages);
    });
    nsSocket.on("message", (data) => {
      messages.push(data);
      displayMessages(messages);
    });
    namespaceSockets.push(nsSocket);
  }
});

const activateRoom = (room) => {
  activeNsSocket.emit("joinRoom", room._id);
  activeRoom = room;
};

const activateNamespace = (nsSocket) => {
  activeNsSocket = nsSocket;
  const firstRoom = rooms.find(
    (room) => `/${room.namespace}` === activeNsSocket.nsp && room.index === 0
  );
  activateRoom(firstRoom);
  displayRooms(
    rooms.filter((room) => `/${room.namespace}` === activeNsSocket.nsp),
    firstRoom._id
  );
};

setTimeout(() => {
  console.log({
    namespaces,
    namespaceSockets,
    rooms,
    activeRoom,
    activeNsSocket,
    messages,
  });
}, 3000);

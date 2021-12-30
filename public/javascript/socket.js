let namespaces;
let namespaceSockets = [];
let rooms = [];
let init = false;
let activeNamespace;
let activeNsSocket;

const ioClient = io({
  reconnection: false,
});

ioClient.on("connect", () => {
  console.log("Client connection ok");
});

ioClient.on("namespaces", (data) => {
  namespaces = data;
  displayNamespaces(namespaces);
  for (let ns of namespaces) {
    const nsSocket = io(`/${ns._id}`);
    nsSocket.on("rooms", (data) => {
      rooms.push(...data);
      if (!init) {
        init = true;
        activateNamespace(nsSocket);
      }
    });
    namespaceSockets.push(nsSocket);
  }
});

const activateNamespace = (nsSocket) => {
  activeNsSocket = nsSocket;
  const firstRoom = rooms.find(
    (room) => `/${room.namespace}` === activeNsSocket.nsp && room.index === 0
  );
  displayRooms(
    rooms.filter((room) => `/${room.namespace}` === activeNsSocket.nsp)
  );
  //activateRoom(firstRoom)
};

setTimeout(() => {
  console.log({
    namespaces,
    namespaceSockets,
    rooms,
  });
}, 3000);

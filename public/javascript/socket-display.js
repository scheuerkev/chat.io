const createNamespaceItem = (namespace, isActive) => {
  const li = document.createElement("li");
  li.classList.add("item-namespace", "p-3", "mb-1");
  if (isActive) {
    li.classList.add("active");
  }
  li.innerHTML = `
  <img src="${namespace.imageUrl}"/>
  `;
  return li;
};

const displayNamespaces = (namespaces, activeNsp) => {
  const namespacesContainer = document.querySelector(".list-namespaces");
  const items = namespaces.map((namespace) =>
    createNamespaceItem(namespace, activeNsp === `/${namespace._id}`)
  );
  namespacesContainer.innerHTML = "";
  namespacesContainer.prepend(...items);
};

const createRoomsItem = (room, isActive) => {
  const li = document.createElement("li");
  li.classList.add("item-room", "p-2", "m-2");
  if (isActive) {
    li.classList.add("active");
  }
  li.innerHTML = `
  # ${room.title}
  `;
  return li;
};

const displayRooms = (rooms, activeRoomId) => {
  const roomsContainer = document.querySelector(".list-rooms");
  const items = rooms.map((room) =>
    createRoomsItem(room, activeRoomId === room._id)
  );
  roomsContainer.innerHTML = "";
  roomsContainer.prepend(...items);
};

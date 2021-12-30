const createNamespaceItem = (namespace) => {
  const li = document.createElement("li");
  li.classList.add("item-namespace", "p-3", "mb-1");
  li.innerHTML = `
  <img src="${namespace.imageUrl}"/>
  `;
  return li;
};

const displayNamespaces = (namespaces) => {
  const namespacesContainer = document.querySelector(".list-namespaces");
  const items = namespaces.map((namespace) => createNamespaceItem(namespace));
  namespacesContainer.innerHTML = "";
  namespacesContainer.prepend(...items);
};

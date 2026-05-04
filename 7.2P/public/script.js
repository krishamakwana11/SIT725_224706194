const socket = io();
const socketContainer = document.getElementById("socketContainer");

socket.on("socketList", (sockets) => {
  socketContainer.innerHTML = "";

  sockets.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>Status: <strong>${item.status}</strong></p>
      <select onchange="updateSocket(${item.id}, this.value)">
        <option value="Available" ${item.status === "Available" ? "selected" : ""}>Available</option>
        <option value="In Use" ${item.status === "In Use" ? "selected" : ""}>In Use</option>
        <option value="Out of Order" ${item.status === "Out of Order" ? "selected" : ""}>Out of Order</option>
      </select>
    `;

    socketContainer.appendChild(card);
  });
});

function updateSocket(id, status) {
  socket.emit("updateStatus", { id, status });
}
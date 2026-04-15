const socketForm = document.getElementById('socketForm');
const socketList = document.getElementById('socketList');

function getSocketImage(placeName) {
  if (placeName.toLowerCase().includes('library')) {
    return 'images/image1.jpg';
  } else if (placeName.toLowerCase().includes('cafe')) {
    return 'images/image2.jpg';
  } else if (placeName.toLowerCase().includes('hub')) {
    return 'images/image3.jpg';
  } else if (placeName.toLowerCase().includes('station')) {
    return 'images/image4.jpg';
  }
}

async function loadSockets() {
  const response = await fetch('/api/sockets');
  const sockets = await response.json();

  socketList.innerHTML = '';

  sockets.forEach(socket => {
    const div = document.createElement('div');
    div.className = 'card';

    const imagePath = getSocketImage(socket.place_name);

    div.innerHTML = `
      <img src="${imagePath}" alt="${socket.place_name}" class="card-img">
      <h3>${socket.place_name}</h3>
      <p><strong>Suburb:</strong> ${socket.suburb}</p>
      <p><strong>Socket Type:</strong> ${socket.socket_type}</p>
      <p><strong>Power Output:</strong> ${socket.power_output}</p>
      <p><strong>Availability:</strong> ${socket.availability}</p>
      <p><strong>Notes:</strong> ${socket.notes || 'None'}</p>
    `;
    socketList.appendChild(div);
  });
}

socketForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newSocket = {
    place_name: document.getElementById('place_name').value,
    suburb: document.getElementById('suburb').value,
    socket_type: document.getElementById('socket_type').value,
    power_output: document.getElementById('power_output').value,
    availability: document.getElementById('availability').value,
    notes: document.getElementById('notes').value
  };

  const response = await fetch('/api/sockets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSocket)
  });

  const result = await response.json();
  alert(result.message || result.error);

  socketForm.reset();
  loadSockets();
});

loadSockets();
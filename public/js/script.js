document.addEventListener('DOMContentLoaded', fetchEvents);

function fetchEvents() {
  fetch('/api/events')
    .then(response => response.json())
    .then(result => {
      if (result.statusCode === 200) {
        displayEvents(result.data);
      }
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
}

function displayEvents(events) {
  const container = document.getElementById('events-container');
  container.innerHTML = '';

  events.forEach(event => {
    const card = `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="${event.image}" alt="${event.title}">
            <span class="card-title">${event.title}</span>
          </div>
          <div class="card-content">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}
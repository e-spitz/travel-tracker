const fetchAPIData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const fetchSingleTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

const fetchAll = (id) => {
  return Promise.all([
    fetchAPIData('travelers'),
    fetchAPIData('trips'),
    fetchAPIData('destinations'),
    fetchSingleTraveler(`${id}`)
  ])
    .catch(err => console.log(err))
}

const postNewTrip = (newTrip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(newTrip),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkForError(response))
    .catch(err => err)
}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error('404 error');
  } else {
    return response.json();
  }
}

export { fetchAll, postNewTrip }

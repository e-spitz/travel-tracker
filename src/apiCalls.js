const fetchAPIData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .catch(err => displayError(err))
}

const fetchAll = () => {
  return Promise.all([
    fetchAPIData('travelers/16'),
    fetchAPIData('travelers'),
    fetchAPIData('trips'),
    fetchAPIData('destinations'),
  ])
  .catch(err => displayError(err))
}

const displayError = (errMsg) => {
    const bookingError =  document.getElementById('bookingError');
    const msg = errMsg.message === 'Failed to fetch' ?
      "Internet connection may be unstable. Please try again later." : errMsg;
    bookingError.innerText = `Something went wrong, please try again later.`;
}

export { fetchAll }

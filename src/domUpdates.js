export const domUpdates = {

  displayTravelerName(traveler) {
    const greetingMsg = document.getElementById('greetingMsg');
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = `Hey there, ${firstName}!`;
  },

  displayYearlyTotal(total) {
    const totalSpent = document.getElementById('totalSpent');
    const formatter = new Intl.NumberFormat('en-US', {
      style:'currency',
      currency: 'USD'
    })
    totalSpent.innerText = `${formatter.format(total)}`;
  }

}

export const domUpdates = {

  displayTravelerName(traveler) {
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = `Hey there, ${firstName}!`;
  }

}

# Travel Tracker

A web app to track past, present, upcoming, and future trips! 

1. [Functionality](#functionality)
2. [Responsiveness](#responsiveness)
3. [Installation](#installation)
4. [Technologies](#technologies)
5. [Contributors](#contributors)

## Functionality

![gif of login page](https://media.giphy.com/media/VgTpKZWHcLGztwDeax/giphy.gif)

* To login to the page, type in  `traveler` + any number 1 - 50 (example: `traveler15`)
* Type in the password - `travel2020` - and click the login button.
* If the user name or password is incorrect, an error message will display below the login section.
* If successful, you will continue to your travel tracker home page.

![gif of home page navigation](https://media.giphy.com/media/DytvqXmo6XJJULG1uh/giphy.gif)


* You'll be greeted by your first name along with how much money you have spent on trips this year and a display of all of your trips to date.
* You can navigate through your trips using the nav buttons: Past trips, present trips, Future trips, Pending trips, and All trips.
* The logout button can be found in the upper right hand corner.

* The best part about this travel tracker is it's ease of estimating trips and booking trips! A pop up will tell you how much the trip will cost total and per person when clicking the estimate trip cost button. A different pop up will display when a trip as been successfully booked and the new trip card, along with new yearly total, will display on your home page.

![gif of estimating trip cost and booking a trip](https://media.giphy.com/media/38R399KLoPUBppXyAj/giphy.gif)

* This booking form will only display cost or booking confirmation if all fields are filled out. 
* You can also tab through each input field of the form. 

![gif of invalid input fields](https://media.giphy.com/media/h5N3gXkOZUnz0Jkf6E/giphy.gif)

* It will also display an error if there is an issue connecting to the server while attempting to book a trip.

![gif of error handling](https://media.giphy.com/media/tBQutVT0fmfRdKXcu3/giphy.gif)

## Responsiveness

* This app is reponsive for desktops, tablets, or mobile devices.

![gif of responsiveness](https://media.giphy.com/media/oqIObI23YJa3dT2JpT/giphy.gif)


## Installation

* Clone down remote repository by entering `git clone git@github.com:e-spitz/travel-tracker.git` in console
* Use command `cd` to navigate into new `travel-tracker` directory
* Install repository dependencies using `npm install`
* Initialize webpack server using command `npm start`
* Clone down `travel-tracker-api` by following [these instructions](https://github.com/turingschool-examples/travel-tracker-api)
* Navigate into cloned API directory 
* Initialize local server using command `npm start`
* Once both servers are initialized, you can access the application in your browser [here](http://localhost:8080/)

## Technologies

1. HTML
2. CSS/Sass
3. JavaScript
4. Webpack
6. Mocha & Chai
7. GitHub

## Contributors

* Developer: [Erica Spitz](https://github.com/e-spitz)
* Project Manager: [Nik Seif](https://github.com/niksseif)

## Links

* [Project Specifications](https://frontend.turing.edu/projects/travel-tracker.html)
* [GitHub Repo](https://github.com/e-spitz/travel-tracker)

# Straight Forward Frontend Calender

## Getting Started
* Copy ezcal.js and ezcal.css into your project
* Initalize a new calander with the DOM Node of the element in which you would like the calender inserted.
* Add events/titles to dates
  * To add titles use .addTitle(< JS Date Object >, < title as string >)
  * To add click events use .addClick< JS Date Object >, < callback >)

### Here is an example setup
```javascript
// sample calender setup
document.addEventListener("DOMContentLoaded", () => {
    // find element to insert caleender
    let ezCal = document.getElementById('ez-cal')
    
    // init calender
    let cal = new Calender(ezCal)

    // callback for to mount on day onClick
    const exampleCallback = () => {
        window.alert("EVENT")
    }

    // get today
    let today = new Date()
    
    // get number of days in current month
    const dayinMonth = cal.currMonth.daysInMonths[today.getMonth()]

    // get tomorrow and the 15th of next month
    let tomorrow = dayinMonth === today.getDate() ? new Date(today.getFullYear(), today.getMonth() + 1, 1) : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    let nextMonth = new Date(today.getFullYear(), today.getMonth() === 11 ? 0 : today.getMonth() + 1, 15)

    // add titles and events to days
    cal.addTitle(today, "my first title")
    cal.addTitle(today, "my second title")
    cal.addClick(today, exampleCallback)

    
    cal.addTitle(tomorrow, "my third title")
    cal.addTitle(tomorrow, "my fourth title")
    cal.addClick(tomorrow, exampleCallback)

    
    cal.addTitle(nextMonth, "my fifth title")
    cal.addTitle(nextMonth, "my sixth title")
    cal.addClick(nextMonth, exampleCallback)
    
    // mount click events and titles on days
    cal.mountDays()
})
```



## Features
* Written entirely in ES6 Vanilla JS with no external libraries
* Full customizable styleing though CSS or included JS Css Ajustor
* No external libraries used for date handeling
* Mount titles, onClick events selected dates




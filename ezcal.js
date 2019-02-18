class Day {
    constructor(year, month, day, current) {
        
        this.current = current ? true : false
        this.month = month
        this.day = day
        this.year = year
        this.date = new Date(year, month, day)
        
    }

    paintDay() {
        this.el = document.createElement('div')
        this.el.classList.add("day")
        this.el.id = this.date.toLocaleDateString()

        // able to turn off if desirable to show previous/next month dates
        this.el.innerText = this.current ? this.day : ""
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        if (this.date < yesterday) {
            this.el.classList.add('past')
        } 
        return this.el
    }

}

class Month {
    constructor(date) {
        // find start of month
        this.startofMonth = new Date(date.getFullYear(), date.getMonth(), 1)

        // determine leap year and number of days in month
        this.setVariables.call(this)

        // find last day of month
        this.endofMonth = new Date(date.getFullYear(), date.getMonth(), this.daysInMonths[date.getMonth()])
        
        // find all current month days and lapover days from pervious and next month to be displayed
        this.generateDays.call(this, date)

        // paint calender onto a div with the id "ez-cal"
        this.paintMonth = this.paintMonth.bind(this)
    }

    paintMonth() {
        // create month element
        this.el = document.createElement('div')
        this.el.classList.add("month")
        this.el.id = `${this.currMonth}-${this.currYear}`
        let week
        let day
        // create weeks
        for (let wIndex = 0; wIndex < (this.days.length / 7); wIndex++) {
            week = document.createElement('div')
            week.classList.add(`week`)
            for (let dIndex = 0; dIndex < 7; dIndex++) {
                day = this.days[(7 * wIndex) + dIndex]
                week.appendChild(day.paintDay())
            }
            this.el.appendChild(week)
        }
        
        return this.el
        
    }

    generateDays(date) {
        // account for year rollover
        this.lastMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1
        this.lastMonthYear =  date.getMonth() === 0 ? (date.getFullYear - 1) : date.getFullYear()
        this.nextMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1
        this.nextMonthYear = date.getMonth() === 11 ? (date.getFullYear + 1) : date.getFullYear()

        this.days = []
        // Get previous month lapover days
        for (let index = 0; index < this.startofMonth.getDay(); index++) {
            this.days.unshift(new Day(this.lastMonthYear, this.lastMonth, this.daysInMonths[this.lastMonth] - index, false))
        }
        // Get current months days
        for (let index = 1; index < (this.daysInMonths[date.getMonth()] + 1); index++) {
            this.days.push(new Day(date.getFullYear(), date.getMonth(), index, true))
        }
        // Get next month lapover days
        
        for (let index = 0; index < 6 - (this.endofMonth.getDay()); index++) {
            this.days.push(new Day(this.nextMonthYear, this.nextMonth, index + 1, false))
        }
    }



    setVariables() {
        this.currYear = this.startofMonth.getFullYear()
        
        this.currMonth = this.startofMonth.getMonth()

        this.daysInMonths = {
            0: 31,
            1: 28,
            2: 31,
            3: 30,
            4: 31,
            5: 30,
            6: 31,
            7: 31,
            8: 30,
            9: 31,
            10: 30,
            11: 31
        }

        // Check for leap year
        if ((!(this.currYear % 4) && (this.currYear % 100)) || !(this.currYear % 400)) {
            this.daysInMonths[1] = 29
        }
        
    }

}

class Calender {
    constructor(el) {
        this.el = el

        this.events = {}
        this.clickEvents = {}

        this.today = new Date()
        this.startofMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1)
        this.currMonth = new Month(this.today)

        this.loadNextMonth = this.loadNextMonth.bind(this)
        this.loadPreviousMonth = this.loadPreviousMonth.bind(this)
        this.addClick = this.addClick.bind(this)
        this.addTitle = this.addTitle.bind(this)
        this.mountDays = this.mountDays.bind(this)
       
        this.months = {
            0: "January",
            1: "Febuary",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }
        this.constructEl.call(this)
    }


    constructEl(){
        // create container for buttons and title
        this.tilebar = document.createElement('div')
        this.tilebar.classList.add("ezCal-titlebar")


        

        

        // create previous mont buttons
        this.previousMonthButton = document.createElement('button')
        this.previousMonthButton.classList = 'ez-cal-button'
        this.previousMonthButton.innerText = "prev"
        this.previousMonthButton.addEventListener('click', this.loadPreviousMonth)
        this.tilebar.appendChild(this.previousMonthButton)

        // create header with current month
        this.title = document.createElement('h3')
        this.title.innerText = `${this.months[this.startofMonth.getMonth()]} ${this.startofMonth.getFullYear()}`
        this.tilebar.appendChild(this.title)

        // create next month button
        this.nextMonthButton = document.createElement('button')
        this.nextMonthButton.innerText = 'next'
        this.nextMonthButton.classList = 'ez-cal-button'
        this.nextMonthButton.addEventListener('click', this.loadNextMonth)
        this.tilebar.appendChild(this.nextMonthButton)

        // construct element 
        this.el.innerHTML = ""
        this.el.appendChild(this.tilebar)
        this.el.appendChild(this.currMonth.paintMonth())

    }

    loadNextMonth() {
        this.startofMonth = new Date(
            this.startofMonth.getMonth() === 11 ? this.startofMonth.getFullYear() + 1 : this.startofMonth.getFullYear(),
            this.startofMonth.getMonth() === 11 ? 0 : this.startofMonth.getMonth() + 1,
            1)
        
        this.currMonth = new Month(this.startofMonth)

        this.constructEl()

        this.mountDays()
    }

    loadPreviousMonth() {
        this.startofMonth = new Date(
            this.startofMonth.getMonth() === 0 ? this.startofMonth.getFullYear() - 1 : this.startofMonth.getFullYear(),
            this.startofMonth.getMonth() === 0 ? 11 : this.startofMonth.getMonth() - 1,
            1)
        this.currMonth = new Month(this.startofMonth)

        this.constructEl()

        this.mountDays()
        
    }

    // build library of titles for display of current month
    addTitle(day, title){
        if (this.events[day.toLocaleDateString()]) {
            this.events[day.toLocaleDateString()].push(title)
        } else {
            this.events[day.toLocaleDateString()] = [title]
        }
    }

    // add callback to onClick of day 
    addClick(day, callback){
        this.clickEvents[day.toLocaleDateString()] = callback 
        
    }

    // mount display divs to display on days on hover
    mountDays() {
        this.currMonth.days.forEach(day => {
            let dayEl
            
            if (this.events[day.date.toLocaleDateString()]) {
                let titleList = document.createElement('ul')
                titleList.classList.add('title-list')
                this.events[day.date.toLocaleDateString()].forEach(title => {
                    let titleEl = document.createElement('li')
                    titleEl.innerText = title
                    titleList.appendChild(titleEl)
                })
                dayEl = document.getElementById(day.date.toLocaleDateString())
                dayEl.appendChild(titleList)
                dayEl.classList.add("event-day")
            }
            
            if (this.clickEvents[day.date.toLocaleDateString()]) {
                let dayEl = document.getElementById(day.date.toLocaleDateString())
                
                dayEl.addEventListener('click', this.clickEvents[day.date.toLocaleDateString()])
                dayEl.classList.add('mounted')
            }
        })
    }

}



class CssRule  {
    constructor(sheetName) {
        this.styleSheet
        for (let styleSheet of document.styleSheets) {
            if (styleSheet.href.includes(sheetName)) {
                this.styleSheet = styleSheet
            }
        }
        this.adjust = this.adjust.bind(this)
    }

    adjust(cssIdentifyer, changeStyle, changeValue) {
        
        for (let rule of this.styleSheet.rules) {
            if (rule.selectorText === cssIdentifyer) {
                rule.style[changeStyle] = changeValue;
            }
        }
    }
}

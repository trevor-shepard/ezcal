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




class Day {
    constructor(year, month, day) {
        this.month = month
        this.day = day
        this.year = year
        this.date = new Date(year, month, day)
        
    }

    paintDay() {
        this.el = document.createElement('div')
        this.el.classList.add("day")
        this.el.id = `${this.month}-${this.day}-${this.year}`
        this.el.innerText = this.day
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
                console.log(day)
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
            this.days.unshift(new Day(this.lastMonthYear, this.lastMonth, this.daysInMonths[this.lastMonth] - index))
        }
        // Get current months days
        for (let index = 1; index < (this.daysInMonths[date.getMonth()] + 1); index++) {
            this.days.push(new Day(date.getFullYear(), date.getMonth(), index))
        }
        // Get next month lapover days
        
        for (let index = 0; index < 6 - (this.endofMonth.getDay()); index++) {
            this.days.push(new Day(this.nextMonthYear, this.nextMonth, index + 1))
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
        
    }

}

class Calender {
    constructor(el) {
        this.el = el
        this.today = new Date()
        this.currMonth = new Month(this.today)
        this.el.appendChild(this.currMonth.paintMonth())
    }

    
}


document.addEventListener("DOMContentLoaded", () => {
    let ezCal = document.getElementById('ez-cal')
    
    let cal = new Calender(ezCal)
})
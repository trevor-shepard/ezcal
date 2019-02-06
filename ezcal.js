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
    constructor(date) {
        
    }

}

class Month {
    constructor(date) {
        
        this.startofMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        this.setVariables.call(this)
        this.endofMonth = new Date(date.getFullYear(), date.getMonth(), this.daysInMonths[date.getMonth()])

        // account for year rollover
        this.lastMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1
        this.lastMonthYear =  date.getMonth() === 0 ? (date.getFullYear - 1) : date.getFullYear()
        this.nextMonth = date.getMonth() === 11 ? 0 : date.getMonth() + 1
        this.nextMonthYear = date.getMonth() === 11 ? (date.getFullYear + 1) : date.getFullYear()

        this.days = []
        // Get previous month lapover days
        for (let index = 0; index < this.startofMonth.getDay(); index++) {
            this.days.unshift(new Date(this.lastMonthYear, this.lastMonth, this.daysInMonths[this.lastMonth] - index))
        }
        // Get current months days
        for (let index = 1; index < (this.daysInMonths[date.getMonth()] + 1); index++) {
            this.days.push(new Date(date.getFullYear(), date.getMonth(), index))
        }
        // Get next month lapover days
        
        for (let index = 0; index < 6 - (this.endofMonth.getDay()); index++) {
            this.days.push(new Date(this.nextMonthYear, this.nextMonth, index + 1))
        }
    }

    setVariables() {
        let currYear = this.startofMonth.getFullYear()

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
        if ((!(currYear % 4) && (currYear % 100)) || !(currYear % 400)) {
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
    }

    
}


document.addEventListener("DOMContentLoaded", () => {
    let ezCal = document.getElementById('ez-cal')
    
    let cal = new Calender(ezCal)
})
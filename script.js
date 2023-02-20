class Calculator {
    // gives a way to set the elements in the text calculator
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ""
        this.operation = undefined

    }

    // allows the user to delete numbers at the end of the string
    delete() {
     this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }


    // adds each number entered by the user on the screen
    appendNumber(number) {

        // the user will not be allowed to enter more than one dot sign after each
        // other
        if (number === '.' && this.currentOperand.includes('.')) return

        // allows you to add more numbers next to each other so that they do
        // not calculate numbers individually in a row
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    // everytime a user clicks on the calculation method
    // that they want to use
    chooseOperation(operation) {
        // user will not be able to enter an operation if their are no numbers to calculate
        if (this.currentOperand === '') return

        // allows user to add another operation to the previous one
        if (this.previousOperand !== '') {
            this.compute()
        }

        // so that the calculator knows which operation it needs to use
        this.operation = operation

        // means we are done type the previous number to calculate
        this.previousOperand = this.currentOperand

        this.currentOperand = ''

    }
    // takes a single value that we need to display on the screen
    compute() {
    let computation

    // converting the previous numbers string to a number
    const prev = parseFloat(this.previousOperand)

    // converting the current numbers string to a number
    const current = parseFloat(this.currentOperand)

    // if the user clicks enter the calculation will be cancelled because no values
    // were entered
    if(isNaN(prev) || isNaN(current)) return

    // all the different calculations that can be done
    switch(this.operation){
        case '+':
            computation = prev + current
            break
            case '-':
            computation = prev - current
            break
            case '*':
            computation = prev * current
            break
            case '÷':
            computation = prev / current
            break

            // if theres an invalid computation
            default:
                return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    }

    getDisplayNumber(number){

        const stringNumber = number.toString()

        const integerDigits = parseFloat(stringNumber.split('.')[0])

        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits: 0 })
            }
            if(decimalDigits != null){
                return `${integerDisplay}.${decimalDigits}`
            }else{
                return integerDisplay
            }
        }
    


    // updates values inside of the output
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        // allows the calculation to display with the calculation operation applied
        if(this.operation != null){
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}



const numberButton = document.querySelectorAll(`[data-number]`)
const operationButton = document.querySelectorAll(`[data-operation]`)
const equalsButton = document.querySelector(`[data-equals]`)
const deleteButton = document.querySelector(`[data-delete]`)
const allClearButton = document.querySelector(`[data-all-clear]`)
const previousOperandTextElement = document.querySelector(`[data-previous-operand]`)
const currentOperandTextElement = document.querySelector(`[data-current-operand]`)


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// deletes a number at the end of the string of numbers
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
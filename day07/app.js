function App($target) {
    this.$calculator = $target;
    this.onClick = this.onClick;
    this.$equation = document.querySelector('.equation');
    this.$result = document.querySelector('.result');
    this.$clear = document.querySelector('.clear');
    this.firstNumber = '';
    this.secondNumber = '';
    this.operator = '';
    this.equal = '';
    this.result = '';
    this.previosOperator = '';
}

App.prototype = {
    add: function (x, y) {
        return x + y;
    },
    substract: function (x, y) {
        return x - y;
    },
    multiply: function (x, y) {
        return x * y;
    },
    divide: function (x, y) {
        return (x / y).toFixed(2);
    },
    addEvent: function () {
        const self = this;
        this.$calculator.addEventListener('click', this.onClick.bind(self));
        this.$clear.addEventListener('dblclick', this.ondblclick.bind(self));
    },
    initNumber: function () {
        this.firstNumber = '';
        this.secondNumber = '';
    },
    setOperator: function (value) {
        this.operator = value;
    },
    setEqual: function (value) {
        this.equal = value;
    },
    setResult: function (value) {
        this.result = value;
    },
    setNumber: function (value) {
        if (this.operator) {
            if (this.secondNumber) {
                this.secondNumber = this.secondNumber + value;
            } else {
                this.secondNumber = value;
            }
        } else {
            if (this.firstNumber) {
                this.firstNumber = this.firstNumber + value;
            } else {
                this.firstNumber = value;
            }
        }
    },
    renderResult: function () {
        if (this.operator) {
            if (this.equal) {
                this.$result.textContent = this.result;
            } else {
                this.$result.textContent = this.secondNumber;
            }
        } else {
            this.$result.textContent = this.firstNumber;
        }
    },
    renderEquation: function (isChanged) {
        if (this.firstNumber && this.operator && !this.secondNumber) {
            if (isChanged) {
                this.$equation.textContent = `${this.$equation.textContent.slice(0, -2)} ${this.operator}`;
            } else {
                this.$equation.textContent = `${this.firstNumber} ${this.operator}`;
            }
        } else if (this.firstNumber && this.operator && this.secondNumber) {
            if (this.equal) {
                this.$equation.textContent = `${this.$equation.textContent} ${this.secondNumber} ${this.equal}`;
            } else {
                this.$equation.textContent = `${this.$equation.textContent} ${this.secondNumber} ${this.operator}`;
            }
        }
    },
    onClick: function (e) {
        const { target } = e;
        const value = target.textContent;
        let previousOperator = '';
        if (target.className.includes('number')) {
            if (value === '0' && this.$result.textContent === '0') return;
            if (this.firstNumber.length > 10 && !this.operator) {
                previousOperator = this.operator;
                return;
            }
            if (this.secondNumber.length > 10 && previousOperator !== this.operator) return;
            if (this.equal) {
                this.initialize();
            }
            this.setNumber(value);
            this.renderResult();
        } else if (target.className.includes('operator')) {
            if (this.firstNumber && !this.operator && !this.secondNumber) {
                this.setOperator(value);
                this.renderEquation();
            } else if (this.firstNumber && this.operator && !this.secondNumber) {
                //exchange operator
                this.setOperator(value);
                this.renderEquation(true);
            } else if (this.firstNumber && this.operator && this.secondNumber) {
                //continuous calculation
                const result = this.calculate(this.operator);
                this.setOperator(value);
                this.renderEquation();
                this.initNumber();
                this.setOperator('');
                this.setNumber(result);
                this.renderResult();
                this.setOperator(value);
            }
        } else if (target.className.includes('equal')) {
            if (this.equal) return;
            if (!this.firstNumber || !this.operator || !this.secondNumber) {
                this.initialize();
                return;
            }
            const result = this.calculate(this.operator);
            this.setEqual(value);
            this.renderEquation();
            this.initNumber();
            this.setOperator('');
            this.setNumber(result);
            this.renderResult();
            this.setOperator(value);
        } else if (target.className.includes('clear')) {
            if (this.firstNumber && this.secondNumber && this.operator && this.equal && this.result) {
                this.initialize();
                return;
            }
            this.$result.textContent = '0';
            if (this.firstNumber && !this.secondNumber) this.firstNumber = '';
            else if (this.firstNumber && this.secondNumber) this.secondNumber = '';
        }
    },
    ondblclick: function (e) {
        this.initialize();
    },
    calculate: function () {
        const x = Number.isInteger(Number(this.firstNumber)) ? Number(this.firstNumber) : Number(this.firstNumber).toFixed(2);
        const y = Number.isInteger(Number(this.secondNumber)) ? Number(this.secondNumber) : Number(this.secondNumber).toFixed(2);
        switch (this.operator) {
            case '+': {
                return this.add(x, y);
            }
            case '-': {
                return this.substract(x, y);
            }
            case '*': {
                return this.multiply(x, y);
            }
            case '/': {
                if (y === 0) {
                    return "Can't divided by zero";
                }
                return this.divide(x, y);
            }
        }
    },
    initialize: function () {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        this.equal = '';
        this.result = '';
        this.$equation.textContent = '';
        this.$result.textContent = '0';
    },
};

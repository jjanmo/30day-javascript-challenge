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
    setResult: function (value) {
        this.result = value;
    },
    setEqual: function (value) {
        this.equal = value;
    },
    setNumber: function (value) {
        if (this.operator) {
            if (this.secondNumber) {
                this.secondNumber = Number(this.secondNumber + value);
            } else {
                this.secondNumber = value;
            }
        } else {
            if (this.firstNumber) {
                this.firstNumber = Number(this.firstNumber + value);
            } else {
                this.firstNumber = value;
            }
        }
    },
    setOperator: function (value) {
        this.operator = value;
    },
    renderResult: function () {
        if (this.operator) {
            this.$result.textContent = this.equal ? this.result : this.secondNumber;
        } else {
            this.$result.textContent = this.firstNumber;
        }
    },
    renderEquation: function (value) {
        this.$equation.textContent = this.$equation.textContent
            ? `${this.$equation.textContent} ${this.$result.textContent} ${value}`
            : `${this.$result.textContent} ${value}`;
    },
    onClick: function (e) {
        const { target } = e;
        const value = target.textContent;
        if (target.className.includes('number')) {
            if (this.firstNumber && this.secondNumber && this.operator && this.equal && this.result) {
                this.initialize();
            }
            const number = value;
            this.setNumber(number);
            this.renderResult();
        } else if (target.className.includes('operator')) {
            const operator = value;
            if (this.firstNumber && this.secondNumber && this.operator && this.equal && this.result) {
                //식한개 계산 후
                const result = this.result;
                this.initialize();
                this.setNumber(result);
                this.renderResult();
            } else if (this.firstNumber && this.secondNumber && this.operator) {
                //연속 계산
                // const result = this.calculate(this.operator);
                // this.setResult(result);
                // console.log(this.firstNumber, this.secondNumber, result);
                // this.setOperator(operator);
                // this.renderEquation(operator);
                // this.secondNumber = result;
                // this.renderResult();
                return;
            } else if (this.firstNumber && this.operator) {
                //연산자 교환
            }
            this.setOperator(operator);
            this.renderEquation(operator);
        } else if (target.className.includes('equal')) {
            if (this.equal) return;
            this.setEqual(value);
            this.renderEquation(value);
            const result = this.calculate(this.operator);
            this.setResult(result);
            this.renderResult(this.$result);
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
        const x = Number(this.firstNumber);
        const y = Number(this.secondNumber);
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
                if (x === 0) {
                    this.$display.innerHTML = '<div class="message" Can not divided by zero 😱</div>';
                    return '';
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

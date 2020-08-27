# Day07 : Calculator based Prototype

> `prototype개념`을 바탕으로 만든 계산기

> <del>기본적인 사칙연산 가능, 몇가지 기능들이 구현 안되었다👺</del>

> 기능 구현의 목표는 윈도우 계산기였지만 기본적인 기능보다 <u>약간 추가된 계산기</u> 정도가 되었다.
>
> > 연속계산 / 연산자 교체 / 클리어기능 2가지(전체 클리어 / 숫자 클리어) 등

# Preview

![calculator](./image/calculator.gif)

# Challenge

> `prototype`을 사용하여 계산기를 구현해봤지만, 무엇이 다른지 정확히 잘 모르겠다. 뭔가 달라지긴했는데, 구현 예제가 어울리지 않아서 그런지 `prototype을 사용하는 것`이 `유용하다` 혹은 `효율적이다` 라는 생각은 들지 못했다. 아직 경험이 부족하기 때문에 그런 것일 수 있다. 여러가지 다양한 예제를 접하고 다양한 것들을 만들어봐야 하겠다. prototype보다 `this`에 대해서 더 많이 생각한 프로젝트였던 것 같다.

<br/>

## JavaScript object literal

> 자바스크립트에서 `객체 안에서 메서드`를 표현하는 방법 : syntax

```javascript
//기본
const obj = {
    name: 'jjanmo',
    sayName: function () {
        console.log(this.name);
    },
};

//ES2015
const obj = {
    name: 'jjanmo',
    sayName() {
        console.log(this.name);
    },
};
```

<br/>

## `this` in Event Handler

-   이벤트 호출할 때는 핸들러 내부에서 가능한 **this를 사용하지 않는 것**을 추천한다.

    > event 내부의 속성인 `target / currentTarget`을 사용하는 것을 추천

-   target.addEventListener('event', handler);

    -   핸들러가 일반 함수인 경우 : `function(e) { }`

        > `handler == callback` : 여기서의 `this`가 `window`라고 생각할 수 있다. 하지만 여기서는 `target element`를 가르킨다. 내부적으로 그렇게 작동되게 만들어놓은 것이다. 즉 이벤트 속성의 `event.currentTarget`를 나타낸다.

    -   핸들러가 화살표 함수인 경우 : `(e) => ()`

        > 기본적으로 화살표함수 안에는 `this가 존재하지않는다`. 그래서 `상위 스코프의 this`를 사용한다.

        > 참고로 화살표 함수는 `call, apply, bind 메서드`를 사용하여 **this를 변경할 수 없다**.

-   나의 경우

    ```javascript
    //in prototype
    addEvent : function() {
        this.$calculater.addEventListener('click', this.onClick);
    }
    ```

    > 위의 설명처럼 핸들러는 2가지 함수 중에 한가지로 만들 수 있다. 각각의 핸들러 안에서this가 의미하는바가 달라져서 `this.setNumber()`의 작동 여부가 달라진다.

    ```javascript
    //일반함수
    onClick : function (e) {
        console.log(this); //this.$calculator : node element
        this.setNumber();
    }

    //화살표함수
    onClick :(e) =>{
        console.log(this); //this.$calculator : node element
        this.setNumber();
    }
    ```

    > 어떤 형태의 함수를 갖든 두가지 모두 this는 이벤트 리스너가 걸려있는 `currentTarget`을 가르킨다.

    > 그래서 두가지 모두 error가 뜬다 : setNumber is not a function....

    > > **Question)** 난 지금 prototype에 있는 setNumber 메서드를 사용하고 싶은 것이다.

    > > **Solution)** newApp()에 의해 생성된 인스턴스 객체를 `명시적으로 this를 바인딩`하여 이벤트 핸들러 내부에서 사용해야 한다.

    ```javascript
        addEvent : function (){
            const self = this;
            this.$calculater.addEventListener('click', this.onClick.bind(self));
        }
    ```

<br/>

## static method vs prototype method

> 이 둘을 메서드의 사용 용도에 따라서 나눌 수 있다. `static 메서드`의 경우 `유틸리티를 위한 메서드`를 만들 때 사용된다. 인스턴스 객체에서 사용하는 것이 아니기 때문에 인스턴스 `외부`에서 사용될 수 있는 것을 말한다.(이 말이 약간 이상하지만, 예제를 보면 어느정도 이해될 수 있다.) 반대로 prototype 메서드는 인스턴스 객체가 직접 사용할 수 있는 메서드이다. 그래서 인스턴스 객체 내부의 속성을 직접 접근하여 조작할 수 있는 메서드를 말한다.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

//static method
Person.comparedByAge = function (a, b) {
    console.dir(Person);
    if (a.age > b.age) return a.name;
    else return b.name;
};

//prototype method
Person.prototype.setAge = function (age) {
    this.age = age;
};
Person.prototype.getAge = function () {
    return this.age;
};

const jjanmo = new Person('jjanmo', 25);
const miso = new Person('miso', 30);
console.log('compare', Person.comparedByAge(jjanmo, miso)); //miso
miso.setAge(22);
console.log('compare', Person.comparedByAge(jjanmo, miso)); //jjanmo
console.log('jjanmo age', jjanmo.getAge(), 'miso age', miso.getAge()); //25, 22
```

> comparedByAge()는 static 메서드이다. 이것은 인스턴스 객체 내부가 아니라 인스턴스 객체들끼리 비교하기 위한 메서드이다. 이렇게 사용하는 것을 나는 `객체인스턴스 외부에서 사용할 수 있는 것`이라고 나타낸 것이다.(사실 이말이 정확한지는 모르겠지만, 무슨 말인지 어느정도 `감`잡을 수 있다면 우선 패스해보자🤣)

> 이밖에도 static혹은 prototype 메서드를 사용하는 목적에 대한 것들이 많을 것이다. 이를 점차 알아가는 것이 `객체지향`에 대해 좀 더 알아가는 과정일 것이다.

<br/>

# Improvement

> 시작은 단순 사친연산만을 목표로 만들었다. `prototype을 적용해보는 것`이 우선이였기 때문이다. 역시나 만들면서 기능추가를 하는 나를 또다시 발견하게 되었다. 구현하는 것이 많아지면 그만큼 넣어줘야하는 조건들이 많아졌다. 그 말은 코드가 너무 난잡해졌다. `스파게티...` 하...😤

-   [x] 연속 연산
    > 연산자 우선 순위가 적용되냐 안되냐에 따라서 결과값이 달라지기 때문에 입력한 순서대로 계산이 되도록 만들었다.
-   [x] 연산자 교체
-   [ ] `=`의 기능 추가
    > `=`을 누를 경우 같은 연산이 계속 반복된다.
-   [ ] 코드의 구조화
-   [ ] 좀 더 prototype을 구조적으로 활용할 수 있는 방법 찾아보기
-   [ ] `stack` 을 이용한 구현
-   [ ] 계산기 같은 경우 입력된 순서에 따라서 그 값이 달라진다. 그래서 작동하는 각각의 `함수의 순서`가 중요하다. 그런데 함수의 순서에 따라서 그 결과값에 영향을 미친다는 것은 별로 좋지않은 상황이라 생각한다. 이것을 개선해보자

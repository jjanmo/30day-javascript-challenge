# Day02 : Digital Clock vs Analog Clock

> 디지털 시계와 아날로그 시계의 구현

> [DEMO](https://codesandbox.io/s/day02analogclock-vs-digitalclock-xgjnn)

# Preview

![preview](image/preview.jpg)

> 버튼을 눌러서 디지털 시계와 아날로그 시계를 골라서 사용할 수 있다.

![update-analog-clock](./image/analog-clock.PNG)

# Challenge

## analog clock

> 이번 주제 자체는 그렇게 어렵지 않았다. 하지만 아날로그 시계를 만들어본 것은 안타깝게도 처음이다. 사실 아날로그 시계는 자바스크립트의 조작보다도 CSS를 좀 더 세밀하게 다룰 수 있으면 좀 더 깔끔한 아날로그 시계가 되는 것 같다. <del>나는 CSS를 잘 만지지 못하기 때문에...</del>

<br/>

시계의 핸드를 조절하기 위해선 `position : absolute`로 설정하여 시간에 따라서 `transform :rotate(deg)`의 deg를 조정하였다. 자바스크립트를 통해 매초 동적으로 스타일을 바꿔준다. 여기서 각각의 핸드의 위치가 뭔가 정교하지 못해서 약간은 삐툴어진 모습을 보였다. 정확히 딱 떨어지는 위치에 넣었음에도 뭔가 1px정도씩 달라지는 것들 있었는데, 아직까지는 무엇 때문인지 알아내지 못하였다.😭

> CSS는 잘하고자 하면 너무 시간이 오래걸리는 작업인 듯하다😵

<br/>

## Arrow Hands

> 화살표 모양 구현하기

> > `화살표모양`은 여기 저기 생각보다 많이 사용되는 것 같다. 하지만 매번 찾아보는 안타까움이 있어서 여기에 코드를 정리해보고자 한다.

<br />

### Pseudo-Element : before / after

> 가상 요소라고 불리는 before와 after는 HTML에는 구조적으로 존재하지 않지만 CSS를 통해서 임의로 특정 요소를 구현할 수 있도록 만들어진 것이다. 여기서는 화살표모양의 시계 핸드에서 활용하였다._(이외에도 많은 가상요소들이 존재한다.)_

```CSS
  div {
    margin: 5rem;
    width: 50px;
    background-color: aquamarine;
    height: 20px;
  }
  div:after {
    /* content 설정 */
    content: '';
    /* 위치지정 */
    position: absolute;
    top: 69px;
    left: 138px;
    /* border 설정 */
    border-right: 20px solid transparent;
    border-top: 20px solid transparent;
    border-left: 20px solid aqua;
    border-bottom: 20px solid transparent;
  }
```

![result](image/before-after.PNG)

> 위 코드의 결과이다. 가상요소에 의해서 아쿠아색의 화살표가 표현되었다.

> `before/after` 안에는 반드시 `content`라는 속성을 넣어줘야한다. 위에처럼 특정 내용이 없는 경우 `''` 이렇게 적어주면 된다. 어떤 특정 문구나 요소를 넣어줄 수 도 있다.

<br />

### Border

> 화살표 모양은 before나 after를 이용하지만 사실 `border`에 대해서 정확히 알면 구현할 수 있다고 생각한다.

![border](image/border.png)

> border은 위에 처럼 4부분으로 구성된다. 위의 그림은 `width와 height를 0`으로 놓고 border만 설정할 경우 마치 직사각형이 보여진다. 하지만 이렇게 4부분으로 구성된 것이 합쳐진 것이다.

> 만약에 화살표의 끝부분을 만들고 싶다면, `border-left` 만을 남기고 나머지 부분을 `transparent(투명)`처리하면 된다. (길이를 조절하면 좌우상하 관계없이 한부분을 제외하고 나머지를 투명처리하면 된다.)

<br/>

### How to use CSS variable in JavaScript : **UPDATE**

> 시계 바늘을 좀 더 매끄럽게 변경하는데 사용하였다.

```CSS
.hand{
  /* ... */
  --rotation : 0;
  transform : translateX(-50%) rotate(var(--rotation));
}
```

> 시계 바늘의 공통 CSS를 추가한다.

```JavaScript
function paintAnalogClock(){
  //....
  const now = getTime();
  secondsRatio = now.getSeconds() / 60;
  miniutesRatio = (secondsRatio  + now.getMinutes()) / 60;
  hoursRatio = (miniutesRatio + now.getHours()) / 12;

  setRotationRatioPerDegree($secondhand, value);
  setRotationRatioPerDegree($minutehand, value);
  setRotationRatioPerDegree($hourhand, value);
}

function setRotationRatioPerDegree(element, value){
  element.style.setProperty('--rotate-degree', `${value * 360}deg`);
}
```

> 처음 방법은 rotate degree를 매 초마다 직접 구해서 그 값을 이용해서 transform rotate를 수행하였다. 그렇게 하면 분/시 바늘이 점차적으로 움직이지 않고 초가 분이 바뀌거나 시가 바뀌는경우에만 움직이게 된다. 즉 바늘의 움직임이 약간 부자연스러울 수 있다.(점핑현상이 나타난다.)

> 지금 방법은 각 초와 분과 시 바늘의 현재의 위치가 시계 전체(360도) 중에서 얼마의 비율을 갖고 있는지를 구한 것이다. 거기에 초가 지남에 따라서, 분이 지남에 따라서 바늘이 아주 조금씩 움직이는데 초/분 비율을 더함으로서 이를 나타내었다. 이제 분/시 바늘은 자연스럽게 움직인다.

>      `element.style.setProperty('property-name', value)` CSS variable 역시 property이기 때문에 이렇게 접근이 가능하다(setter)

> **주의)** rotate(⭐) 안의 별표의 값은 `숫자deg` 이다. 그렇기 때문에 value가 숫자만 아님을 인지하다.

<br />

# Improvement

-   [ ] `Canvas`를 이용한 아날로그 시계의 구현

    > 디지털 시계 같은 경우에는 어렵지 않기 때문에 대부분 초창기에 많이 구현한다. `Date`라는 `built-in object`를 소개하기 위해서 같이 나오는 주제이다. 하지만 아날로그 시계 같은 경우는 구현하지 않는 경우가 많다. 오늘보니 왜 그런지 `어림짐작`할 수 있었다. 그리고 사실 아날로그 시계를 이런식으로 구현할수있다는 것도 최근에 알았다. `Canvas`를 알아야 구현하는 것이라고만 생각하고 있었는데, 나의 무지였던 것 같다.

-   [x] 아날로그 시계에 `숫자` 찍기

    > 이 부분은 수학적 능력이 요구된다. 시도는 해보았지만 원하는 위치에 시간을 제대로 찍어낼 수 없었다.

    ![sincos](image/4.png)

    > **생각)** 이런 식으로 삼각함수를 이용하여 접근하여 고민하다보면 해결되지않을까🙄

    > > **UPDATE)** 이 부분을 이렇게 계산을 하지않고 `CSS transform rotate` 만으로 해결하는 방법이 있었다. 하지만 숫자가 뒤집어진다는 단점이 있다.😨

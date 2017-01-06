
- product : __Adobe Illustrator__
- source link : https://github.com/RedgooseDev/adobe-script/blob/master/illustrator/createDuplicateForCircle/createDuplicateForCircle.js

위 이미지와같은 원형의 패턴을 만들고 싶은데 일러스트레이터 기본적인 방법으로는 사이즈가 커지는 문제가 일어나서 내가 원하는 형태의 패턴이 만들어지지가 않았다.

하루종일 방법을 찾아보았지만 안되어서 스크립트를 작성하는 방법으로 시도를 했다. 결과는 대성공.
하지만 다루기가 좀 불편하다. 아무래도 플러그인으로 만들면 상당히 괜찮을거 같은데 시간이 많이 걸릴거 같아서 엄두가 안나서 일단 이까지 마무리..


## using script

`Adobe Extendscript Toolkit CC` 프로그램을 이용하여 스크립트를 불러서 실행하는것이 가장 편했다.  
값을 바꿔가면서 계속 만들어야 하기때문에 값을 수정하고 `cmd(ctrl) + R`을 누르면 스크립트가 실행된다. __다음 그림과 같이 일러스트 프로그램과 연결해놓는건 잊지 않아야한다.__

![](http://goose.redgoose.me/data/upload/original/201611/Screen_2016-11-11_AM_43812.png)

파라메터는 `// act func` 부분의 값의 수치를 변경해주면 된다.


#### groupPosition

* `[10, 10]` : x, y 값
* `null` : 아트보드 중앙으로 이동한다.

아트보드 기준으로 만든 쉐이프 그룹 좌표를 설정해준다.

#### countForItem

한 원에 들어가는 쉐이프 갯수

#### countForCircle

원의 갯수

#### offset

원과 원의 거리

#### innerOffset

안쪽원의 거리

#### rotateMathod

* `"random"` : 랜덤으로 배치
* `null` : 정방향으로 배치

#### fillColor

쉐이프 면 컬러(hex)

#### shape

* `line` : 선
* `rectangle` : 사각형
* `circle` : 원

쉐이프의 모양을 결정한다.

#### size

쉐이프의 사이즈

#### strokeWidth

쉐이프 외곽선의 두께

#### strokeColor

쉐이프 외곽선의 컬러


## result

다음 그림과 같이 쉐이프가 만들어진다. 파라메터에 따라 자세한 설정을 조절할 수 있다.

![](http://goose.redgoose.me/data/upload/original/201611/Screen_2016-11-11_AM_42823.png)

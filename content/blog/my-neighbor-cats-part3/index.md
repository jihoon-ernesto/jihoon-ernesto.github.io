---
title: 우리 동네 고양이 - part 3
date: 2021-12-21T18:25:00+09:00
tags:
  - AWS
  - ABP
  - Amplify
  - my-neighbor-cats
description: 우리, 여기까지인 거야?
---

*(이전 글: [우리 동네 고양이 - part 2](../my-neighbor-cats-part2/))*

<br>

방법은 멀리 있지 않았다. 미키가 여태까지 쓰고 있던 AWS Amplify를 그대로 쓰면 되는 것이었다. 단, 웹 콘솔이 아니라 CLI 이용해서.

“Amplify에서 frontend와 backend 연결하는 방법 있는 것 아시잖아요? git 브랜치를 여러 개 만들 수 있듯이 backend 환경을 여러 개 만들 수 있어요. 각각의 backend 환경을 상황에 맞게 알맞은 git 브랜치에 연결해서 사용하면 돼요.”

Office Hour 시간에 AWS의 W님이 해준 대답이었다. 아… 그런 것이었다. 분명히 세미나 시간에 들었던 것이지만, 역시 직접 머리를 부딪쳐봐야 알게 되는 것이었다.

미키가 대충 이해한 바로는 이런 식이다. AWS 클라우드를 구성하는 방식은 여러 가지가 있을 수 있는데, 첫번째는 AWS 콘솔 웹페이지에 들어가서 마우스 클릭, 클릭, 하면서 구성하는 방식이다. Lambda 함수의 코드도 웹 화면에서 입력할 수 있다. 일단 처음 접할 때는 GUI 통해서 하는 거라 비교적 쉽게 접근할 수 있다는 장점이 있지만, 무슨 페이지 어떤 옵션에서 뭘 어떻게 했었는지 기억하기가 어렵고 여러 사람이 같이 작업하기 힘들다는 단점이 크다. 여태까지 미키와 친구들이 뚝딱뚝딱 해오고 있던 방식이었다.

두번째는 로컬 PC의 터미널에서 CLI 명령어들을 입력해서 구성하는 방식이다. Amplify 서비스의 경우, `amplify add function` 명령으로 로컬 PC 환경에서 Lambda Function을 추가하고, `amplify push` 명령으로 (마치 `git push` 하듯이) AWS 클라우드에 올리는 방식이다. 결과적으로 클라우드 자원이 만들어지는 것은 첫번째 방식을 쓰는 것과 마찬가지이지만, 어떤 명령어를 써서 만들었는지 기록을 남기기가 더 수월하다. 사용한 터미널 명령어들을 git 커밋 메시지에 써놓기만 해도 될 테니까. 비록 터미널 창에서 텍스트 질문 답변 식으로 진행하는 게 갑갑한 느낌이 들기도 하지만, 무슨 말인지 잘 몰라서 갑갑한 걸로 치자면 웹 콘솔 페이지도 별반 차이 없으니 도긴개긴이다.

게다가 Amplify CLI의 경우 결정적인 장점은 백엔드 환경을 왔다갔다하면서 작업할 수 있게 지원해준다는 것이다. `amplify env checkout` 명령으로 백엔드 환경 사이를 오갈 수 있고, 한 백엔드 환경에서 만든 자원은 다른 백엔드 환경 (말하자면 안정된 상태를 유지해야 하는 main 환경) 에 영향을 주지 않게 할 수 있다. 즉, main 환경 외에 dev 환경을 하나 더 만들어놓는다면, dev 환경에서 만든 DB나 Lambda 함수는 main 환경과는 별도로 관리되기 때문에 마음 놓고 이것저것 실험하고 삽질을 해도 되는 것이다. 바로 이거였다! 이런 식으로 개발 환경 구성을 해놓고 시작해야 팀 작업을 제대로 할 수 있을 것이었다.

하지만, 그것도 이론적으로 좋은 것이고 그 방법론을 제대로 숙지한 상태에서 작업하는 거라면 괜찮았을 테지만, 미키와 친구들은 다들 AWS 초보… 실제로 해보니 완전히 깔끔하게 돌아가는 느낌은 아니었다. 로컬 인프라 상태를 `amplify push` 해서 클라우드로 올렸는데 일부 파일이 또 변경되는 경우가 있기도 하고, `git push/pull` 상태와 `amplify push/pull` 상태가 헷갈릴 때도 많고 그랬다. 뭐, 그런 것도 미키가 아직 익숙하지 않아서 미심쩍게 느낀 것일 수도 있다.

\*

회사 옆 스타벅스는 여전히 활기가 넘친다. 코로나19 조심하느라 다들 마스크 쓰고 돌아다니고, 앉을 수 있는 자리도 이전보다 줄어들었지만 그래도 늘 북적인다. 그 무리들 중, 출입문 옆 한 구석 동그란 테이블에 미키와 W, K가 노트북 하나 놓고 옹기종기 앉아있다. 오늘은 첫번째 오프라인 모임이다. 그렇다, 이제 프로젝트 막바지를 향해 가고 있는 와중에 처음으로 얼굴을 마주하게 된 것이다.

“진작에 이렇게 모였어야 하는데 죄송해요. 이제서야 뵙게 됐네요.”

사실 미키로서는 W와 K에게 어느 정도로 열심히 이 프로젝트에 참여해달라고 요청해야 할지 애매하기는 했다. 각자 팀도 다르고 원래 하던 일들도 있으니, 사이드로 하는 이 작업에 미키가 무작정 푸시할 수는 없는 노릇이니까. 그래도, 기왕에 같이 하기로 한 것이었으니 조금은 더 적극적으로 연락하고 모일 필요는 있었고, 그건 미키가 살짝 놓친 점이었다. 

뒤늦은 첫 모임이었지만, 어쩌면 그래서 더 그랬는지도 모르지만, 다들 할 말이 많았다. 자기가 했던 삽질 자랑도 한참 하고 (서로 완전히 다 알아들은 것 같지는 않았지만…), W는 AWS 계정 로그인을 좀 더 편하게 하는 팁도 알려주고, K는 우리가 처음 계획할 때 고급 기능으로 생각해둔 Rekognition 서비스를 이용한 고양이 이미지 인식 기능을 만들어보겠다고 의욕을 보여줬다. 그래, 팀으로 같이 뭘 한다는 게 이런 거지. 따뜻한 라떼도 맛이 좋았다. 미키는 오래간만에 이런 기분을 느껴보는 것 같았다. 같이 일하는 게 재미있다, 재/미/있/다/는 느낌.

\*

거의 다 됐다. 일주일의 시간을 더 얻은 덕분에 그래도 데모를 보여줄 수 있는 정도로는 만들어지게 되었다. 이제 K가 작업해준 고양이 인식 기능 하나만 더 붙이면 정말 좋을 것 같다. 원래 고급 기능으로 분류했던 것까지 해내는 것이니 이 얼마나 뿌듯한 일인가.

Rekognition을 이용해서 고양이인지 아닌지 판별하는 것은 별도의 Lambda 함수로 구성되어 있었고, 이번에는 파이썬 대신 Node.js 로 구현되어 있었다. 이미지 파일 저장용 S3 버킷에 새 사진이 업로드되면 이 판별 함수가 실행되도록 하면 되었는데, 그러려면 시스템 연동 경로를 약간 수정해야 했다. 고양이 판별용 Lambda 함수 말고 그 전에 W가 만들어준 썸네일 생성용 Lambda 함수도 있었는데, 그 두 Lambda 함수 모두 S3 버킷의 새 이미지 업로드 이벤트를 트리거로 삼아 반응해야 하는 것이었다. 하지만 S3 버킷에서 직접 이벤트를 받는 것은 단 하나의 Lambda 에서만 가능했기 때문에, 다른 연결 방식이 필요했다.

미키는 SNS(Simple Notification Service)를 사용하기로 했다. S3 버킷의 이미지 업로드가 `cat-photo-uploaded` 라는 SNS 토픽을 발생시키도록 하고, 이 토픽을 두 개의 Lambda 함수에서 받아서 각각 자기 할 일을 하는 거다. 하나는 원본 이미지로부터 썸네일 이미지를 생성해서 따로 저장해두고, 다른 하나는 원본 이미지를 살펴보고 고양이 사진인지 아닌지를 판별한 다음 DB에 결과를 쓰는 거다. 이거 고양이 맞음, 또는 고양이 아님.

Amplify CLI 에서 곧바로 SNS topic을 생성할 수 있으면 좋을 텐데, 미키는 CLI에서는 딱 맞는 방법을 찾지는 못했다. `amplify add notifications` 명령으로 할 수 있을 줄 알았는데, 지금 사용하려는 상황에 맞는 걸 생성하는 방법은 아닌 것 같았다. Amplify CLI가 커버할 수 있는 영역이 한정되어 있다고 들었는데 어쩌면 이것도 그런 것일지도 몰랐다. 가능한 한 모든 것을 기록으로 남기고 싶었는데… 미키는 약간 아쉬운 마음이 들었다. 제대로 이력을 남기면서 클라우드 인프라 관리를 하려면 CDK 같은 본격적인 IaC(Infra as Code) 도구를 함께 써야 하는 것 같았다.

좋아, 일단은 되게 해야지. 웹 콘솔에서 추가하고, S3 버킷과 두 Lambda 사이를 연결해주었다. Lambda의 입력으로 들어오는 이벤트 개체의 형식이 달라졌으니 그 부분들의 코드도 살짝 수정해주고. 이제 AWS에 약간은 익숙해진 것이었을까? 미키는 이제 어찌어찌 대충 구현하는 건 그럭저럭 할만하다고 느꼈다. “다 필요 없고요. 일단 돌아가게 만들어보세요.” AWS I 님의 메시지는 프로젝트 기간 내내 마치 요다의 메시지처럼 미키의 머리 속을 맴돌고 있었다. *다 필요 없고요… 다 필요 없고요…*

그런데 아직 하나가 해결이 안 되고 있었다. 고양이 판별 결과를 DB에 남겨야 하는데, DynamoDB에 접근해서 쓰는 게 잘 안 되고 있었다. 로그를 찍는 코드를 넣었는데도, CloudWatch에 아무 로그도 남지 않고. 어떻게 된 거지?

일요일 오후였다. 이제 구현 작업은 마무리를 하고, 발표 자료를 만들어야 할 시점이었다. 가족들은 밖에서 문을 두드리고 있었다. *“Do you wanna build a snowman?”* 아니 그건 아니고. 하여튼 얼마간을 끙끙댄 미키는 약간, 그만 하고 싶다는 생각도 들었다. ‘이건 그냥 뺄까..?’ 있으면 좋지만 없어도 뭐, 큰 지장이 있는 건 아닌 기능이었으니까. 하지만 미키는 곧 머리를 흔들었다. 아냐, 이건 분명히 별 거 아닌 걸 몰라서 헤매고 있는 걸 거야. 이런 걸 해결 못해서 멈추면 너무 아깝지.

그리고 안타깝게도, 미키가 맞았다. DB에 접근하는 코드는 어쩌면 당연히 비동기로 동작하도록 해야 하는데, 그 구현을 제대로 안 했기 때문에 DB 관련 동작을 제대로 수행하기도 전에 Lambda 함수가 종료되어 버린 것이었고, 따라서 로그조차도 남지 않았던 것이었다. 이런… 미키는 몹시 부끄러운 생각이 들었다. 명색이 JavaScript 개발자라고 하면서 Promise 비동기 코드도 제대로 못 짜서 이렇게 헤매다니. 내가 이런 걸 잘 몰라서 헤맸다는 건 아무한테도 얘기하지 말아야지. 남부끄러운 일이니까. 암, 그렇고말고. 절대 말 안 할 거야.

<br>
<br>

|   |   |
|---|---|
| ![스크린샷-1](my-neighbor-cats-screenshot-1.png) | ![스크린샷-2](my-neighbor-cats-screenshot-2.png) |

<figure>
  <figcaption>그런데 넌 왜 고양이가 아닌 거니...</figcaption>
</figure>

발표는 잘 진행되었다. W, K와 공동 편집한 발표 자료를 가지고 데모도 간단히 잘 보여주고, 처음 설계와 달라진 점들, 또 그동안 작업을 하면서 삽질했던 내용들을 소개했다. 그리고, 테스트하면서 발견한 치명적인 결함도 소개했다.

“이거, 이 문제 해결 안 되면 사업 접어야 해요!”

미키의 이 말에 다들 즐거워(?)했다. 아이폰 사파리에서 실행되는 웹 앱의 경우, 사진을 업로드하면 사진 안에 있는 위치 정보가 삭제되는 문제가 있었던 것인데, 개인정보 보호 이슈 때문에 브라우저에서 강제로 그렇게 하는 모양이었다. 그런데 위치 정보가 없으면 동네 지도에 표시를 할 수 없으니 이 서비스 자체가 구성될 수 없었다.

하여튼 이런저런 이슈들과 향후의 과제 등에 대해서도 소개하였고, 프로젝트 처음 시작할 때의 주제 발표 시간에 그랬던 것처럼 많은 관심과 뜨거운 반응을 얻었다. 발표 후에 자료를 이메일로 공유했을 때도 AWS SA 분들이 다들 감사 인사와 함께 열렬히 추가 정보 - 위치 정보 삭제 문제에 대한 해법도 포함해서! - 를 제공해주셔서 미키는 정말 고마운 마음이 들었다. 어찌 보면 별 거 아닌 데모 프로젝트, 혹은 실습 과제 정도일 뿐이지만 그냥 이렇게 끝내고 말기에는 너무 아깝다는 생각이 들었다. 뭐라도 흔적을 남겨야겠어. 가령, 하다못해 블로그 글 한 편이라도… 제목은 뭘로 할까? "본격 웹 개발 프로젝트: 우리 동네 고양이" 이런 건 어때. 아냐, 너무 거창해, 하나도 본격적이지 않은데. 그냥 "우리 동네 고양이"가 좋겠어. 단순하고, 아름답고, 완벽해. 미키는 괜시리 마음이 설레었다.

<br>
<br>


<figure>
  <img src="my-neighbor-cats-arch-v1.2.png" alt="changed-architecture" />
  <figcaption>프로젝트 구조 - 구현하면서 달라진 설계</figcaption>
</figure>

<br>
<br>
<br>
<br>

\*

이제 해가 뉘엿뉘엿 넘어가고 있다. 오늘도 좋은 날이었다. 더운 열기는 여전하지만 그 사이로 한줄기 시원한 바람이 지나갈 때가 있다. 어느 새, 계절이 모습을 바꾸고 있는 게 느껴진다.
저쪽에서 누가 오고 있다. 지난 번 이후로 종종 찾아오던 싱거운 휴먼, 미키다. 이젠 내 친구라도 된다는 듯이 씩 웃으면서 사뭇 당당하게 휴대폰을 꺼낸다. 약간 어이가 없다. 딴 데로 자리를 옮겨야겠다. 

“어…”

미키는 좀 당황하는 것 같다. 알 게 뭐람.

“바둑아, 고마워! 잘 지내~!”

도대체 뭐래는 거야. 울타리 위로 뛰어올랐다. 사뿐사뿐 동네 산책이나 하고 와야겠다. 어디선가 좋은 냄새가 난다.

<br>
<br>

*The End*

<figure style="max-width:320px">
  <img src="cat-back.jpg" alt="뒷모습-고양이" />
</figure>

### Links

- [우리 동네 고양이 프로젝트 저장소](https://github.com/hnc-jihoon/my-neighbor-cats)


#### Thank you

*함께 프로젝트에 참여해준 [W님](https://github.com/hnc-kaisin)과 [K님](https://github.com/hnc-keonwookim)에게 감사의 인사를 전합니다.*

---

**Note**

*이 글은 아직 공사중인 다른 블로그 사이트에 먼저 쓴 글입니다. 그 사이트가 공개되면 출처를 남기겠습니다.*
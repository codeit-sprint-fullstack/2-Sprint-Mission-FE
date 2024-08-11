## 요구사항

### 기본

#### Sprint mission 1

- [x]  React와 같은 UI 라이브러리를 사용하지 않고 진행합니다

- [x]  PC사이즈만 고려해 주어진 디자인으로 구현합니다.

- [x]  HTML, CSS 파일을 Netlify로 배포해 주세요. (참고: https://www.codeit.kr/learn/5309)

- [x]  랜딩 페이지의 url path는 루트(‘/’)로 설정합니다.

- [x]  title은 “판다마켓”로 설정합니다.

- [x]  “판다마켓” 로고 클릭 시 루트 페이지(‘/’)로 이동합니다.

- [x]  '로그인' 버튼 클릭 시 로그인 페이지(‘/login’)로 이동합니다 (빈 페이지)

- [x]  “구경하러 가기”버튼 클릭 시(’/items’)로 이동합니다. (빈 페이지)

- [x]  “Privacy Policy”, “FAQ”는 클릭 시 각각 Privacy 페이지(‘/privacy’), FAQ 페이지(‘/faq’)로 이동합니다.(모두 빈 페이지)

- [x]  페이스북, 트위터, 유튜브, 인스타그램 아이콘을 클릭 시 각각의 홈페이지로 새로운 창이 열리면서 이동합니다.

- [x]  아래로 스크롤해도 “판다 마켓” 로고와 “로그인” 버튼이 있는 상단 내비게이션 바(Global Navigation Bar)가 최상단에 고정되게 해 주세요.

- [x]  화면의 너비가 1920px 이상이면 하늘색 배경색은 너비를 꽉 채우도록 채워지고, 내부 요소들의 위치는 고정되고, 여백만 커지도록 합니다.

- [x]  화면의 너비가 1920px 보다 작아질 때, “판다마켓” 로고의 왼쪽 여백 200px, “로그인" 버튼의 오른쪽 여백 200px이 유지되고, 화면의 너비가 작아질수록 두 요소 간 거리가 가까워지도록 설정합니다.

- [x]  화면의 너비가 1920px 이상이면 내부에 있는 요소 간 동일한 간격을 유지하며 가운데 정렬해야 합니다.

- [x]  화면의 너비가 1920px 보다 작아질 때, 최하단에 있는 “codeit-2024”의 왼쪽 여백 200px과 SNS 아이콘들의 오른쪽 여백 200px을 유지하면서 가운데 있는 “Privacy Policy”, “FAQ” 요소와 각각 동일한 간격을 유지하며 가까워져야 합니다.

- [x]  클릭으로 기능이 동작해야 하는 경우, 사용자가 클릭할 수 있는 요소임을 알 수 있도록 CSS 속성 cursor: pointer로 설정합니다.

### 심화
- [x] reset.css를 설정해 주세요.

- [x] 사용자의 브라우저 설정에 따라 기본 폰트 크기 설정이 변화함에 따라서 페이지의 요소 간 간격, 요소의 크기, font-size 등 모든 크기와 관련된 값이 크고 작아지도록 설정해 주세요.

---
#### sprint mission2
- [x]  Git 활용 과정에서 유닉스 커맨드를 활용해 주세요.

- [x]  HTML, CSS 파일을 Netlify로 배포합니다.

##### 로그인 페이지, 회원가입 페이지 공통

- [x] “판다마켓" 로고 클릭 시 루트 페이지(“/”)로 이동합니다.
- [x] 로그인 페이지, 회원가입 페이지 모두 로고 위 상단 여백이 동일합니다.
- [x] SNS 아이콘들은 클릭 시 각각 “https://www.google.com/”, “https://www.kakaocorp.com/page/” 으로 이동합니다.
- [x] input 요소에 focus in 일 때, 테두리 색상은 ##3692FF입니다.
- [x] input 요소에 focus out 일 때, 테두리는 없습니다.

##### 로그인 페이지

- [x] “회원가입”버튼 클릭 시 “/signup” 페이지로 이동합니다.

##### 회원가입 페이지

- [x] “로그인”버튼 클릭 시 “/login” 페이지로 이동합니다
### 심화

- [x] palette에 있는 color값들을 css 변수로 등록해서 사용합니다.
- [x] 구글 애널리틱스로 방문자 수 확인하기 할 수 있도록 설정합니다.
- [x] 비밀번호, 비밀번호 확인 input 요소 오른쪽에 비밀번호를 확인할 수 있는 눈 모양 아이콘을 추가합니다.

구글 애널리틱스는 index.html을 기준으로 하였습니다.


## 주요 변경사항

- https://codeitmission12panda.netlify.app (스프린트 미션 1 & 2 사이트)

  
1. 판다 이미지 전체화면 시 확대됨. -> css background-image에서 html img로 첨부함
2. features design requirement -> 짝수, 홀수 컨텐츠에 따라 (even-feature, odd-feature) 배너 옆 빈공간 생성 & 전체 배너 배경색 채움
3. #second id 포괄적 x -> 미래에 feature들이 생성되는 것을 고려하여 odd-feature / odd-feature-content class로 변경
4. 눈모양 이름 모호함 -> btnpassword.png를 password-active-toggle.png로 / class명도 password-active-toggle로 변경
5. login btn은 다른 단어 -> login-btn으로 변경
6. 간편 로그인 box 모호함 -> easy-login-section으로 변경
7. login.html 모호함 -> 5, 6을 통해 해결
8. 자손 선택자 혼동 -> h5, h2, p 태그를 각 feature-subtitle, feature-title, feature-description으로 class 명명함.

## 스크린샷

#### 랜딩 페이지
![image](https://github.com/user-attachments/assets/7e0135d3-f3f3-422b-baf3-355a71431627)
#### 로그인 페이지
![image](https://github.com/user-attachments/assets/edf795a6-bbf5-4eb9-9fbc-fce8f1be4576)
#### 회원가입 페이지
![image](https://github.com/user-attachments/assets/7bc5da0c-b4a8-46bc-964e-c2b12500201a)


## 멘토에게
- 리뷰 반영하여 수정하였습니다!
- 창크기 작아질 때 고려하여 background-image를 사용하였는데 변경사항 1번에서 img로 변경하면서 창크기가 작아지면 wrapper랑 겹쳐지는 데 어떻게 해결해야할까요?
- 변경사항 2번: 창크기가 가장 클 때를 기준으로 feature-content 박스 크기를 정했으나 작아지면 사이즈가 그대로입니다. 옆 image와 height를 똑같이 하여 고정하고 싶습니다.
  
  


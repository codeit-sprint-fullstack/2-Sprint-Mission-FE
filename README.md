## 요구사항

### Sprint mission 3

로그인, 회원가입 페이지 공통

- [x] 로그인 및 회원가입 페이지의 이메일, 비밀번호, 비밀번호 확인 input에 필요한 유효성 검증 함수를 만들고 적용해 주세요.
- [x] 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
- [x] 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
- [x] 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
- [x] 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.
- [x] input 에 빈 값이 있거나 에러 메세지가 있으면 ‘로그인’ 버튼은 비활성화 됩니다.
- [x] Input 에 유효한 값을 입력하면 ‘로그인' 버튼이 활성화 됩니다.
- [x] 활성화된 ‘로그인’ 버튼을 누르면 “/items” 로 이동합니다

#### 로그인 페이지

- [x] 이메일과 비밀번호를 입력하고 로그인 버튼을 누른 후, 다음 조건을 참조하여 로그인 성공 여부를 alert 메시지로 출력합니다.
만약 입력한 이메일이 데이터베이스(USER_DATA)에 없거나, 이메일은 일치하지만 비밀번호가 틀린 경우, '비밀번호가 일치하지 않습니다.'라는 메시지를 alert로 표시합니다
만약 입력한 이메일이 데이터베이스에 존재하고, 비밀번호도 일치할 경우, “/items”로 이동합니다.
회원가입

- [x] 회원가입을 위해 이메일, 닉네임, 비밀번호, 비밀번호 확인을 입력한 뒤, 회원가입 버튼을 클릭하세요. 그 후에는 다음 조건에 따라 회원가입 가능 여부를 alert로 알려주세요.
입력한 이메일이 이미 데이터베이스(USER_DATA)에 존재하는 경우, '사용 중인 이메일입니다'라는 메시지를 alert로 표시합니다.
입력한 이메일이 데이터베이스(USER_DATA)에 없는 경우, 회원가입이 성공적으로 처리되었으므로 로그인 페이지(”/login”)로 이동합니다.

### 심화 요구사항

- [ ] 페이스북, 카카오톡, 디스코드, 트위터 등 SNS에서 판다마켓 랜딩 페이지(“/”) 공유 시 미리보기를 볼 수 있도록 랜딩 페이지 메타 태그를 설정합니다.
- [ ] 미리보기에서 제목은 “판다마켓”, 설명은 “일상에서 모든 물건을 거래해보세요”로 설정합니다.
- [ ] 주소와 이미지는 자유롭게 설정하세요.
- [ ] 로그인, 회원가입 페이지에 공통으로 사용하는 로직이 있다면, 반복하지 않고 공통된 로직을 모듈로 분리해 사용해 주세요.


#### 랜딩 페이지

- [x] 브라우저에 현재 보이는 화면의 영역(viewport) 너비를 기준으로 분기되는 반응형 디자인을 적용합니다.
PC: 1200px 이상
Tablet: 744px 이상 ~ 1199px 이하
Mobile: 375px 이상 ~ 743px 이하
375px 미만 사이즈의 디자인은 고려하지 않습니다
- [x] Tablet 사이즈로 작아질 때 최소 좌우 여백이 “판다마켓” 로고의 왼쪽에 여백 24px, “로그인” 버튼 오른쪽 여백 24px을 유지할 수 있도록 “판다마켓” 로고와 “로그인" 버튼의 간격이 가까워집니다.
- [x] Mobile 사이즈로 작아질 때 최소 좌우 여백이 “판다마켓” 로고의 왼쪽에 여백 16px, “로그인” 버튼 오른쪽 여백 16px을 유지할 수 있도록 “판다마켓” 로고와 “로그인" 버튼의 간격이 가까워집니다.
- [x] PC, Tablet 사이즈의 이미지 크기는 고정값을 사용합니다.
- [ ] Mobile 사이즈의 이미지는 좌우 여백 32px을 제외하고 이미지 영역이 꽉 차게 구현합니다. (이때 가로가 커지는 비율에 맞춰 세로도 커져야 합니다.)
- [ ] Mobile 사이즈 너비가 커지면, “Privacy Policy”, “FAQ”, “codeit-2023”이 있는 영역과 SNS 아이콘들이 있는 영역의 사이 간격이 커집니다.

#### 로그인, 회원가입 페이지 공통

- [x] Tablet 사이즈에서 내부 디자인은 PC사이즈와 동일합니다.
- [x] Mobile 사이즈에서 좌우 여백 16px 제외하고 내부 요소들이 너비를 모두 차지합니다.
- [x] Mobile 사이즈에서 내부 요소들의 너비는 기기의 너비가 커지는 만큼 커지지만 400px을 넘지 않습니다.
- [ ] 오류 메시지 모달을 구현합니다. 모달 내 내용은 alert 메시지와 동일합니다.
- [ ] 비밀번호 및 비밀번호 확인 입력란에 눈 모양 아이콘 클릭 시 비밀번호 표시/숨기기 토글이 가능합니다. 기본 상태는 비밀번호 숨김으로 설정합니다.


## 주요 변경사항
  - 함수 이름 수정
  - 데이터베이스 추가
  - 


## 스크린샷

#### 로그인 페이지
로그인 포커스 아웃됐을 때
![image](https://github.com/user-attachments/assets/17c96bd3-3808-4127-92f4-ab5b2aee5e07)
로그인 버튼 활성화
![image](https://github.com/user-attachments/assets/d7a7e40d-3877-40bf-a077-a7ca36cc43cd)
#### 회원가입 페이지
회원가입 입력이 다 잘못됐을 때
![image](https://github.com/user-attachments/assets/9e11ca00-fc4f-47ed-9c8b-fd6f720dd09e)
회원가입 버튼 활성화
![image](https://github.com/user-attachments/assets/f3f20177-a31a-449a-8c29-f3c29fb75654)


## 멘토에게
- 모바일용 랜딩페이지에서 footer 순서
- 태블릿 및 모바일 랜딩페이지 배너 이미지 가운데 정렬하기
=======
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
  
  


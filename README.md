## 기본 요구사항

### 공통

- [ ] Github에 위클리 미션 PR을 만들어 주세요.
- [ ] React 혹은 Next.js를 사용해 진행합니다.
- [ ] 프론트엔드에서 api 요청 구현은 TanStack React Query를 활용해 주세요.
- [ ] API는 https://panda-market-api.vercel.app를 사용합니다. 명세는 https://panda-market-api.vercel.app/docs를 확인해 주세요.

### 로그인/회원가입 페이지

- [ ] JavaScript로 구현한 로그인/회원가입 페이지를 React.js 혹은 Next.js로 마이그레이션해 주세요.

### 로그인 페이지

- [ ] "회원 가입하기"를 클릭하면 회원가입 페이지로 이동해 주세요.
- [ ] 로그인 실패하는 경우, 이메일 input 아래에 "이메일을 확인해 주세요.", 비밀번호 input 아래에 "비밀번호를 확인해 주세요." 에러 메시지를 표시해 주세요.
- [ ] 로그인 버튼이 활성화된 후, 로그인 버튼 클릭 또는 Enter키 입력으로 로그인 실행합니다.
- [ ] "/api/signIn"으로 POST 요청해서 성공 응답을 받으면 중고 마켓 페이지로 이동합니다. 참고로 JWT로 구현되어 있습니다.
- [ ] 실패할 경우, 실패 메시지를 모달을 통해 표시합니다.

### 회원가입 페이지

- [ ] "회원 가입하기"를 클릭하면 '/signin' 페이지로 이동합니다
- [ ] 회원가입 버튼 클릭 또는 Enter키 입력으로 회원가입을 실행합니다.
- [ ] 비밀번호 input과 비밀번호 확인 input의 값이 다른 경우, 비밀번호 확인 input 아래에 "비밀번호가 일치하지 않아요." 에러 메시지를 표시해 주세요.
- [ ] 버튼이 활성화된 후, 회원가입은 "/api/signUp" POST 요청해서 진행합니다. 참고로 JWT로 구현되어 있습니다.
- [ ] 회원가입 성공 응답을 받으면 중고마켓 페이지로 이동합니다.
- [ ] 실패할 경우, 실패 메시지를 모달을 통해 표시합니다.

### 로그인, 회원가입 페이지 공통

- [ ] 눈 모양 아이콘 클릭 시 비밀번호의 문자열이 보이기도 하고, 가려집니다.
- [ ] 비밀번호의 문자열이 가려질 때는 눈 모양 아이콘에는 사선이 그어져 있고, 비밀번호의 문자열이 보일 때는 사선이 없는 눈 모양 아이콘이 보입니다.
- [ ] 소셜 로그인에 구글 아이콘 클릭 시 'https://www.google.com', 카카오 아이콘 클릭 시 'https://www.kakaocorp.com/page'로 이동합니다.
- [ ] 로그인/회원가입 시 성공 응답으로 받은 accessToken을 로컬 스토리지에 저장합니다.
- [ ] 로그인/회원가입 페이지에 접근 시 로컬 스토리지에 accessToken이 있는 경우 '/folder' 페이지로 이동합니다.

### GNB

-[ ] 상단 내비게이션 바에 프로필 영역은 인가된 경우, 유저 정보 API를 활용해 주세요. -[ ] 인가되지 않았을 경우 "로그인" 버튼이 보이게 해 주세요.

### 상품 상세 페이지

- [ ] PC, Tablet, Mobile 디자인에 해당하는 상품 상세 페이지를 만들어 주세요.
- [ ] 상품 상세 페이지 url path는 "/items/{itemId)"로 설정하세요.
- [ ] '목록으로 돌아가기' 버튼 클릭 시 중고마켓 페이지 "/items"로 이동합니다.
- [ ] 상품 상세 데이터는 '/products/{productId}' GET 메서드 사용해 불러오세요. 이때, 상품 상세 조회는 인가된 사용자만 이용할 수 있도록 합니다.
- [ ] 상품에 대한 댓글 조회도 가능합니다.
- [ ] 상품 수정 및 삭제 기능을 API를 활용해 구현합니다. 이때, 인가된 사용자만 이용할 수 있도록 합니다.
- [ ] 상품 수정은 '/products/{productId}' PUT을 사용합니다.
- [ ] 상품 삭제는 '/products/{productId}' DELETE를 사용합니다.
- [ ] 상품 삭제 전, 확인 모달을 띄워주세요.
- [ ] 상품에 대한 좋아요 및 좋아요 취소 기능을 https://panda-market-api.vercel.app/docs에 명세된 '/products/{productId}/favorite' POST & DELETE 활용해 구현합니다. 이때 인가된 사용자만 좋아요 기능을 이용할 수 있도록 합니다.
- [ ] 댓글 생성 및 삭제 기능을 API를 활용해 구현합니다. 이때, 인가된 사용자만 이용할 수 있도록 합니다.
- [ ] 댓글 수정은 https://panda-market-api.vercel.app/docs에 명세된 '/products/{productId}/comments' PUT을 사용합니다.
- [ ] 댓글 삭제는 https://panda-market-api.vercel.app/docs에 명세된 '/products/{productId}/comments' DELETE를 사용합니다.

## 심화 요구사항

### 로그인 및 회원가입 페이지 공통

- [ ] 로그인, 회원가입 기능에 react-hook-form을 활용해 주세요.
- [ ] 브라우저에 현재 보이는 화면의 영역(viewport) 너비를 기준으로 분기되는 반응형 디자인을 적용합니다.
- PC: 1200px 이상
- Tablet: 744px 이상 ~ 1199px 이하
- Mobile: 375px 이상 ~ 743px 이하
  375px 미만 사이즈의 디자인은 고려하지 않습니다

### 유저 기능

- [ ] 리퀘스트 헤더에 인증 토큰을 첨부할 때 axios interceptors를 활용해 주세요. (axios를 사용하지 않는다면 이와 유사한 기능을 활용해 주세요.)

### React-Query로 마이그레이션

- [ ] fetch 혹은 axios로 구현된 기존의 API 요청 코드를 React-Qeury로 마이그레이션 합니다.

### 로딩 및 에러 핸들링

- [ ] 로딩 인디케이터와 에러 메시지를 구현합니다.
- [ ] 상품 목록 및 상품 상세 데이터를 Prefetching 합니다

### 상품 데이터 캐싱 및 업데이트

- [ ] React Query의 캐싱 기능을 활용하여 데이터 로딩 시간을 최소화합니다.
- [ ] 상품 목록 페이지에서 데이터의 실시간 업데이트를 위해 적절한 Query Refresh 설정을 적용합니다.

## 주요 변경사항

-
-

## 멘토에게

- 셀프 코드 리뷰를 통해 질문 이어가겠습니다.

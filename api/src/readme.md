
# Software Architecture

해당 예제에서는 DDD(`Domain Driven Development`) 의 개념을 일부 차용하여 작성되었습니다.

DDD 에서는 소프트웨어의 레이어를 다음과 같이 구분합니다.

- Infra Layer (`src/infra`)
- Interface Layer (`src/interface`)
- Application Layer (`src/application`)
- Domain Layer (`src/domain`)

## Domain Layer

DB에 영속화되며 소프트웨어에서 주로 다루고 있는 관심사를 도메인이라고 합니다.

판다 마켓에서는 다음과 같이 5개의 도메인을 다루고 있습니다.

- Article
- Comment
- Like
- Product
- User

각 도매인에서는 고유규칙을 가지고 있을 수 있으며, 이것을 `도메인 규칙` 이라고 합니다.

아직 판다마켓에서는 도메인 규칙이 없지만, 도메인 규칙으로 다음 예시들을 들 수 있습니다.

- 구글로 가입한 사용자는 패스워드로 로그인할 수 없다.
- 아카이브 상태의 게시글은 제목을 수정할 수 없다.
- ...


## Application Layer

도메인 객체과 그 외의 의존성을 조합하여 기능을 구현하는 레이어입니다.

예를 들어 `구글 로그인` 을 구현하기 위해서는 아래의 3개 준비물이 필요합니다.

- User (도메인 객체)
- GoogleOAuthAdapter (의존성)
- Prisma Client (의존성)

마찬가지로 `게시글에 좋아요` 를 구현하기 위해서는 아래의 3개 준비물이 필요합니다.

- Article (도메인 객체)
- Like (도메인 객체)
- Prisma Client (의존성)


## Interface Layer

사용자와의 상호작용을 주요 관심사로 다루는 레이어입니다.

아래 항목들을 관리합니다.

- API 인터페이스 정의
    - 요청 페이로드 형식
    - 요청 페이로드에 대한 유효성 검사
    - 응답 형식
- 인증
- 추가적인 인가


## Infra Layer

외부 의존성을 주요 관심사로 다루는 레이어입니다.

- 사용하고 있는 DB 및 클라이언트
- AuthToken 발급 방식
- 유저 패스워드 암호화 방식
- 구글 OAuth API 인터페이스


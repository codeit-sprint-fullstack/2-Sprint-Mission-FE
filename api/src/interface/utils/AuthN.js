import { AuthTokenManager } from '../../infra/AuthTokenManager.js';

/**
 * 인증 미들웨어
 *
 * HTTP 메시지에서 authorization 헤더로 전달된 JWT 토큰을 검증합니다.
 * 아래 케이스의 경우 401 Unauthorized 응답을 반환합니다.
 *
 * - JWT 토큰이 전달되지 않은 경우
 * - JWT 토큰이 유효하지 않은 경우 (ex 시크릿 키가 일치하지 않는 경우)
 * - JWT 토큰이 만료된 경우
 */
export function AuthN() {
    return async function (req, res, next) {
        const jwtToken = req?.headers?.authorization?.split(' ')[1]; // "bearer JWT_TOKEN" 형태로 전달받음

        if (AuthTokenManager.isValidAccessToken(jwtToken) === false) {
            return res.status(401).send({
                name: 'Unauthorized',
                message: 'Invalid JWT token',
            });
        }

        return next();
    };
}

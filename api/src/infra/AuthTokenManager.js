import jwt from 'jsonwebtoken';

export class AuthTokenManager {
    /**
     * 현재 시각으로부터 1시간동안 유효한 액세스 토큰을 생성합니다.
     */
    static buildAccessToken(payload) {
        return jwt.sign(
            {
                user: {
                    id: payload.userId,
                },
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h',
            },
        );
    }

    /**
     * 주어진 액세스 토큰이 유효한지 검증합니다.
     */
    static isValidAccessToken(accessToken) {
        try {
            jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 현재 시각으로부터 14일동안 유효한 리프레시 토큰을 생성합니다.
     */
    static buildRefreshToken(payload) {
        return jwt.sign(
            {
                user: {
                    id: payload.userId,
                },
            },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            {
                expiresIn: '14d',
            },
        );
    }

    static isValidRefreshToken(refreshToken) {
        try {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 액세스 토큰 또는 리프래시 토큰으로부터 요청자 정보를 추출합니다.
     */
    static getRequesterFromToken(authorizationHeaderValue) {
        const jwtToken = authorizationHeaderValue.split(' ')[1]; // "bearer JWT_TOKEN" 형태로 전달받음

        const jwtPayload = jwt.decode(jwtToken);

        return {
            userId: jwtPayload.user.id,
        };
    }

    static getRequesterFromTokenOrDefault(authorizationHeaderValue) {
        try {
            return this.getRequesterFromToken(authorizationHeaderValue);
        } catch (e) {
            return {
                userId: -1, // GUEST
            };
        }
    }
}

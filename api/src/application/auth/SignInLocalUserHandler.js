import { prismaClient } from '../../infra/prismaClient.js';

import { AuthTokenManager } from '../../infra/AuthTokenManager.js';
import { UserPasswordBuilder } from '../../infra/UserPasswordBuilder.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { User } from '../../domain/User.js';

export class SignInLocalUserHandler {
    static async handle({ email, password }) {
        const userEntity = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const user = new User(userEntity);

        // 패스워드 일치 여부 확인
        if (!user.checkPassword(UserPasswordBuilder.hashPassword(password))) {
            // 보안을 위해 비밀번호가 일치하지 않는 경우에도 USER_NOT_FOUND 에러메시지를 반환합니다.
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        // 액세스 토큰 및 리프레시 토큰 발급
        const accessToken = AuthTokenManager.buildAccessToken({ userId: user.getId() });
        const refreshToken = AuthTokenManager.buildRefreshToken({ userId: user.getId() });
        await prismaClient.refreshToken.create({
            data: {
                userId: user.getId(),
                token: refreshToken,
            },
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.getId(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                image: user.getImage(),
                createdAt: user.getCreatedAt(),
                updatedAt: user.getUpdatedAt(),
            },
        };
    }
}

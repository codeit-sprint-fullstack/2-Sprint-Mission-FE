import { prismaClient } from '../../infra/prismaClient.js';

import { AuthTokenManager } from '../../infra/AuthTokenManager.js';
import { UserPasswordBuilder } from '../../infra/UserPasswordBuilder.js';

import { UnprocessableEntityException } from '../../exceptions/UnprocessableEntityException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { User } from '../../domain/User.js';

export class SignUpLocalUserHandler {
    static async handle({ email, nickname, password, passwordConfirmation }) {
        // 패스워드 및 패스워드 확인 일치 여부 확인
        if (password !== passwordConfirmation) {
            throw new UnprocessableEntityException('Unprocessable Entity', 
                ExceptionMessage.PASSWORD_CONFIRMATION_NOT_MATCH,
            );
        }

        // 이미 존재하는 이메일인지 확인
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.ALREADY_REGISTERED_EMAIL);
        }

        const userEntity = await prismaClient.user.create({
            data: {
                email,
                nickname,
                password: UserPasswordBuilder.hashPassword(password),
            },
        });

        const user = new User(userEntity);

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

import { prismaClient } from '../../infra/prismaClient.js';

import { AuthTokenManager } from '../../infra/AuthTokenManager.js';

import { UnprocessableEntityException } from '../../exceptions/UnprocessableEntityException.js';
import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { User } from '../../domain/User.js';

export class RefreshTokenHandler {
    static async handle({ refreshToken }) {
        if (!AuthTokenManager.isValidRefreshToken(refreshToken)) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.INVALID_REFRESH_TOKEN);
        }

        const requester = AuthTokenManager.getRequesterFromToken(`bearer ${refreshToken}`);

        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const refreshTokenEntity = await prismaClient.refreshToken.findFirst({
            where: {
                userId: requester.userId,
                token: refreshToken,
            },
        });
        if (!refreshTokenEntity) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.INVALID_REFRESH_TOKEN);
        }

        const user = new User(userEntity);

        return {
            accessToken: AuthTokenManager.buildAccessToken({
                userId: user.getId(),
            }),
        };
    }
}

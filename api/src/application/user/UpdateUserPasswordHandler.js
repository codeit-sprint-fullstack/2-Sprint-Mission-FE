import { prismaClient } from '../../infra/prismaClient.js';

import { UserPasswordBuilder } from '../../infra/UserPasswordBuilder.js';

import { UnprocessableEntityException } from '../../exceptions/UnprocessableEntityException.js';
import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { User } from '../../domain/User.js';

export class UpdateUserPasswordHandler {
    static async handle(requester, { password, passwordConfirmation, currentPassword }) {
        // 패스워드와 패스워드 확인이 일치하는지 검증
        if (password !== passwordConfirmation) {
            throw new UnprocessableEntityException('Unprocessable Entity', 
                ExceptionMessage.PASSWORD_CONFIRMATION_NOT_MATCH,
            );
        }

        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const user = new User(userEntity);

        // 현재 패스워드가 일치하는지 검증
        if (!user.checkPassword(UserPasswordBuilder.hashPassword(currentPassword))) {
            throw new UnprocessableEntityException('Unprocessable Entity', ExceptionMessage.CURRENT_PASSWORD_NOT_MATCH);
        }

        // 비밀번호 변경 진행
        const hashedPassword = UserPasswordBuilder.hashPassword(password);
        user.setPassword(hashedPassword);
        await prismaClient.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                password: hashedPassword,
            },
        });

        return {
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

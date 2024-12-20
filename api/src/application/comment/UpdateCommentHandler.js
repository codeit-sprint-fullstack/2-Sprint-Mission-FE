import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ForbiddenException } from '../../exceptions/ForbiddenException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Comment } from '../../domain/Comment.js';
import { User } from '../../domain/User.js';

export class UpdateCommentHandler {
    static async handle(requester, { commentId, content }) {
        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetCommentEntity = await tx.comment.findUnique({
                where: {
                    id: commentId,
                },
            });

            if (!targetCommentEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.COMMENT_NOT_FOUND);
            }

            if (targetCommentEntity.writerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            return await tx.comment.update({
                where: {
                    id: commentId,
                },
                data: {
                    content,
                },
            });
        });

        const comment = new Comment(commentEntity);

        const writerEntity = await prismaClient.user.findUnique({
            where: {
                id: comment.getWriterId(),
            },
        });

        const writer = new User(writerEntity);

        return {
            id: comment.getId(),
            writer: {
                id: writer.getId(),
                nickname: writer.getNickname(),
                image: writer.getImage(),
            },
            articleId: comment.getArticleId(),
            productId: comment.getProductId(),
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        };
    }
}

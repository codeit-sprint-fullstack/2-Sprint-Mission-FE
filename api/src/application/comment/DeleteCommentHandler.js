import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ForbiddenException } from '../../exceptions/ForbiddenException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

export class DeleteCommentHandler {
    static async handle(requester, { commentId }) {
        await prismaClient.$transaction(async (tx) => {
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

            return await tx.comment.delete({
                where: {
                    id: commentId,
                },
            });
        });
    }
}

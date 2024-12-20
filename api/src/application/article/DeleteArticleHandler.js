import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ForbiddenException } from '../../exceptions/ForbiddenException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

export class DeleteArticleHandler {
    static async handle(requester, { articleId }) {
        await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: articleId,
                },
            });

            if (!targetArticleEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
            }

            if (targetArticleEntity.writerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            return await tx.article.delete({
                where: {
                    id: articleId,
                },
            });
        });
    }
}

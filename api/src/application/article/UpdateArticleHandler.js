import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ForbiddenException } from '../../exceptions/ForbiddenException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Article } from '../../domain/Article.js';
import { User } from '../../domain/User.js';

export class UpdateArticleHandler {
    static async handle(requester, { articleId, title, content, image }) {
        /**
         * [게시글 수정 트랜잭션]
         *
         * 1. 게시글을 수정하기 전에 해당 게시글이 존재하는지 확인합니다.
         * 2. 게시글이 존재한다면, 게시글을 수정합니다.
         *
         * update() 하나만 사용해도 결과적으로는 동일합니다.
         */
        const articleEntity = await prismaClient.$transaction(async (tx) => {
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

            return await tx.article.update({
                where: {
                    id: articleId,
                },
                data: {
                    title,
                    content,
                    image,
                },
            });
        });

        const article = new Article(articleEntity);

        const writerEntity = await prismaClient.user.findUnique({
            where: {
                id: article.getWriterId(),
            },
        });

        const writer = new User(writerEntity);

        return {
            id: article.getId(),
            writer: {
                id: writer.getId(),
                nickname: writer.getNickname(),
            },
            title: article.getTitle(),
            content: article.getContent(),
            image: article.getImage(),
            createdAt: article.getCreatedAt(),
        };
    }
}

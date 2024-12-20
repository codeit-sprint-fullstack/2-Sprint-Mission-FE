import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Comment } from '../../domain/Comment.js';
import { User } from '../../domain/User.js';

export class CreateArticleCommentHandler {
    static async handle(requester, { articleId, content }) {
        /**
         * [게시글 댓글 등록 트랜잭션]
         *
         * 1. 게시글이 존재하는지 확인합니다.
         * 2. 게시글이 존재한다면, 댓글을 등록합니다.
         */
        const commentEntity = await prismaClient.$transaction(async (tx) => {
            const targetArticleEntity = await tx.article.findUnique({
                where: {
                    id: articleId,
                },
            });

            if (!targetArticleEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.ARTICLE_NOT_FOUND);
            }

            return await tx.comment.create({
                data: {
                    articleId,
                    writerId: requester.userId,
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
            content: comment.getContent(),
            createdAt: comment.getCreatedAt(),
        };
    }
}

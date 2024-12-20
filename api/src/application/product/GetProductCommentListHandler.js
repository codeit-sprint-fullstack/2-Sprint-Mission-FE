import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Comment } from '../../domain/Comment.js';
import { User } from '../../domain/User.js';

export class GetProductCommentListHandler {
    static async handle({ productId, cursor, limit }) {
        const commentEntities = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
            }

            return await tx.comment.findMany({
                cursor: cursor
                    ? {
                        id: cursor,
                    }
                    : undefined,
                take: limit + 1,
                where: {
                    productId: Number(productId),
                },
            });
        });

        const comments = commentEntities.map((commentEntity) => new Comment(commentEntity));

        const writerEntities = await prismaClient.user.findMany({
            where: {
                id: {
                    in: Array.from(new Set(comments.map((comment) => comment.getWriterId()))),
                },
            },
        });

        const writers = writerEntities.map((writerEntity) => new User(writerEntity));
        const hasNext = comments.length === limit + 1;

        return {
            list: comments.slice(0, limit).map((comment) => {
                const writer = writers.find((writer) => writer.getId() === comment.getWriterId());

                return {
                    id: comment.getId(),
                    writer: {
                        id: writer.getId(),
                        nickname: writer.getNickname(),
                        image: writer.getImage(),
                    },
                    productId: comment.getProductId(),
                    content: comment.getContent(),
                    createdAt: comment.getCreatedAt(),
                    updatedAt: comment.getUpdatedAt(),
                };
            }),
            nextCursor: hasNext ? comments[comments.length - 1].getId() : null,
        };
    }
}

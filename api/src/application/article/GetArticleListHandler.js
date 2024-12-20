import { prismaClient } from '../../infra/prismaClient.js';

import { Article } from '../../domain/Article.js';
import { User } from '../../domain/User.js';
import { Like } from '../../domain/Like.js';

export class GetArticleListHandler {
    static async handle(requester, { cursor, limit, orderBy, keyword }) {
        const orderByOption = (() => {
            switch (orderBy) {
                case 'favorite':
                    return {
                        likes: {
                            _count: 'desc', // 좋아요 많은 순으로 정렬
                        },
                    };
                case 'recent':
                default:
                    return { createdAt: 'desc' };
            }
        })();

        const articleEntities = await prismaClient.article.findMany({
            cursor: cursor
                ? {
                    id: cursor,
                }
                : undefined,
            take: limit + 1,
            orderBy: orderByOption,
            where: {
                title: keyword ? { contains: keyword } : undefined,
            },
        });

        const articles = articleEntities.map(
            (articleEntity) => new Article(articleEntity)
        );

        const writerEntities = await prismaClient.user.findMany({
            where: {
                id: {
                    in: Array.from(
                        new Set(articles.map((article) => article.getWriterId()))
                    ),
                },
            },
        });

        const writers = writerEntities.map(
            (writerEntity) => new User(writerEntity)
        );

        const likeEntities = await prismaClient.like.findMany({
            where: {
                userId: requester.userId,
                articleId: {
                    in: Array.from(new Set(articles.map((article) => article.getId()))),
                },
            },
        });

        const likes = likeEntities.map((likeEntity) => new Like(likeEntity));

        const hasNext = articles.length === limit + 1;

        return {
            list: articles.slice(0, limit).map((article) => {
                const writer = writers.find(
                    (writer) => writer.getId() === article.getWriterId()
                );
                const like = likes.find(
                    (like) => like.getArticleId() === article.getId()
                );

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
                    isFavorite: !!like,
                };
            }),
            nextCursor: hasNext ? articles[articles.length - 1].getId() : null,
        };
    }
}

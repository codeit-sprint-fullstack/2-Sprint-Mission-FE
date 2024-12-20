import { prismaClient } from '../../infra/prismaClient.js';

import { Article } from '../../domain/Article.js';
import { User } from '../../domain/User.js';

export class CreateArticleHandler {
    static async handle(requester, { title, content, image }) {
        const articleEntity = await prismaClient.article.create({
            data: {
                writerId: requester.userId,
                title,
                content,
                image,
            },
        });

        /**
         * [클래스 객체로 변환]
         *
         * articleEntity 는 Article 클래스의 인스턴스가 아니므로,
         * Article 클래스에 정의된 메서드를 사용할 수 없습니다.
         */
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
                image: writer.getImage(),
            },
            title: article.getTitle(),
            content: article.getContent(),
            image: article.getImage(),
            createdAt: article.getCreatedAt(),
            updatedAt: article.getUpdatedAt(),
        };
    }
}

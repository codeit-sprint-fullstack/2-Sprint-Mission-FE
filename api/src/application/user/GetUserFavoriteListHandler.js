import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Product } from '../../domain/Product.js';

export class GetUserFavoriteListHandler {
    static async handle(requester, { page, pageSize, keyword }) {
        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });

        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const favoriteProductCount = await prismaClient.product.count({
            where: {
                Like: {
                    some: {
                        userId: requester.userId,
                    },
                },
                name: {
                    contains: keyword,
                },
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const favoriteProductsEntities = await prismaClient.product.findMany({
            where: {
                Like: {
                    some: {
                        userId: requester.userId,
                    },
                },
                name: {
                    contains: keyword,
                },
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const favoriteProducts = favoriteProductsEntities.map(
            (favoriteProductEntity) => new Product(favoriteProductEntity),
        );

        return {
            totalCount: favoriteProductCount,
            list: favoriteProducts.map((product) => ({
                id: product.getId(),
                ownerId: product.getOwnerId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                createdAt: product.getCreatedAt(),
            })),
        };
    }
}

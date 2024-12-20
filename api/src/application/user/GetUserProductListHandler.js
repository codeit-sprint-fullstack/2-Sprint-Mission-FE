import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Product } from '../../domain/Product.js';

export class GetUserProductListHandler {
    static async handle(requester, { page, pageSize, keyword }) {
        const userEntity = await prismaClient.user.findUnique({
            where: {
                id: requester.userId,
            },
        });
        if (!userEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.USER_NOT_FOUND);
        }

        const productCount = await prismaClient.product.count({
            where: {
                ownerId: requester.userId,
                name: {
                    contains: keyword,
                },
            },
        });

        const productEntities = await prismaClient.product.findMany({
            where: {
                ownerId: requester.userId,
                name: {
                    contains: keyword,
                },
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const products = productEntities.map((productEntity) => new Product(productEntity));

        return {
            totalCount: productCount,
            list: products.map((product) => ({
                id: product.getId(),
                ownerId: product.getOwnerId(),
                name: product.getName(),
                description: product.getDescription(),
                price: product.getPrice(),
                tags: product.getTags(),
                images: product.getImages(),
                createdAt: product.getCreatedAt(),
                updatedAt: product.getUpdatedAt(),
            })),
        };
    }
}

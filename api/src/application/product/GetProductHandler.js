import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Product } from '../../domain/Product.js';

export class GetProductHandler {
    static async handle(requester, { productId }) {
        const productEntity = await prismaClient.product.findUnique({
            where: {
                id: Number(productId),
            },
            include: {
                likes: {
                    select: {
                        // 좋아요의 id, userId만 필요함
                        id: true,
                        userId: true,
                    },
                },
            },
        });

        if (!productEntity) {
            throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
        }

        const product = new Product(productEntity);

        return {
            id: product.getId(),
            ownerId: product.getOwnerId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            tags: product.getTags(),
            images: product.getImages(),
            createdAt: product.getCreatedAt(),
            favoriteCount: product.getFavoriteCount(),
            isFavorite: product.getIsFavorite(requester.userId),
        };
    }
}

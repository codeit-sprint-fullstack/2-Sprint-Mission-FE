import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Product } from '../../domain/Product.js';

export class DeleteProductLikeHandler {
    static async handle(requester, { productId }) {
        const productEntity = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!targetProductEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
            }

            const likeEntity = await tx.like.findUnique({
                where: {
                    userId_productId: {
                        userId: requester.userId,
                        productId,
                    },
                },
            });

            if (likeEntity) {
                await tx.like.delete({
                    where: {
                        userId_productId: {
                            userId: requester.userId,
                            productId,
                        },
                    },
                });
            }

            return targetProductEntity;
        });

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
            isFavorite: false,
        };
    }
}

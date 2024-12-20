import { prismaClient } from '../../infra/prismaClient.js';

import { NotFoundException } from '../../exceptions/NotFoundException.js';
import { ForbiddenException } from '../../exceptions/ForbiddenException.js';
import { ExceptionMessage } from '../../constant/ExceptionMessage.js';

import { Product } from '../../domain/Product.js';

export class UpdateProductHandler {
    static async handle(requester, { productId, name, description, price, tags, images }) {
        const productEntity = await prismaClient.$transaction(async (tx) => {
            const targetProductEntity = await tx.product.findUnique({
                where: {
                    id: Number(productId),
                },
            });

            if (!targetProductEntity) {
                throw new NotFoundException('Not Found', ExceptionMessage.PRODUCT_NOT_FOUND);
            }

            if (targetProductEntity.ownerId !== requester.userId) {
                throw new ForbiddenException('Forbidden', ExceptionMessage.FORBIDDEN);
            }

            return await tx.product.update({
                where: {
                    id: Number(productId),
                },
                data: {
                    name,
                    description,
                    price,
                    tags,
                    images,
                },
            });
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
        };
    }
}

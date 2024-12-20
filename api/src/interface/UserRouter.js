import express from 'express';
import { create } from 'superstruct';

import { AuthTokenManager } from '../infra/AuthTokenManager.js';

import { asyncErrorHandler } from './utils/asyncErrorHandler.js';
import { AuthN } from './utils/AuthN.js';

import { UpdateProfileRequestStruct } from './structs/user/UpdateProfileRequestStruct.js';
import { UpdatePasswordRequestStruct } from './structs/user/UpdatePasswordRequestStruct.js';
import { GetMyProductListRequestStruct } from './structs/user/GetMyProductListRequestStruct.js';
import { GetMyFavoritesProductListRequestStruct } from './structs/user/GetMyFavoritesProductListRequestStruct.js';
import { GetUserProfileHandler } from '../application/user/GetUserProfileHandler.js';
import { UpdateUserProfileHandler } from '../application/user/UpdateUserProfileHandler.js';
import { UpdateUserPasswordHandler } from '../application/user/UpdateUserPasswordHandler.js';
import { GetUserProductListHandler } from '../application/user/GetUserProductListHandler.js';
import { GetUserFavoriteListHandler } from '../application/user/GetUserFavoriteListHandler.js';

export const UserRouter = express.Router();

// 내 정보 조회하기 api
UserRouter.get(
    '/me',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const userView = await GetUserProfileHandler.handle(requester);

        return res.send(userView);
    }),
);

// 내 정보 수정하기 api
UserRouter.patch(
    '/me',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { image } = create(req.body, UpdateProfileRequestStruct);

        const userView = await UpdateUserProfileHandler.handle(requester, {
            image,
        });

        return res.send(userView);
    }),
);

// 내 패스워드 수정하기 api
UserRouter.patch(
    '/me/password',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { password, passwordConfirmation, currentPassword } = create(
            req.body,
            UpdatePasswordRequestStruct,
        );

        const userView = await UpdateUserPasswordHandler.handle(requester, {
            password,
            passwordConfirmation,
            currentPassword,
        });

        return res.send(userView);
    }),
);

// 내가 등록한 상품 조회하기 api
UserRouter.get(
    '/me/products',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { page, pageSize, keyword } = create(req.query, GetMyProductListRequestStruct);

        const productListView = await GetUserProductListHandler.handle(requester, {
            page,
            pageSize,
            keyword,
        });

        return res.send(productListView);
    }),
);

// 내가 좋아요한 상품 조회하기 api
UserRouter.get(
    '/me/favorites',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { page, pageSize, keyword } = create(
            req.query,
            GetMyFavoritesProductListRequestStruct,
        );

        const favoriteListView = await GetUserFavoriteListHandler.handle(requester, {
            page,
            pageSize,
            keyword,
        });

        return res.send(favoriteListView);
    }),
);

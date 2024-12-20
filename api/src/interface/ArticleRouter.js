import express from 'express';
import { create } from 'superstruct';
import { AuthN } from './utils/AuthN.js';

import { AuthTokenManager } from '../infra/AuthTokenManager.js';

import { asyncErrorHandler } from './utils/asyncErrorHandler.js';
import { CreateArticleRequestStruct } from './structs/article/CreateArticleRequestStruct.js';
import { UpdateArticleRequestStruct } from './structs/article/UpdateArticleRequestStruct.js';
import { GetArticleListRequestStruct } from './structs/article/GetArticleListRequestStruct.js';
import { CreateCommentRequestStruct } from './structs/comment/CreateCommentRequestStruct.js';
import { GetCommentListRequestStruct } from './structs/comment/GetCommentListRequestStruct.js';

import { CreateArticleHandler } from '../application/article/CreateArticleHandler.js';
import { GetArticleHandler } from '../application/article/GetArticleHandler.js';
import { UpdateArticleHandler } from '../application/article/UpdateArticleHandler.js';
import { DeleteArticleHandler } from '../application/article/DeleteArticleHandler.js';
import { GetArticleListHandler } from '../application/article/GetArticleListHandler.js';
import { CreateArticleCommentHandler } from '../application/article/CreateArticleCommentHandler.js';
import { GetArticleCommentListHandler } from '../application/article/GetArticleCommentListHandler.js';
import { CreateArticleLikeHandler } from '../application/article/CreateArticleLikeHandler.js';
import { DeleteArticleLikeHandler } from '../application/article/DeleteArticleLikeHandler.js';

export const ArticleRouter = express.Router();

// 게시글 등록 api
ArticleRouter.post(
    '/',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        /**
         * [API 요청 유효성 검사]
         *
         * assert 메서드는 유효성 검사만 시도하는데 비해,
         * create 메서드는 데이터를 전처리하고, 유효성 검사를 같이 시도합니다.
         *
         * 전처리를 하는 이유는 아래와 같이 다양합니다.
         * - 기본값을 설정하기 위해              @see GetArticleListRequestStruct
         * - 데이터를 변환하기 위해
         *     1. 문자열 앞뒤에 있는 공백 제거    @see CreateArticleRequestStruct
         *     2. 문자열로 이루어진 숫자 -> 숫자  @see GetArticleListRequestStruct
         *     ...
         */
        const { title, content, image } = create(req.body, CreateArticleRequestStruct);

        const articleView = await CreateArticleHandler.handle(requester, {
            title,
            content,
            image,
        });

        return res.status(201).send(articleView);
    }),
);

// 게시글 조회 api
ArticleRouter.get(
    '/:articleId',
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromTokenOrDefault(
            req.headers.authorization,
        );

        const articleId = Number(req.params.articleId);

        const articleView = await GetArticleHandler.handle(requester, {
            articleId,
        });

        return res.status(201).send(articleView);
    }),
);

// 게시글 수정 api
ArticleRouter.patch(
    '/:articleId',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { articleId } = req.params;
        const { title, content, image } = create(req.body, UpdateArticleRequestStruct);

        const articleView = await UpdateArticleHandler.handle(requester, {
            articleId: Number(articleId),
            title,
            content,
            image,
        });

        return res.status(201).send(articleView);
    }),
);

// 게시글 삭제 api
ArticleRouter.delete(
    '/:articleId',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { articleId } = req.params;

        await DeleteArticleHandler.handle(requester, {
            articleId: Number(articleId),
        });

        return res.status(204).send();
    }),
);

// 게시글 목록 조회 api
ArticleRouter.get(
    '/',
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromTokenOrDefault(
            req.headers.authorization,
        );

        const { cursor, limit, orderBy, keyword } = create(req.query, GetArticleListRequestStruct);

        const articleListView = await GetArticleListHandler.handle(requester, {
            cursor,
            limit,
            orderBy,
            keyword,
        });

        return res.send(articleListView);
    }),
);

// 게시글 댓글 등록 api
ArticleRouter.post(
    '/:articleId/comments',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { articleId } = req.params;
        const { content } = create(req.body, CreateCommentRequestStruct);

        const articleCommentView = await CreateArticleCommentHandler.handle(requester, {
            articleId: Number(articleId),
            content,
        });

        return res.status(201).send(articleCommentView);
    }),
);

// 게시글 댓글 목록 조회 api
ArticleRouter.get(
    '/:articleId/comments',
    asyncErrorHandler(async (req, res) => {
        const { articleId } = req.params;
        const { cursor, limit } = create(req.query, GetCommentListRequestStruct);

        const articleCommentListView = await GetArticleCommentListHandler.handle({
            articleId: Number(articleId),
            cursor,
            limit,
        });

        return res.send(articleCommentListView);
    }),
);

// 게시글 좋아요 API
ArticleRouter.post(
    '/:articleId/like',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const articleId = Number(req.params.articleId);

        const articleView = await CreateArticleLikeHandler.handle(requester, {
            articleId,
        });

        return res.status(201).send(articleView);
    }),
);

// 게시글 좋아요 취소 API
ArticleRouter.delete(
    '/:articleId/like',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const articleId = Number(req.params.articleId);

        const articleView = await DeleteArticleLikeHandler.handle(requester, {
            articleId,
        });

        return res.status(201).send(articleView);
    }),
);

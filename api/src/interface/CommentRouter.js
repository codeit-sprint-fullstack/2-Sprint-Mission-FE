import express from 'express';
import { create } from 'superstruct';

import { AuthTokenManager } from '../infra/AuthTokenManager.js';

import { asyncErrorHandler } from './utils/asyncErrorHandler.js';
import { AuthN } from './utils/AuthN.js';

import { UpdateCommentRequestStruct } from './structs/comment/UpdateCommentRequestStruct.js';

import { UpdateCommentHandler } from '../application/comment/UpdateCommentHandler.js';
import { DeleteCommentHandler } from '../application/comment/DeleteCommentHandler.js';

export const CommentRouter = express.Router();

// 댓글 수정 api
CommentRouter.patch(
    '/:commentId',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { commentId } = req.params;
        const { content } = create(req.body, UpdateCommentRequestStruct);

        const commentView = await UpdateCommentHandler.handle(requester, {
            commentId: Number(commentId),
            content,
        });

        return res.send(commentView);
    }),
);

// 댓글 삭제 api
CommentRouter.delete(
    '/:commentId',
    AuthN(),
    asyncErrorHandler(async (req, res) => {
        const requester = AuthTokenManager.getRequesterFromToken(req.headers.authorization);

        const { commentId } = req.params;

        await DeleteCommentHandler.handle(requester, {
            commentId: Number(commentId),
        });

        return res.status(204).send();
    }),
);

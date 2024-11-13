/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DropdownMenu from '@components/DropdownMenu';
import Input from '@components/Input';
import { useDropdownItem } from '@contexts/DropdownProvider';
import useOwnMutation from '@hooks/useOwnMutation';
import { deleteComment, patchComment } from '@utils/api';
import c from '@utils/constants';
import { toDateString } from '@utils/utils';
import DeleteModal from './DeleteModal';

const style = {
  comment: css`
    min-height: 10rem;
    background-color: #fcfcfc;
    border-bottom: 1px solid var(--gray-200);

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 1.4rem;
        line-height: 2.4rem;
        font-weight: 400;
        color: var(--gray-800);
      }
    }

    .info {
      margin-top: 2.4rem;
      display: flex;

      > div {
        display: inline-block;
        margin-left: 0.8rem;

        > span {
          display: block;
          font-size: 1.2rem;
          line-height: 1.8rem;
          font-weight: 400;

          &.nickname {
            color: var(--gray-600);
          }

          &.time {
            margin-top: 0.4rem;
            color: var(--gray-400);
          }
        }
      }
    }
  `,
  editButton: css`
    display: block;
    margin-left: auto;

    padding: 1.2rem 2.3rem;
    border-radius: 8px;

    color: var(--gray-100);
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 600;
  `,
};

export default function Comment({ item, parentId, ModifyButton }) {
  const nickname = item.owner ? item.owner.nickname : item.writer.nickname;
  const router = useRouter();
  const { item: modify, setItem: setModify } = useDropdownItem();
  const [commentObj, setCommentObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'comment', type: 'text', value: item.content });

  const patchCommentMutation = useOwnMutation({
    mutationFn: data => patchComment(item.id, data),
    invalidQueryKey: ['comments', parentId],
    onSuccess: _ => setModify(null),
  });
  const deleteCommentMutation = useOwnMutation({
    mutationFn: _ => deleteComment(item.id),
    invalidQueryKey: ['comments', parentId],
    onSuccess: _ => setModify(null),
  });

  const handleSubmitComment = async () => {
    const data = { content: commentObj.value?.trim?.() };
    patchCommentMutation.mutate(data);
  };
  const handleDeleteComment = async () => {
    deleteCommentMutation.mutate();
  };

  return (
    <div className="comment" css={style.comment}>
      {modify !== c.MODIFY.EDIT && (
        <div className="content">
          <p>{item.content}</p>
          <DropdownMenu DropdownButton={ModifyButton} list={c.MODIFY} dictionary={c.MODIFY_MSG} onClick={setModify} />
        </div>
      )}
      {modify === c.MODIFY.EDIT && (
        <form id="commentsForm">
          <Input inputObj={commentObj} placeholder={'댓글을 입력해주세요.'} onChange={setCommentObj} textarea comment />
          <button type="button" className="button" disabled={!commentObj.value?.trim?.()} onClick={handleSubmitComment}>
            등록
          </button>
        </form>
      )}
      <DeleteModal
        isOpen={modify === c.MODIFY.DELETE}
        onConfirmClick={handleDeleteComment}
        onCancelClick={() => setModify(null)}
      />

      <div className="info">
        <img src="/Image/ic_profile.png" alt="profile Image" width={32} height={32} />
        <div>
          <span className="nickname">{nickname}</span>
          <span className="time">{toDateString(item?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

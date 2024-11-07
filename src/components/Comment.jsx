/** @jsxImportSource @emotion/react */
import DropdownMenu from '@components/DropdownMenu';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { useDropdownItem } from '@contexts/DropdownProvider';
import { css } from '@emotion/react';
import useAsync from '@hooks/useAsync';
import { deleteComment, patchComment } from '@utils/api';
import c from '@utils/constants';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

export default function Comment({ item, ModifyButton }) {
  const createdDate = new Date(item.createdAt);
  const router = useRouter();
  const patchCommentAsync = useAsync(patchComment);
  const deleteCommentAsync = useAsync(deleteComment);
  const { item: modify, setItem: setModify } = useDropdownItem();
  const [commentObj, setCommentObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'comment', type: 'text', value: item.content });

  const handleCommentChange = value => (value ? setCommentObj(old => ({ ...old, value })) : null);

  const handleSubmitComment = async () => {
    const data = { content: commentObj.value };
    const result = await patchCommentAsync(item.id, data);
    if (!result) return null;

    router.reload();
  };
  const handleDeleteComment = async () => {
    const result = await deleteCommentAsync(item.id);
    if (!result) return null;

    router.reload();
  };

  return (
    <div className="comment" css={style.comment}>
      {!modify && (
        <div className="content">
          <p>{item.content}</p>
          <DropdownMenu DropdownButton={ModifyButton} list={c.MODIFY} dictionary={c.MODIFY_MSG} onClick={setModify} />
        </div>
      )}
      {modify === c.MODIFY.EDIT && (
        <form id="commentsForm">
          <Input inputObj={commentObj} placeholder={'댓글을 입력해주세요.'} onChange={handleCommentChange} textarea comment />
          <button type="button" className="button" disabled={!commentObj.value} onClick={handleSubmitComment}>
            등록
          </button>
        </form>
      )}
      {modify === c.MODIFY.DELETE && (
        <Modal
          buttons={[
            { Msg: '확인', onClick: handleDeleteComment },
            { Msg: '취소', onClick: () => router.reload() },
          ]}
        >
          asdf
        </Modal>
      )}

      <div className="info">
        <img src="/Image/ic_profile.png" alt="profile Image" width={32} height={32} />
        <div>
          <span className="nickname">{item.owner?.nickname}</span>
          <span className="time">{`${createdDate.getFullYear()}. ${createdDate.getMonth()}. ${createdDate.getDate()}`}</span>
        </div>
      </div>
    </div>
  );
}

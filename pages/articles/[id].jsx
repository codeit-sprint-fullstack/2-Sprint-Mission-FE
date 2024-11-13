/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Comment from '@components/Comment';
import DeleteModal from '@components/DeleteModal';
import DropdownMenu from '@components/DropdownMenu';
import Input from '@components/Input';
import DropdownProvider, { useDropdown } from '@contexts/DropdownProvider';
import useOwnMutation from '@hooks/useOwnMutation';
import useOwnQuery from '@hooks/useOwnQuery';
import { deleteArticle, getArticleById, getCommentsOfArticle, postCommentOfArticle } from '@utils/api';
import c from '@utils/constants';
import { toDateString } from '@utils/utils';

const style = {
  articleDetailPage: css`
    padding-top: 3.4rem;
  `,
  article: css`
    #articleHeader {
      border-bottom: 1px solid var(--gray-200);
    }

    #title {
      display: flex;
      justify-content: space-between;

      h1 {
        font-size: 2rem;
        line-height: 3.2rem;
        font-weight: 700;
        color: var(--gray-800);
      }
    }

    #info {
      margin-top: 1.6rem;
      margin-bottom: 1.6rem;
      display: inline-flex;
      gap: 3.2rem;

      > div {
        display: flex;
        align-items: center;

        .nickname {
          margin-left: 1.6rem;
          margin-right: 0.8rem;

          font-size: 1.4rem;
          line-height: 2.4rem;
          font-weight: 500;
          color: var(--gray-600);
        }

        .date {
          font-size: 1.4rem;
          line-height: 2.4rem;
          font-weight: 400;
          color: var(--gray-400);
        }
      }

      hr {
        border-color: var(--gray-200);
      }

      button {
        padding: 0.4rem 1.2rem;
        border: 1px solid var(--gray-200);
        border-radius: 35px;
        display: flex;
        align-items: center;

        span {
          font-size: 1.6rem;
          line-height: 2.6rem;
          font-weight: 500;
          color: var(--gray-500);

          margin-left: 0.4rem;
        }
      }
    }

    #articleContent {
      margin-top: 2.4rem;

      p {
        font-size: 1.8rem;
        line-height: 2.6rem;
        font-weight: 400;
        color: var(--gray-800);
      }
    }
  `,
  comments: css`
    margin-top: 3.2rem;

    #commentsForm {
      button {
        display: block;
        margin-left: auto;

        padding: 1.2rem 2.3rem;
        border-radius: 8px;

        color: var(--gray-100);
        font-size: 1.6rem;
        line-height: 2.6rem;
        font-weight: 600;
      }
    }

    #commentsList {
      margin-top: 4rem;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      #noComment {
        margin: 0 auto;
      }
    }
  `,
  returnButton: css`
    margin-top: 6.4rem;
    margin-bottom: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 1.2rem 6.4rem;
      border-radius: 40px;

      font-size: 1.8rem;
      line-height: 2.6rem;
      font-weight: 600;

      img {
        margin-left: 0.8rem;
      }
    }
  `,
};

function ModifyButton() {
  const { dropdownOpen, setDropdownOpen } = useDropdown();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="modify-button" onClick={toggleDropdown}>
      <Image src="/Image/ic_kebab.png" alt="kebab button" width={24} height={24} />
    </div>
  );
}

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [commentObj, setCommentObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'comment', type: 'text' });
  const [cursor, setCursor] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const articleData = useOwnQuery({
    queryFn: () => getArticleById(id),
    queryKey: ['article', id],
    onSuccess: result => setArticle(result),
    enabled: !!id,
  });
  const commentsData = useOwnQuery({
    queryFn: () => getCommentsOfArticle(id, { limit: 5 }),
    queryKey: ['comments', id],
    onSuccess: result => {
      setComments(result.list);
      setCursor(result.nextCursor);
    },
    enabled: !!id,
  });
  const postCommentMutation = useOwnMutation({
    mutationFn: data => postCommentOfArticle(id, data),
    invalidQueryKey: ['comments', id],
  });
  const deleteArticleMutation = useOwnMutation({
    mutationFn: _ => deleteArticle(id),
    onSuccess: () => router.push('/articles'),
  });

  const handleDropdownClick = modify => {
    switch (modify) {
      case c.MODIFY.EDIT:
        router.push(`/articles/post/${id}`);
        break;
      case c.MODIFY.DELETE:
        setDeleteModalOpen(true);
    }
  };
  const handleSubmitComment = async () => {
    const data = { content: commentObj.value, ownerId: '186dc25d-3079-47d4-a7ed-3dd6e4e7f146' };
    postCommentMutation.mutate(data);
  };
  const handleDeleteArticle = async () => {
    deleteArticleMutation.mutate();
  };

  return (
    <div id="articleDetailPage" css={style.articleDetailPage}>
      <DeleteModal
        isOpen={deleteModalOpen}
        onConfirmClick={handleDeleteArticle}
        onCancelClick={() => setDeleteModalOpen(false)}
      />
      <div id="article" css={style.article}>
        <div id="articleHeader">
          <div id="title">
            <h1>{article.title}</h1>
            <DropdownProvider>
              <DropdownMenu
                DropdownButton={<ModifyButton />}
                list={c.MODIFY}
                dictionary={c.MODIFY_MSG}
                onClick={handleDropdownClick}
              />
            </DropdownProvider>
          </div>

          <div id="info">
            <div>
              <Image src="/Image/ic_profile.png" alt="profile image" width={40} height={40} />
              <span className="nickname">{article.owner?.nickname}</span>
              <span className="date">{toDateString(article?.createdAt)}</span>
            </div>

            <hr />

            <button type="button">
              <img src="/Image/ic_heart.png" alt="heart" width={32} height={32} />
              <span>{article.likeCount}</span>
            </button>
          </div>
        </div>

        <div id="articleContent">
          <p>{article.content}</p>
        </div>
      </div>

      <div id="comments" css={style.comments}>
        <form id="commentsForm">
          <Input
            inputObj={commentObj}
            label={'댓글달기'}
            placeholder={'댓글을 입력해주세요.'}
            onChange={setCommentObj}
            textarea
            comment
          />
          <button type="button" className="button" disabled={!commentObj.value?.trim()} onClick={handleSubmitComment}>
            등록
          </button>
        </form>

        <div id="commentsList">
          {comments.length === 0 && (
            <Image id="noComment" src="/Image/img_no_comments.png" alt="no comment Image" width={151} height={208} />
          )}
          {comments.map(comment => (
            <DropdownProvider key={comment.id}>
              <Comment item={comment} parentId={id} ModifyButton={<ModifyButton />} key={comment.id} />
            </DropdownProvider>
          ))}
        </div>
      </div>

      <div id="returnButton" css={style.returnButton}>
        <Link href="/articles">
          <button type="button" className="button">
            목록으로 돌아가기
            <Image src="/Image/ic_back.png" alt="return Image" width={24} height={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}

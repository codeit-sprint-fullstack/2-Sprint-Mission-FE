/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Input from '@components/Input';
import useAsync from '@hooks/useAsync';
import useOwnMutation from '@hooks/useOwnMutation';
import useOwnQuery from '@hooks/useOwnQuery';
import { getArticleById, patchArticle, postArticle } from '@utils/api';
import c from '@utils/constants';

const style = {
  articlePost: css`
    padding-top: 2.4rem;

    .title {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 2rem;
        line-height: 3.2rem;
        font-weight: 700;
        color: var(--gray-800);
      }

      button {
        padding: 1.2rem 2.3rem;
        border-radius: 8px;

        font-size: 1.6rem;
        line-height: 2.6rem;
        font-weight: 600;
        color: var(--gray-100);
      }
    }

    form {
      margin-top: 3.2rem;

      > div {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;

        label {
          font-size: 1.8rem;
          line-height: 2.6rem;
          font-weight: 700;
          color: var(--gray-800);
        }
      }
    }
  `,
};

export default function ArticlePost({ articleId }) {
  const router = useRouter();
  const postArticleAsync = useAsync(postArticle);
  const patchArticleAsync = useAsync(patchArticle);
  const [titleObj, setTitleObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'title', type: 'text' });
  const [contentObj, setContentObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'content', type: 'text' });
  const [canSubmit, setCanSubmit] = useState(false);

  const getArticleByIdQuery = useOwnQuery({
    queryFn: _ => getArticleById(articleId),
    queryKey: ['article', articleId],
    onSuccess: result => {
      setTitleObj(old => ({ ...old, value: result.title }));
      setContentObj(old => ({ ...old, value: result.content }));
    },
  });
  const postArticleMutation = useOwnMutation({
    mutationFn: data => postArticle(data),
    onSuccess: result => router.push(`/articles/${result.id}`),
  });
  const patchArticleMutation = useOwnMutation({
    mutationFn: data => patchArticle(articleId, data),
    invalidQueryKey: ['article', articleId],
    onSuccess: result => router.push(`/articles/${result.id}`),
  });

  const handleSubmit = async () => {
    const data = {
      title: titleObj.value?.trim?.(),
      content: contentObj.value?.trim?.(),
      ownerId: '186dc25d-3079-47d4-a7ed-3dd6e4e7f146',
    };
    if (articleId) {
      delete data.createdAt;
      delete data.updatedAt;
      delete data.ownerId;
    }
    articleId ? patchArticleMutation.mutate(data) : postArticleMutation.mutate(data);
  };

  useEffect(() => {
    if (titleObj.value?.trim?.() && contentObj.value?.trim?.()) return setCanSubmit(true);

    return setCanSubmit(false);
  }, [titleObj, contentObj]);

  return (
    <div id="articlePost" css={style.articlePost}>
      <div className="title">
        <span>게시글 쓰기</span>
        <button type="button" className="button" onClick={handleSubmit} disabled={!canSubmit}>
          등록
        </button>
      </div>
      <form>
        <Input inputObj={titleObj} label={'*제목'} placeholder={'제목을 입력해주세요'} onChange={setTitleObj} />
        <Input inputObj={contentObj} label={'*내용'} placeholder={'내용을 입력해주세요'} onChange={setContentObj} textarea />
      </form>
    </div>
  );
}

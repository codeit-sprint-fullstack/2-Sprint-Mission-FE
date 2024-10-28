/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import c from '@/src/utils/constants';
import { useEffect, useState } from 'react';
import Input from '@/src/components/Input';
import { useRouter } from 'next/router';
import useAsync from '@/src/hooks/useAsync';
import { getArticleById, patchArticle, postArticle } from '@/src/utils/api';

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
  const getArticleByIdAsync = useAsync(getArticleById);
  const postArticleAsync = useAsync(postArticle);
  const patchArticleAsync = useAsync(patchArticle);
  const [titleObj, setTitleObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'title', type: 'text' });
  const [contentObj, setContentObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'content', type: 'text' });
  const [canSubmit, setCanSubmit] = useState(false);

  const handleBlur = inputObj => {
    const { value, name } = inputObj;

    let setInputObj = null;
    switch (name) {
      case 'title':
        setInputObj = setTitleObj;
        break;
      case 'content':
        setInputObj = setContentObj;
        break;
    }
    setInputObj(prev => {
      return { ...prev, value };
    });
  };
  const handleSubmit = async () => {
    const data = { title: titleObj.value, content: contentObj.value, ownerId: '186dc25d-3079-47d4-a7ed-3dd6e4e7f146' };
    if (articleId) {
      delete data.createdAt;
      delete data.updatedAt;
      delete data.ownerId;
    }
    const result = articleId ? await patchArticleAsync(articleId, data) : await postArticleAsync(data);

    if (!result) return null;

    router.push(`/articles/${result.id}`);
  };

  useEffect(() => {
    async function getArticle() {
      const article = await getArticleByIdAsync(articleId);
      if (!article) return null;

      setTitleObj(old => {
        return { ...old, value: article.title };
      });
      setContentObj(old => {
        return { ...old, value: article.content };
      });
    }
    if (articleId) getArticle();
  }, [articleId]);
  useEffect(() => {
    if (titleObj.value && contentObj.value) return setCanSubmit(true);

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
        <Input inputObj={titleObj} label={'*제목'} placeholder={'제목을 입력해주세요'} onBlur={handleBlur} />
        <Input inputObj={contentObj} label={'*내용'} placeholder={'내용을 입력해주세요'} onBlur={handleBlur} textarea />
      </form>
    </div>
  );
}

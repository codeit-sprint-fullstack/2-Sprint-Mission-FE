import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '@/src/styles/create-post.module.css';
import Header from '@/src/components/Header.js';
import Button from '@/src/components/Button.js';
import CreateEditPost from '@/src/components/CreateEditPost.js';
import { postArticle } from '@/src/api/articleServices';

export default function CreatePost() {
  const router = useRouter();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function createArticle() {
    const data = { title, content };

    if (!title || !content) return;
    const res = await postArticle(data);
    const articleId = res.id;
    router.push(`/free-board/${articleId}`);
  }

  useEffect(() => {
    setIsButtonActive(!!title && !!content);
  }, [title, content]);

  const handleData = (inputType, data) => {
    if (inputType === 'postTitle') {
      setTitle(data);
    } else if (inputType === 'content') {
      setContent(data);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.headerAndButton}>
        <Header>게시글 쓰기</Header>
        <Button status={isButtonActive} onClick={createArticle}>
          등록
        </Button>
      </div>
      <CreateEditPost
        title={'*제목'}
        placehold={'제목을 입력해주세요'}
        onDataChange={handleData}
      />
      <CreateEditPost
        title={'*내용'}
        placehold={'내용을 입력해주세요'}
        onDataChange={handleData}
      />
    </div>
  );
}

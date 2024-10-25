import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '@/src/styles/create-post.module.css';
import Header from '@/src/components/Header.js';
import Button from '@/src/components/Button.js';
import CreateEditPost from '@/src/components/CreateEditPost.js';
import axios from '@/src/lib/axios.js';

export default function FreeBoard() {
  const router = useRouter();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function postArticle() {
    const data = { title: title, content: content };

    if (title && content) {
      try {
        const res = await axios.post('/articles', data);
        const articleId = res.data.id;
        console.log(res.data.id);
        router.push(`/free-board/${articleId}`);
      } catch (error) {
        console.error('Error posting article:', error);
      }
    }
  }

  useEffect(() => {
    if (title && content) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [title, content]);

  const handleData = (inputType, data) => {
    if (inputType === 'postTitle') {
      setTitle(data);
      console.log('title', title);
    } else if (inputType === 'content') {
      setContent(data);
      console.log('content', content);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.headerAndButton}>
        <Header>게시글 쓰기</Header>
        <Button status={isButtonActive} onClick={postArticle}>
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

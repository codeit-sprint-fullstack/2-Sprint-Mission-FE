import style from '@/styles/create-post.module.css';
import Header from '@/components/Header.js';
import Button from '@/components/Button.js';
import CreatePost from '@/components/CreatePost';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FreeBoard() {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function postArticle() {
    const data = { title: title, content: content };

    try {
      const res = await axios.post('/articles', data);
      console.log(res.data);
    } catch (error) {
      console.error('Error posting article:', error);
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
      <CreatePost
        title={'*제목'}
        placehold={'제목을 입력해주세요'}
        onDataChange={handleData}
      />
      <CreatePost
        title={'*내용'}
        placehold={'내용을 입력해주세요'}
        onDataChange={handleData}
      />
    </div>
  );
}

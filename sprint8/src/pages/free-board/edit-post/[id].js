import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '@/src/styles/create-post.module.css';
import Header from '@/src/components/Header.js';
import Button from '@/src/components/Button.js';
import CreateEditPost from '@/src/components/CreateEditPost.js';
import { patchArticle } from '@/src/api/articleServices';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function updateArticle(id) {
    const data = { title, content };

    if (!title?.trim().length || !content?.trim().length) return;
    const res = await patchArticle(id, data);
    return res;
  }

  const handleUpdatePost = () => {
    updateArticle(id).then((res) => {
      if (res) router.push(`/free-board/${res.id}`);
    });
  };

  useEffect(() => {
    setIsButtonActive(title?.trim().length && content?.trim().length);
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
        <Header>게시글 수정하기</Header>
        <Button status={isButtonActive} onClick={handleUpdatePost}>
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

import style from '@/styles/create-post.module.css';
import Header from '@/components/Header.js';
import Button from '@/components/Button.js';
import CreatePost from '@/components/CreatePost';

export default function FreeBoard() {
  return (
    <div className={style.body}>
      <div className={style.headerAndButton}>
        <Header>게시글 쓰기</Header>
        <Button>등록</Button>
      </div>
      <CreatePost title={'*제목'} placehold={'제목을 입력해주세요'} />
      <CreatePost title={'*내용'} placehold={'내용을 입력해주세요'} />
    </div>
  );
}

import Header from '@/components/Header.js';
import style from '@/styles/CreatePost.module.css';

export default function CreatePost({ title, placehold }) {
  const input = title === '*제목' ? '.postTitle' : '.contnet';

  return (
    <div>
      <Header>{title}</Header>
      <div className={style[input]}>
        <input placeholder={placehold}></input>
      </div>
    </div>
  );
}

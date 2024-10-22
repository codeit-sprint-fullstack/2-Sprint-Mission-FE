import Header from '@/components/Header.js';
import style from '@/styles/CreatePost.module.css';

export default function CreatePost({ title, placehold }) {
  const inputType = title === '*제목' ? 'postTitle' : 'contnet';

  return (
    <div className={style.container}>
      <Header>{title}</Header>
      <div className={style[inputType]}>
        {inputType === 'postTitle' ? (
          <input
            id={inputType}
            placeholder={placehold}
            className={style.input}
          />
        ) : (
          <textarea
            id={inputType}
            placeholder={placehold}
            className={style.textarea}
          />
        )}
      </div>
    </div>
  );
}

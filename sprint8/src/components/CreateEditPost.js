import Header from '@/src/components/Header.js';
import style from '@/src/styles/CreateEditPost.module.css';

export default function CreatePost({ title, placehold, onDataChange }) {
  const inputType = title === '*제목' ? 'postTitle' : 'content';

  const handleInputChange = (e) => {
    onDataChange(inputType, e.target.value);
  };

  return (
    <div className={style.container}>
      <Header>{title}</Header>
      <div className={style[inputType]}>
        {inputType === 'postTitle' ? (
          <input
            id="postTitle"
            onChange={handleInputChange}
            placeholder={placehold}
            className={style.input}
          />
        ) : (
          <textarea
            id="content"
            onChange={handleInputChange}
            placeholder={placehold}
            className={style.textarea}
          />
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from 'react';
import Header from '@/src/components/Header.js';
import style from '@/src/styles/CreateEditPost.module.css';

export default function CreatePost({ title, placehold, onDataChange }) {
  // const [enterInput, setEnterInput] = useState(''); //이 또한 추후 삭제
  const inputType = title === '*제목' ? 'postTitle' : 'content';

  const handleInputChange = (e) => {
    // setEnterInput(e.target.value);
    onDataChange(inputType, e.target.value);
  };

  // useEffect(() => {
  //   console.log(enterInput, inputType); // 상태가 업데이트될 때마다 실행, 추후 삭제
  // }, [enterInput]);

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

import { useState } from 'react';

export default function Sorting() {
  const [isToggle, setIsToggle] = useState(false);
  const [selectOption, setSelectOption] = useState('최신순');

  const toggleMenuList = () => setIsToggle(!isToggle);
  const handleSelectSort = (option) => {
    setSelectOption(option);
    setIsToggle(false);
  };

  return (
    <div>
      <button onClick={toggleMenuList}> {selectOption} </button>
      {isToggle && (
        <div>
          {/*api 연결 시 로직 수정 예정*/}
          <button onClick={() => handleSelectSort('최신순')}>최신순</button>
          <button onClick={() => handleSelectSort('좋아요순')}>좋아요순</button>
        </div>
      )}
    </div>
  );
}

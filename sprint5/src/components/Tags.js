import React, { useState, useEffect } from 'react';
import '../css/Tags.css';
import X from '../images/ic_X.png';

const Tags = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && !isComposing) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="태그를 입력하고 엔터를 누르세요"
      />
      <div style={{ marginTop: '10px' }}>
        {tags.map((tag, index) => (
          <div
            key={index}
            style={{
              display: 'inline-block',
              margin: '5px',
              padding: '5px',
              background: '#e0e0e0',
              borderRadius: '3px'
            }}
          >
            {tag}
            <button
              onClick={() => handleTagRemove(index)}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            >
              <img src={X} alt="X" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;

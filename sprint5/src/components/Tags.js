import React, { useState, useEffect } from 'react';
import styles from '../css/Tags.module.css';
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
      <div>
        {tags.map((tag, index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 12px 6px 16px',
              background: '#F3F4F6',
              borderRadius: '36px',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
              height: '36px'
            }}
          >
            {tag}
            <button
              onClick={() => handleTagRemove(index)}
              style={{
                marginLeft: '5px',
                cursor: 'pointer',
                backgroundColor: 'none',
                border: 'none'
              }}
            >
              <img
                src={X}
                alt="X"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'none'
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;

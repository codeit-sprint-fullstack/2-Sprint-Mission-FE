/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import c from '@/src/utils/constants';
import { useEffect, useRef } from 'react';
import { useDropdown } from '../contexts/DropdownContext';

const style = {
  dropdownMenu: css`
    position: absolute;
    display: grid;
    grid-template-rows: repeat(2, 4.2rem);
    grid-gap: 0;
    margin-top: 0.8rem;
    width: 13rem;
    z-index: 9999;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid var(--gray-200);
      border-bottom: 0;
      height: 4.2rem;

      background-color: #ffffff;
      color: var(--gray-800);
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.6rem;

      &:first-of-type {
        border-top-left-radius: 1.2rem;
        border-top-right-radius: 1.2rem;
      }

      &:last-child {
        border-bottom: 1px solid var(--gray-200);
        border-bottom-left-radius: 1.2rem;
        border-bottom-right-radius: 1.2rem;
      }

      &:hover {
        background-color: var(--Primary-100);
        color: var(--gray-50);
        border: none;
      }
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      transform: translateX(-8.8rem);
    }
  `,
};

export default function DropdownMenu({ DropdownButton, list, dictionary, onClick }) {
  const dropdownRef = useRef();
  const { dropdownOpen, setDropdownOpen } = useDropdown();

  const handleClick = item => {
    setDropdownOpen(false);
    onClick(item);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      // NOTE Ref의 current에 담긴 엘리먼트가 아닌 곳(바깥)을 클릭 시 드롭다운 메뉴 닫힘
      if (dropdownOpen && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      {DropdownButton}
      {dropdownOpen && (
        <ul className="dropdown-menu" css={style.dropdownMenu}>
          {Object.values(list).map(item => {
            return (
              <li onClick={() => handleClick(item)} key={item}>
                {dictionary[item]}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

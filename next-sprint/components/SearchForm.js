import styles from './SearchForm.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

export default function SearchForm({ initialValue, onChange, sort }) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <input
          placeholder="검색할 상품을 입력해주세요."
          className={styles.search}
          onChange={handleChange}
          value={value}
        ></input>
        {!value && (
          <div className={styles.searchImg}>
            <Image fill src="/images/ic_search.svg" alt="검색 이미지" />
          </div>
        )}
        <Dropdown setSortOption={sort} />
      </label>
    </form>
  );
}

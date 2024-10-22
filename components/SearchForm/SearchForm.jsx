import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./SearchForm.module.css";

export default function SearchForm({ initialValue = "" }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) {
      router.push("/board");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.search_input}>
      <input
        name="q"
        value={value}
        onChange={handleChange}
        placeholder="검색할 상품을 입력해주세요"
      />
    </form>
  );
}

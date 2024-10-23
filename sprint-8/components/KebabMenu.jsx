import styles from '@/styles/ArticleDetail.module.css';
import Image from "next/image";
import { useState } from "react";

export default function KebabMenu({ onEdit, onDel }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className={styles.kebabContainer}>
			<button type="button" onClick={() => setMenuOpen(prev => !prev)}><Image width={24} height={24} src="/images/ic_kebab.png" alt="kebab" /></button>
			{menuOpen && (
				<div className={styles.menu}>
					<button onClick={onEdit}>수정하기</button>
					<button onClick={onDel}>삭제하기</button>
				</div>
			)}
		</div>
	)
}
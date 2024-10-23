import { useEffect, useState } from "react";
import styles from '@/styles/Write.module.css';
import { useRouter } from "next/router";
import PopUp from "@/components/PopUp";
import { postArticle } from "@/apis/articlesService";

function Write() {
	const [error, setError] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const router = useRouter();

	const handleWrite = () => {
		const postArticleDo = async () => {
			const res = await postArticle({ title, content, authorId: "86f32cda-cc20-49e5-a1c8-a69ff98e5ebf", favoriteCount: 0 });
			if (res?.id) {
				router.push(`/articles/${res.id}`);
			} else {
				setError(res);
			}
		}
		postArticleDo();
	};

	useEffect(() => {
		setError(null);
	}, []);

	return (
		<>
			<main className={styles.main}>
				<article className={styles.sub}>
					<div className={styles.head}>
						<h2>게시글 쓰기</h2>
						<button type="button" className={styles.btnWrite} disabled={!title.trim() || !content.trim()} onClick={handleWrite}>등록</button>
					</div>
					<h3>*제목</h3>
					<input type="text" placeholder="제목을 입력해주세요." value={title} onChange={(e) => setTitle(e.target.value)} />
					<h3>*내용</h3>
					<textarea placeholder="내용을 입력해주세요." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
				</article>
			</main>
			<PopUp error={error} setError={setError} />
		</>
	)
}

export default Write;

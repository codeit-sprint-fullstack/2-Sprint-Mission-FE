import { useEffect, useState } from "react";
import styles from '@/styles/Write.module.css';
import { useRouter } from "next/router";
import PopUp from "@/components/PopUp";
import { getArticleWithId, patchArticleWithId, postArticle } from "@/apis/articlesService";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import instance from "@/apis/instance";

// export async function getServerSideProps(context) {
// 	const { id: articleId } = context.query;
// 	if (articleId) {
// 		const article = await getArticleWithId(articleId);
// 		console.log(article);
// 		return {
// 			props: {
// 				id: articleId,
// 				article,
// 			},
// 		};
// 	}
// 	return {
// 		props: {},
// 	};
// }

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function Write() {
	const [error, setError] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const router = useRouter();
	const { id } = router.query;
	const [selectedFiles, setSelectedFiles] = useState([]);
	const { data: article, isPending, isError } = useQuery({
		queryKey: ["articles", id],
		queryFn: () => getArticleWithId(id),
	});

	useEffect(() => {
		if (article) {
			setTitle(article.title ?? "");
			setContent(article.content ?? "");
			setSelectedFiles(article.images ?? []);
		}
	}, [article]);

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
		if (validFiles.length !== files.length) {
			alert('파일 크기는 5MB를 초과할 수 없습니다.');
		}
		if (validFiles.length > 3) {
			alert('최대 3개의 이미지만 업로드할 수 있습니다.');
		}
		setSelectedFiles(validFiles.slice(0, 3));
	};

	const handleWrite = () => {
		const postArticleDo = async () => {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('content', content);
			selectedFiles.forEach(file => {
				formData.append('images', file);
			});
			const res = await postArticle(formData);
			console.log(res);
			if (res?.id) {
				router.push(`/articles/${res.id}`);
			} else {
				setError(res);
			}
		}
		const patchArticleWithIdDo = async () => {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('content', content);
			selectedFiles.forEach(file => {
				formData.append('images', file);
			});
			const res = await patchArticleWithId(id, formData);
			if (res?.message) {
				setError(res);
			} else {
				router.push(`/articles/${id}`);
			}
		}
		if (id) {
			patchArticleWithIdDo();
		} else {
			postArticleDo();
		}
	};

	const fileToURL = (file) => {
		if (file instanceof File) {
			return URL.createObjectURL(file);
		}
		if (typeof file === 'string') {
			if (file.startsWith('http')) {
				return file;
			}
			return `${instance.defaults.baseURL}${file}`;
		}
	}

	useEffect(() => {
		setError(null);
	}, []);

	return (
		<>
			<main className={styles.main}>
				<article className={styles.sub}>
					<div className={styles.head}>
						<h2>게시글 쓰기</h2>
						<button type="button" className={styles.btnWrite} disabled={!title.trim() || !content.trim()} onClick={handleWrite}>{id ? '수정' : '등록'}</button>
					</div>
					<h3>*이미지</h3>
					<input type="file" accept="image/*" multiple onChange={handleFileChange}/>
					{selectedFiles.map((file, index) => (
						<div key={index} className={styles.selectedImages}>
							<Image width={150} height={150} src={fileToURL(file)} alt="Article" />
						</div>
					))}
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

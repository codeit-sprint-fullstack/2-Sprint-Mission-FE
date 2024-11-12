import styles from '@/styles/RegisPage.module.css';
import { useRef, useState } from "react";
import Tags from "@/components/Tags.jsx";
import Images from "@/components/Images.jsx";
import { postProduct } from "@/apis/itemsService.js";
import PopUp from "@/components/PopUp.jsx";
import useAsync from "@/hooks/useAsync.js";

export async function isImage(url) {
	try {
		const response = await fetch(url);
		const contentType = response.headers.get("content-type");
		return contentType && contentType.startsWith("image/");
	} catch (error) {
		console.error("Error validating image URL:", error);
		return false;
	}
}

const INITIAL_VALUES = {
	name: "",
	description: "",
	price: 0,
	images: [],
	tags: [],
};

export default function RegisPage() {
	const imageUrlError = useRef();
	const tagsError = useRef();
	const [values, setValues] = useState(INITIAL_VALUES);
	const [imageUrl, setImageUrl] = useState("");
	const [tag, setTag] = useState("");
	const [validation, setValidation] = useState({
		name: false,
		description: false,
		price: true,
		images: true,
		tags: true,
	});
	const [isPending, error, asyncPostProduct, setError] = useAsync(postProduct);

	const handleSubmit = async () => {
		await handleImageInput({ code: "Enter" }, imageUrl);
		await handleTagInput({ code: "Enter" }, tag);
		if (validation.name && validation.description && validation.price && validation.images && validation.tags) {
			const res = await asyncPostProduct(values);
			console.log(res);
			if (res?.message) {
				console.log("error: ", error);
				setError(res);
			}
			else {
				setError(res);
				setValues(INITIAL_VALUES);
			}
		}
	};

	const handleImageInput = async (e, imageUrl) => {
		if (e.code === "Enter" || e.code === "Semicolon" || e.code === "Comma") {
			e.preventDefault?.();
			if (!imageUrl.length) {
				imageUrlError.current.innerHTML = "";
				setValidation(draft => ({...draft, images: true}));
				return;
			}
			if (values.images.some(img => img === imageUrl)) {
				imageUrlError.current.innerHTML = "이미 입력한 이미지입니다.";
				setValidation(draft => ({...draft, images: false}));
			}
			else if (!(await isImage(imageUrl))) {
				imageUrlError.current.innerHTML = "해당 URL 은 유효한 이미지가 아닙니다.";
				setValidation(draft => ({...draft, images: false}));
			}
			else {
				imageUrlError.current.innerHTML = "";
				setImageUrl("");
				setValues(draft => ({ ...draft, images: [...draft.images, imageUrl] }));
				setValidation(draft => ({...draft, images: true}));
			}
		}
	}

	const handleTagInput = async (e, tag) => {
		if (e.key === "Process") {
			return;
		}
		if (e.code === "Enter" || e.code === "Semicolon" || e.code === "Comma") {
			e.preventDefault?.();
			tag = tag.trim();
			if (!tag.length) {
				tagsError.current.innerHTML = "";
				setValidation(draft => ({...draft, tags: true}));
				return;
			}
			if (values.tags.some(t => t === tag)) {
				tagsError.current.innerHTML = "이미 입력한 태그입니다.";
				setValidation(draft => ({...draft, tags: false}));
			}
			else {
				tagsError.current.innerHTML = "";
				setTag("");
				setValues(draft => ({ ...draft, tags: [...draft.tags, tag] }));
				setValidation(draft => ({...draft, tags: true}));
			}
		}
	}

	return (
		<>
			<main className={styles.main}>
				<section className={styles.section}>
					<form className={styles.form}>
						<div className={styles.heads}>
							<h1>상품 등록하기</h1>
							<button onClick={handleSubmit} type="button" disabled={!(validation.name && validation.description && validation.price && validation.images && validation.tags) || isPending}>등록</button>
						</div>
						<label htmlFor="name">상품명</label>
						<input id="name" name="name" placeholder="상품명을 입력해주세요." type="text" required value={values.name} onChange={(e) => {
							const val = e.target.value;
							setValues(draft => ({ ...draft, name:val }));
							setValidation(draft => ({ ...draft, name: val.length >= 1 && val.length <= 10 }))
						}}/>
						<div className={styles.error}>{validation.name ? "" : "상품명은 1글자 이상 10글자 이하여야 합니다."}</div>
						<label htmlFor="description">상품 소개</label>
						<textarea id="description" name="description" placeholder="상품 소개를 입력해주세요." required value={values.description} onChange={(e) => {
							const val = e.target.value;
							setValues(draft => ({ ...draft, description: val }));
							setValidation(draft => ({ ...draft, description: (val.length >= 10 && val.length <= 100) }))
						}}></textarea>
						<div className={styles.error}>{validation.description ? "" : "상품 소개는 10자 이상, 100자 이하여야 합니다."}</div>
						<label htmlFor="price">판매가격</label>
						<input id="price" name="price" placeholder="판매 가격을 입력해주세요." type="number" required value={values.price} onChange={(e) => {
							const val = Number(e.target.value);
							setValues(draft => ({ ...draft, price: val }));
							setValidation(draft => ({ ...draft, price: !isNaN(val) && val >= 0 }))
						}}/>
						<div className={styles.error}>{validation.price ? "" : "가격은 0 이상의 숫자여야 합니다."}</div>
						<label htmlFor="imageUrl">이미지 URL (이미지를 추가하시려면 <span className={styles.trigger} onClick={() => handleImageInput({ code: "Enter" }, imageUrl)}>&quot;엔터&quot;, &quot;;&quot;, &quot;,&quot;</span> (&lt;= 를 클릭 혹은) 중 하나를 키보드로 입력해 주세요.)</label>
						<input id="imageUrl" name="imageUrl" placeholder="이미지 URL 을 입력해주세요." type="text" value={imageUrl} onChange={async (e) => {
							const val = e.target.value;
							setImageUrl(val);
							const isValidImageUrl = val.length ===0 || await isImage(val);
							setValidation(draft => ({ ...draft, images: isValidImageUrl }));
						}} onKeyDown={(e) => handleImageInput(e, imageUrl)}/>
						<div><Images name={values.name} images={values.images} setValues={setValues}/></div>
						<div className={styles.error} ref={imageUrlError}>{validation.images ? "" : "유효한 이미지 URL 이 아닙니다."}</div>
						<label htmlFor="tags">태그 (태그를 추가하시려면 <span className={styles.trigger} onClick={() => handleTagInput({ code: "Enter" }, tag)}>&quot;엔터&quot;, &quot;;&quot;, &quot;,&quot;</span> (&lt;= 를 클릭 혹은) 중 하나를 키보드로 입력해 주세요.)</label>
						<input id="tags" name="tags" placeholder="태그를 입력해주세요." type="text" value={tag} onChange={(e) => {
							const val = e.target.value;
							setTag(val);
							setValidation(draft => ({...draft, tags: true}));
						}} onKeyDown={(e) => handleTagInput(e, tag)}/>
						<div><Tags tags={values.tags} setValues={setValues}/></div>
						<div className={styles.error} ref={tagsError}></div>
					</form>
				</section>
			</main>
			<PopUp error={error} setError={setError}/>
		</>
	);
}
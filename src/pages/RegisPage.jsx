import styles from './RegisPage.module.css';
import { useEffect, useRef, useState } from "react";
import Tags from "../components/Tags.jsx";
import Images from "../components/Images.jsx";
import { getProductWithId, patchProductWithId, postProduct } from "../apis/itemsService.js";
import PopUp from "../components/PopUp.jsx";
import useAsync from "../hooks/useAsync.js";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

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
	images: [],
	tags: [],
};

export default function RegisPage() {
	const imageUrlError = useRef();
	const tagsError = useRef();
	const navigate = useNavigate();
	const [values, setValues] = useState(INITIAL_VALUES);
	const {
    register,
		watch,
		setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
		mode: "all",
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			imageUrl: "",
			tag: "",
		},
	});
	const [validation, setValidation] = useState({
		name: false,
		description: false,
		price: true,
		images: true,
		tags: true,
	});
	const [isPending, error, asyncPostProduct, setError] = useAsync(postProduct);
	const [isPending2, error2, asyncPatchProductWithId, setError2] = useAsync(patchProductWithId);
	const { productId } = useParams();
	const { data } = useQuery({
		queryKey: ["products", productId],
		queryFn: () => getProductWithId(productId),
	});
	useEffect(() => {
		if (productId && data) {
			setValue("name", data.name);
			setValue("description", data.description);
			setValue("price", data.price);
			setValues({
				images: data.images,
				tags: data.tags,
			});
		}
	}, [data, productId]);

	const onSubmit = async (data) => {
		await handleImageInput({ code: "Enter" }, watch("imageUrl"));
		await handleTagInput({ code: "Enter" }, watch("tag"));
		let res;
		let dataToSend = { name: data.name, description: data.description, price: data.price, images: values.images, tags: values.tags };
		if (productId || productId === 0) {
			res = await asyncPatchProductWithId(productId, dataToSend);
		} else {
			res = await asyncPostProduct(dataToSend);
		}
		console.log(res);
		if (res?.message) {
			console.log("error: ", error);
			setError(res);
		}
		else {
			setError(res);
			navigate(`/items/${res.id}`);
		}
	};

	const handleImageInput = async (e, imageUrl) => {
		if (e.code === "Enter" || e.code === "Semicolon" || e.code === "Comma") {
			e.preventDefault?.();
			if (!imageUrl.length) {
				imageUrlError.current.innerHTML = "";
				return;
			}
			if (values.images.some(img => img === imageUrl)) {
				imageUrlError.current.innerHTML = "이미 입력한 이미지입니다.";
			}
			else if (!(await isImage(imageUrl))) {
				imageUrlError.current.innerHTML = "해당 URL 은 유효한 이미지가 아닙니다.";
			}
			else {
				imageUrlError.current.innerHTML = "";
				setValue("imageUrl", "");
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
				return;
			}
			if (values.tags.some(t => t === tag)) {
				tagsError.current.innerHTML = "이미 입력한 태그입니다.";
			}
			else {
				tagsError.current.innerHTML = "";
				setValue("tag", "");
				setValues(draft => ({ ...draft, tags: [...draft.tags, tag] }));
			}
		}
	}

	return (
		<>
			<main className={styles.main}>
				<section className={styles.section}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.heads}>
							<h1>상품 등록하기</h1>
							<button type="submit" disabled={errors.name || errors.description || errors.price || isPending}>{productId || productId === 0 ? '수정' : '등록'}</button>
						</div>
						<label htmlFor="name">상품명</label>
						<input {...register("name", {required: '제목을 입력해 주세요.'})} placeholder="상품명을 입력해주세요." type="text" />
						{errors.name && <div className={styles.error}>{errors.name.message}</div>}
						<label htmlFor="description">상품 소개</label>
						<textarea {...register("description", { required: '설명을 입력해 주세요.' })} placeholder="상품 소개를 입력해주세요."></textarea>
						{errors.description && <div className={styles.error}>{errors.description.message}</div>}
						<label htmlFor="price">판매가격</label>
						<input {...register("price", { min: 0 })} placeholder="판매 가격을 입력해주세요." type="number" />
						{errors.price && <div className={styles.error}>{errors.price.message}</div>}
						<label htmlFor="imageUrl">이미지 URL (이미지를 추가하시려면 <span className={styles.trigger} onClick={() => handleImageInput({ code: "Enter" }, watch("imageUrl"))}>"엔터", ";", ","</span> (&lt;= 를 클릭 혹은) 중 하나를 키보드로 입력해 주세요.)</label>
						<input {...register("imageUrl", { required: false, validate: { isImage: (val) => {
							if (val && !isImage(val)) {
								return "이미지 URL 이 아닙니다.";
						}}}})} placeholder="이미지 URL 을 입력해주세요." type="text" onKeyDown={(e) => handleImageInput(e, watch("imageUrl"))}/>
						<div><Images name={values.name} images={values.images} setValues={setValues}/></div>
						<div className={styles.error} ref={imageUrlError}>{validation.images ? "" : "유효한 이미지 URL 이 아닙니다."}</div>
						<label htmlFor="tags">태그 (태그를 추가하시려면 <span className={styles.trigger} onClick={() => handleTagInput({ code: "Enter" }, watch("tag"))}>"엔터", ";", ","</span> (&lt;= 를 클릭 혹은) 중 하나를 키보드로 입력해 주세요.)</label>
						<input {...register("tag", { required: false })} placeholder="태그를 입력해주세요." type="text" onKeyDown={(e) => handleTagInput(e, watch("tag"))}/>
						<div><Tags tags={values.tags} setValues={setValues}/></div>
						<div className={styles.error} ref={tagsError}></div>
					</form>
				</section>
			</main>
			<PopUp error={error} setError={setError}/>
		</>
	);
}

import { useEffect, useState } from "react";
import { createArticle, patchArticle } from "./api/ArticleService";
import style from "../styles/Post.module.css";
import Image from "next/image";
import ic_plus from "@/public/ic_plus.png";
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id, title: initialTitle, content: initialContent, images: initialImages } = router.query; // 쿼리 파라미터에서 제목과 내용 받기

  const isEditing = !!id;

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialContent) setContent(initialContent);
    if (initialImages) setImages(initialImages);
  }, [initialTitle, initialContent, initialImages]);

  const isValid = title.trim() !== "" && content.trim() !== "" && content.length >= 10;

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const postData = { title, content, images };
      let result;
      if (isEditing) {
        result = await patchArticle(id, postData);
      } else {
        result = await createArticle(postData);
      }
      console.log("게시글 결과:", result); // 결과 확인

      setTitle("");
      setContent("");
      setImages([]);
      router.push(`/articles/${result.id}`);
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.top}>
      <div className={style.body}>
        <div className={style.titleBtnGroup}>
          <h1 className={style.post}>{isEditing ? "게시글 수정" : "게시글 쓰기"}</h1>
          <button 
            className={`${style.postBtn} ${isValid ? style.active : ""}`}
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}>
            {isEditing ? "수정" : "등록"}
          </button>
        </div>
        <div className={style.postBody}>
          <label className={style.title} htmlFor="titleInput">
            *제목
          </label>
          <input
            id="titleInput"
            className={style.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
          <label className={style.content} htmlFor="contentInput">
            *내용
          </label>
          <textarea
            id="contentInput"
            className={style.contentInput}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
          />
          <p className={style.image}>이미지</p>
          <div className={style.imageInput}>
            <button 
              className={style.uploadBtn} >
              <Image className={style.plus} src={ic_plus} alt="plus" />
            </button>
            <p className={style.fileUpload}>이미지 등록</p>
          </div>
        </div>
      </div>
    </div>
  );
}

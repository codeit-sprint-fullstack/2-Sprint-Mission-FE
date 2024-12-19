import styles from '@/styles/ArticleRegister.module.css';
import { createArticle } from '@/lib/api/ArticleService';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useArticleValidate from '@/hooks/useArticleValidate';
import { uploadImages } from '@/lib/api/ImageService';
import FileInput from '@/components/Common/FileInput';
import { ArticleData } from '@/types/type';

export default function Register() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { values, setValues, errors, handleChange, validate } =
    useArticleValidate({
      title: '',
      content: '',
      image: ''
    });

  const [error, setError] = useState<string>('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) => {
      const isValidSize = file.size <= 5 * 1024 * 1024;
      const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(
        file.type
      );

      if (!isValidSize) {
        alert('파일 크기는 5MB 이하여야 합니다.');
      }
      if (!isValidType) {
        alert('JPG, PNG, GIF 형식만 지원합니다.');
      }

      return isValidSize && isValidType;
    });

    if (imageFiles.length + validFiles.length > 1) {
      alert('이미지는 1장만 등록 가능합니다.');
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
    setImageFiles(validFiles);

    setValues((prevValues) => ({
      ...prevValues,
      image: newPreviews[0]
    }));
  };

  const removeImage = (index: number) => {
    setImageFiles([]);
    setImagePreviews([]);

    setValues((prevValues) => ({
      ...prevValues,
      image: ''
    }));
  };

  const isInputEmpty = (): boolean => {
    return values.title.trim() !== '' && values.content.trim() !== '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFiles.forEach((file) => {
        imageFormData.append('image', file);
      });

      const uploadedImages = await uploadImages(imageFormData);

      const imageUrl = uploadedImages[0]?.url;

      const articleData: ArticleData = {
        title: values.title,
        content: values.content,
        image: imageUrl
      };

      const res = await createArticle(articleData);
      const articleId = res.id;
      return router.push(`/articles/${articleId}`);
    } catch (err) {
      console.error('게시글 등록에 실패하였습니다.');
      setError('게시글 등록에 실패하였습니다.');
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles[`form-header`]}>
          <h1>게시글 쓰기</h1>
          <button type="submit" disabled={!isInputEmpty()}>
            등록
          </button>
        </div>
        <div className={styles.group}>
          <label htmlFor="title">* 제목</label>
          <input
            type="text"
            id="title"
            value={values.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요"
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>
        <div className={styles.group}>
          <label htmlFor="content">* 내용</label>
          <textarea
            id="content"
            value={values.content}
            onChange={handleChange}
            placeholder="내용 입력해주세요"
          />
          {errors.content && (
            <div className={styles.error}>{errors.content}</div>
          )}
        </div>
        <FileInput
          onChange={handleImageChange}
          imagePreviews={imagePreviews}
          removeImage={removeImage}
        >
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </FileInput>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

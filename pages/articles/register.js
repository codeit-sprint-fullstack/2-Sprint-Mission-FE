import styles from '@/styles/ArticleRegister.module.css';
import { createArticle } from '@/lib/api/ArticleService';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useArticleValidate from '@/hooks/useArticleValidate';
import { uploadImages } from '@/lib/api/ImageService';
import FileInput from '@/components/Common/FileInput';

export default function Register() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { values, errors, handleChange, validate } = useArticleValidate({
    title: '',
    content: '',
    image: []
  });

  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

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
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setImageFiles([...imageFiles, ...files]);

    handleChange({
      target: {
        id: 'image',
        value: [...values.image, ...newPreviews]
      }
    });
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    handleChange({
      target: {
        id: 'image',
        value: newPreviews
      }
    });
  };

  const isInputEmpty = () => {
    return values.title.trim() !== '' && values.content.trim() !== '';
  };

  const handleSubmit = async (e) => {
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

      const imageUrl = uploadedImages.url;
      const articleData = {
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
            type="text"
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

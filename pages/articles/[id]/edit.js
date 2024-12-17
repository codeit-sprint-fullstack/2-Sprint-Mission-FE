import styles from '@/styles/ArticleEdit.module.css';
import { getArticle, patchArticle } from '@/lib/api/ArticleService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useArticleValidate from '@/hooks/useArticleValidate';
import { uploadImages } from '@/lib/api/ImageService';
import FileInput from '@/components/Common/FileInput';

export default function Edit() {
  const router = useRouter();
  const articleId = router.query['id'];

  const [data, setData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { values, setValues, errors, handleChange, validate } =
    useArticleValidate({
      title: '',
      content: '',
      image: ''
    });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getArticle(articleId);
        setData(res);
      } catch (err) {
        console.error('게시글을 불러오는데 실패했습니다.');
      }
    };

    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    if (data) {
      setValues({
        title: data.title,
        content: data.content,
        image: data.image || ''
      });
      setImagePreviews(data.image ? [data.image] : []);
    }
  }, [data, setValues]);

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
    setImagePreviews(newPreviews);
    setImageFiles(validFiles);
    handleChange({
      target: {
        id: 'image',
        value: newPreviews[0] || ''
      }
    });
  };

  const removeImage = () => {
    setImageFiles([]);
    setImagePreviews([]);

    handleChange({
      target: {
        id: 'image',
        value: ''
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
      let uploadedImageUrl = values.image;

      if (imageFiles.length > 0) {
        const imageFormData = new FormData();
        imageFiles.forEach((file) => {
          imageFormData.append('image', file);
        });

        const uploadedImage = await uploadImages(imageFormData);

        if (uploadedImage && uploadedImage[0]?.url) {
          uploadedImageUrl = uploadedImage[0].url;
        } else {
          alert('이미지 업로드에 실패했습니다.');
          return;
        }
      }

      const articleData = {
        title: values.title,
        content: values.content,
        image: uploadedImageUrl
      };

      console.log(articleData);
      await patchArticle(articleId, articleData);
      return router.push(`/articles/${articleId}`);
    } catch (err) {
      console.error('게시글 수정에 실패하였습니다.', err);
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
        </div>
        <FileInput
          onChange={handleImageChange}
          imagePreviews={imagePreviews}
          removeImage={removeImage}
        >
          {errors.image && <div className={styles.error}>{errors.image}</div>}
        </FileInput>
      </form>
    </div>
  );
}

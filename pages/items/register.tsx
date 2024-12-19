import styles from '@/styles/ProductRegister.module.css';
import { createProduct } from '@/lib/api/ProductService';
import { uploadImages } from '@/lib/api/ImageService';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import useProductValidate from '@/hooks/useProductValidate';
import ProductTags from '@/components/ProductDetail/ProductTags';
import FileInput from '@/components/Common/FileInput';

export interface ProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}

export default function Register() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { values, setValues, errors, handleChange, validate } =
    useProductValidate({
      name: '',
      description: '',
      price: '',
      images: []
    });

  const [tags, setTags] = useState<string[]>([]);
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

    if (imageFiles.length + validFiles.length > 3) {
      alert('이미지는 최대 3개까지만 등록 가능합니다.');
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setImageFiles([...imageFiles, ...files]);

    setValues({
      ...values,
      images: [...values.images, ...newPreviews]
    });
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    setValues({
      ...values,
      images: newPreviews
    });
  };

  const isInputEmpty = (): boolean => {
    return (
      values.name.trim() !== '' &&
      values.description.trim() !== '' &&
      values.price.trim() !== ''
    );
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

      const productData: ProductData = {
        name: values.name,
        description: values.description,
        price: parseInt(values.price),
        images: Array.isArray(uploadedImages)
          ? uploadedImages.map((img) => img.url)
          : [uploadedImages.url],
        tags: tags
      };

      await createProduct(productData);
      return router.push(`/items`);
    } catch (err: any) {
      console.error('상품 등록에 실패하였습니다.', err.message);
      setError('상품 등록에 실패하였습니다.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.bar}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <button type="submit" disabled={!isInputEmpty()} className={styles.add}>
          등록
        </button>
      </div>
      <FileInput
        onChange={handleImageChange}
        imagePreviews={imagePreviews}
        removeImage={removeImage}
      >
        {errors.images && <div className={styles.error}>{errors.images}</div>}
      </FileInput>
      <div className={styles.group}>
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          placeholder="상품명을 입력해주세요"
          style={{ border: errors.name ? '0.1rem solid red' : 'none' }}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
      </div>
      <div className={styles.group}>
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={values.description}
          onChange={handleChange}
          placeholder="상품 소개를 입력해주세요"
          style={{ border: errors.description ? '0.1rem solid red' : 'none' }}
        />
        {errors.description && (
          <div className={styles.error}>{errors.description}</div>
        )}
      </div>
      <div className={styles.group}>
        <label htmlFor="price">판매가격</label>
        <input
          type="text"
          id="price"
          value={values.price}
          onChange={handleChange}
          placeholder="판매 가격을 입력해주세요"
          style={{ border: errors.price ? '0.1rem solid red' : 'none' }}
        />
        {errors.price && <div className={styles.error}>{errors.price}</div>}
      </div>
      <div className={styles.group}>
        <label htmlFor="tags">태그</label>
        <ProductTags tags={tags} setTags={setTags} />
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}

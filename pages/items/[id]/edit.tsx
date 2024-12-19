import styles from '@/styles/ProductEdit.module.css';
import { getProduct, patchProduct } from '@/lib/api/ProductService';
import { uploadImages } from '@/lib/api/ImageService';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import useProductValidate from '@/hooks/useProductValidate';
import ProductTags from '@/components/ProductDetail/ProductTags';
import FileInput from '@/components/Common/FileInput';
import Spinner from '@/components/Common/Spinner';
import { ProductData } from '../register';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  ownerId: number;
  ownerNickname: string;
  favoriteCount: number;
  isFavorite: boolean;
}

export default function Edit() {
  const router = useRouter();
  const productId = router.query['id'];

  const [data, setData] = useState<Product | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const { values, setValues, errors, handleChange, validate } =
    useProductValidate({
      name: '',
      description: '',
      price: '',
      images: []
    });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(productId);
        setData(res);
      } catch (err) {
        console.error('상품 정보를 불러오는데 실패했습니다.');
        setError('상품 정보를 불러오는데 실패하였습니다.');
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        images: data.images || []
      });
      setTags(data.tags || []);
      setImagePreviews(data.images || []);
    }
  }, [data, setValues]);

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

      let uploadedImages = [];
      if (imageFormData.has('image')) {
        uploadedImages = await uploadImages(imageFormData);
      }

      const allImages = [
        ...values.images,
        ...(Array.isArray(uploadedImages)
          ? uploadedImages.map((img) => img.url)
          : [uploadedImages.url])
      ];

      const productData: ProductData = {
        name: values.name,
        description: values.description,
        price: parseInt(values.price),
        images: allImages,
        tags: tags
      };

      await patchProduct(productId, productData);
      return router.push(`/items/${productId}`);
    } catch (err) {
      console.error('상품 수정에 실패하였습니다.');
      setError('상품 수정에 실패하였습니다.');
    }
  };

  if (!data) return <Spinner />;

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
          style={{ border: errors.name ? '1px solid red' : 'none' }}
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
          style={{ border: errors.description ? '1px solid red' : 'none' }}
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
          style={{ border: errors.price ? '1px solid red' : 'none' }}
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

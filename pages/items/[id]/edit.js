import styles from '@/styles/ProductEdit.module.css';
import { getProduct, patchProduct } from '@/lib/api/ProductService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useProductValidate from '@/hooks/useProductValidate';
import ProductTags from '@/components/ProductDetail/ProductTags';

export default function Edit() {
  const router = useRouter();
  const productId = router.query['id'];

  const [data, setData] = useState(null);
  const [images, setImages] = useState([
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/36/1728458150670/heart-1776746_640.jpg'
  ]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  const { values, setValues, errors, handleChange, validate } =
    useProductValidate({
      name: '',
      description: '',
      price: ''
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
        price: data.price.toString()
      });
      setTags(data.tags || []);
    }
  }, [data, setValues]);

  const isInputEmpty = () => {
    return (
      values.name.trim() !== '' &&
      values.description.trim() !== '' &&
      values.price.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const product = {
        name: values.name,
        description: values.description,
        price: parseInt(values.price),
        images,
        tags
      };
      await patchProduct(productId, product);
      return router.push(`/items/${productId}`);
    } catch (err) {
      console.error('상품 수정에 실패하였습니다.');
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.bar}>
        <h1 className={styles.title}>상품 등록하기</h1>
        <button type="submit" disabled={!isInputEmpty()} className={styles.add}>
          등록
        </button>
      </div>
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
        {errors.tags && <div className={styles.error}>{errors.tags}</div>}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}

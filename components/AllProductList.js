import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';
import createButton from '@/components/Button';
import { useViewport } from '@/lib/viewportContext';
import Image from 'next/image';
import defaultImage from '@/public/no_image.png';
import styles from './AllProductList.module.css';

export async function getStaticProps() {
  const res = await axios.get(`/products`);
  const products = res.data.list;
  console.log('SSG:', res);
  return {
    props: {
      products,
    },
  };
}

const pageSizeTable = Object.freeze({
  desktop: 10,
  tablet: 6,
  mobile: 4,
});

const RegistrationPageButton = createButton({
  style: 'btn_small_40',
});

function AllProducts({ products }) {
  const viewport = useViewport();
  const [items, setItems] = useState(products);
  const [order, setOrder] = useState('recent');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeTable[`${viewport}`]);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const handleLoad = useCallback(async () => {
    try {
      const res = await axios.get(
        `/products?orderBy=${order}&page=${page}&pageSize=${pageSize}&search=${search}`
      );
      const { list, totalCount } = res.data;
      setItems(list);
      // setPage(page);
      const pages = Math.ceil(totalCount / pageSize);
      setTotalPages(pages);
    } catch (error) {
      console.error(error);
    }
  }, [order, page, pageSize, search]);

  const handleChange = (e) => {
    setPage(1);
    setOrder(e.target.value);
  };

  const startPage =
    page < totalPages - 1 ? Math.max(1, page - 2) : totalPages - 4;
  const endPage = startPage + 4;
  const pagination = [];
  for (let i = startPage; i <= endPage; i++) {
    pagination.push(i);
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      const searchQuery = e.target.value.trim();
      setSearch(searchQuery);
    }
  };

  useEffect(() => {
    setPageSize(pageSizeTable[`${viewport}`]);
  }, [viewport]);

  useEffect(() => {
    handleLoad();
  }, [order, page, pageSize, search]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.menus}>
        <p className={styles.title}>판매 중인 상품</p>
        <input
          className={styles.itemSearchInput}
          placeholder="      검색할 상품을 입력해주세요"
          onKeyUp={handleKeyUp}
        />
        <Link href={'/registration'}>
          <RegistrationPageButton className="registrationPageButton">
            상품 등록하기
          </RegistrationPageButton>
        </Link>
        <select className={styles.orderSelect} onChange={handleChange}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요순</option>
        </select>
      </div>
      <div className={styles.allProductList}>
        {items?.map((item) => (
          <div className={styles.allProduct} key={item.id}>
            <div className={styles.productImage}>
              <Image
                fill
                src={item.images[0] || defaultImage}
                alt={item.name}
								unoptimized
              />
            </div>
            <div className={styles.productInfo}>
              <p className={styles.description}>{item.description}</p>
              <p className={styles.price}>{item.price.toLocaleString()}원</p>
              <p className={styles.favoriteCount}>
                ♡ {item.favoriteCount || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {pagination.map((num) => (
          <button
            className={`${page === num ? styles.active : ''}`}
            key={num}
            onClick={() => setPage(num)}
            disabled={num === page}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default AllProducts;

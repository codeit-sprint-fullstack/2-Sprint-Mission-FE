import Image from "next/image";
import searchIcon from "public/ic_search.svg";
import arrowDown from "public/ic_arrow_down.svg";
import defaultImg from "public/img_default.svg";
import heartImg from "public/ic_heart.svg";
import styles from "../../styles/Items.module.css";
import { useEffect, useState } from "react";
import { getProduct } from "@/api/axios";
import { useRouter } from "next/navigation";

export default function Items() {
  const options = ["최신순", "좋아요순"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [orderBy] = useState("recent");
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    console.log("선택한 옵션:", option);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProduct(page, pageSize, orderBy);
        const productData = data.list;
        setProducts(productData);
      } catch (error) {
        const errorMessage = (error as Error).message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, pageSize, orderBy]);

  const movingPage = (addressId: number) => {
    if (isLoggedIn) {
      router.push(`/items/${addressId}`);
    } else {
      alert("로그인 후 이용해주세요.");
      router.push("/login");
    }
  };

  return (
    <div className={styles.items}>
      <div className={styles.header}>
        <p className={styles.product_text}>판매 중인 상품</p>
        <div className={styles.header_right}>
          <div className={styles.search_bar}>
            <Image src={searchIcon} alt="돋보기" />
            <input
              className={styles.enter}
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <button className={styles.product_register}>상품 등록하기</button>
          <div className={styles.dropdown_wrapper}>
            <p className={styles.selected_option}>
              {selectedOption || "최신순"}
            </p>
            <Image src={arrowDown} alt="화살표" onClick={toggleDropdown} />
            {isOpen && (
              <ul className={styles.select_options}>
                {options.map((option) => (
                  <li key={option} onClick={() => handleOptionClick(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {loading && <div>로딩중...</div>}
        {error && <div>오류 발생: {error}</div>}
        <div className={styles.products_body}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.product_list}
              onClick={() => movingPage(product.id)}
            >
              <Image src={defaultImg} alt="상품 이미지" />
              <div className={styles.product_info}>
                <p className={styles.product_name}>{product.name}</p>
                <p className={styles.product_price}>{product.price}원</p>
                <div className={styles.heart}>
                  <Image src={heartImg} alt="하트" />
                  <p className={styles.product_favorite}>
                    {product.favoriteCount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./ItemDetailPage.module.css";
import defaultImg from "../imgFile/defaultProduct.png";
import emptyHeart from "../imgFile/ic_heart .png";
import fullHeart from "../imgFile/ic_pinkheart.png";
import kebab from "../imgFile/ic_kebab.png";
import Dropdown from "../component/Dropdown.js";
import avatarImg from "../imgFile/김코드마크.png";
import formatDate from "../lib/formatDate.js";
import Comments from "../component/Comments.js";
import backHome from "../imgFile/ic_back.png";

function ItemDetailPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await axios.delete(`/products/${item.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }); // DELETE 요청
      toggleDropdown(null);
    } catch (error) {
      console.error("삭제실패", error);
      toggleDropdown(null); // 드롭다운 닫기 (삭제 실패 시)
    }
    toggleDropdown(null);
    setItem([]); // 상품 삭제 시 item을 null로 설정
    setActiveDropdown(null); // 드롭다운 닫기
    navigate("/items");
  };

  const handleClickFavoriteToggle = async () => {
    setIsLiked(!isLiked); //좋아요 상태 토글

    if (isLiked === false) {
      await axios.post(
        `/products/${itemId}/favorite`,
        {
          favoriteCount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFavoriteCount((prevCount) => prevCount + 1);
      console.log("좋아요 활성화");
    } else {
      await axios.delete(`/products/${itemId}/favorite`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFavoriteCount((prevCount) => prevCount - 1);
      console.log("좋아요 해제");
    }
  };

  async function getProductId() {
    const response = await axios.get(`/products/${itemId}`);
    const product = response.data;
    setItem(product);
    setFavoriteCount(product.favoriteCount); //초기 좋아요 수 설정

    const res = await axios.get("/users/me/favorites", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 사용자의 좋아요 리스트에서 현재 상품 ID가 있는지 확인
    const isProductLiked = res.data.list.some(
      (favorite) => favorite.id === parseInt(itemId)
    );
    setIsLiked(isProductLiked); // 좋아요 상태 설정
  }

  useEffect(() => {
    getProductId();
  }, [itemId]);

  const isValidImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.itemBox}>
          <img
            className={style.itemImg}
            src={
              item.images && isValidImageUrl(item.images)
                ? item.images
                : defaultImg
            }
            alt={item.name}
          />
          <div className={style.itemContent}>
            <div className={style.contentTop}>
              <div className={style.itemTitle}>
                <p className={style.itemName}>{item.name}</p>
                <img
                  src={kebab}
                  className={style.kebabBt}
                  onClick={() => toggleDropdown(item.id)}
                  alt="kebabBt"
                />
                {activeDropdown === item.id && (
                  <Dropdown
                    item={item}
                    handleDeleteItem={handleDeleteItem}
                    isOpen={activeDropdown}
                    toggleDropdown={toggleDropdown}
                  />
                )}
              </div>
              <p className={style.itemPrice}>{item.price}</p>
            </div>
            <div className={style.contentMid}>
              <p className={style.itemIntro}>상품소개</p>
              <p className={style.itemDescription}>{item.description}</p>
            </div>
            <p className={style.tagIntro}>상품 태그</p>
            <div className={style.tagBox}>
              {item && item.tags
                ? item.tags.map((tag, index) => (
                    <p key={index} className={style.itemtags}>
                      #{tag}
                    </p>
                  ))
                : null}
            </div>
            <div className={style.ownerTable}>
              <div className={style.ownerInfoTable}>
                <img
                  className={style.avatar}
                  src={avatarImg}
                  alt={item.ownerNicname}
                />
                <div className={style.ownerInfo}>
                  <p className={style.userNickname}>{item.ownerNickname}</p>
                  <p className={style.date}>
                    {formatDate(new Date(item.createdAt))}
                  </p>
                </div>
              </div>
              <div className={style.favoriteTable}>
                <div className={style.countTable}>
                  <img
                    className={style.heartImg}
                    src={isLiked ? fullHeart : emptyHeart}
                    alt="favorite"
                    onClick={handleClickFavoriteToggle}
                  />
                  <p className={style.favorite}>{favoriteCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Comments
          itemId={itemId}
          toggleDropdown={toggleDropdown}
          activeDropdown={activeDropdown}
        />
        <div className={style.comebackTable}>
          <Link to={"/items"}>
            <div className={style.comeBackButton}>
              <p className={style.comeBackFont}>목록으로 돌아가기</p>
              <img src={backHome} alt="comebackhome" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default ItemDetailPage;

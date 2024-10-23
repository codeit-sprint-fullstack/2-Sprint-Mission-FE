import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Article.module.css';
import axios from '@/lib/axios';
import ArticleCommentAdd from '@/components/ArticleDetail/ArticleCommentAdd';
import ArticleCommentList from '@/components/ArticleDetail/ArticleCommentList';
import formatDate from '@/lib/formatDate';
import Dropdown from '@/components/ArticleDetail/Dropdown';

export default function Article() {
  const [article, setArticle] = useState();
  const [articleComments, setArticleComments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();
  const id = router.query['id'];

  async function loadArticle(targetId) {
    const res = await axios.get(`/articles/${targetId}`);
    const article = res.data;
    setArticle(article);
  }

  async function loadArticleCommnets(targetId) {
    const res = await axios.get(`/articles/${targetId}/comments`);
    const articleComments = res.data ?? [];
    setArticleComments(articleComments);
  }

  useEffect(() => {
    if (id) {
      loadArticle(id);
      loadArticleCommnets(id);
    }
  }, [id]);

  if (!article) return null;

  const handleBackList = () => router.push('/');
  const handleMenuClick = () => setDropdownOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <div className={styles.article}>
        <div className={styles[`article-header`]}>
          <div className={styles[`article-title`]}>
            <h1>{article.title}</h1>
            <div className={styles.menu}>
              <Image
                src="/images/ic_kebab.png"
                width={24}
                height={24}
                onClick={() => handleMenuClick(!dropdownOpen)}
                alt="메뉴 아이콘"
              />
              {dropdownOpen && (
                <div ref={dropdownRef} className={styles.dropdown}>
                  <Dropdown />
                </div>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles[`user-info`]}>
              <Image
                src="/images/size=large.png"
                width={40}
                height={40}
                alt="유저 아이콘"
              />
              <p>판매왕 판다</p>
              <p>{formatDate(article.createdAt)}</p>
            </div>
            <div className={styles[`like-wrap`]}>
              <div className={styles.like}>
                <Image
                  src="/images/ic_heart.png"
                  width={32}
                  height={32}
                  alt="좋아요 아이콘"
                />
                <p>+9999</p>
              </div>
            </div>
          </div>
        </div>
        <p>{article.content}</p>
      </div>
      <ArticleCommentAdd id={id} />
      <ArticleCommentList articleComments={articleComments} />
      <button className={styles[`back-list`]} onClick={handleBackList}>
        목록으로 돌아가기
        <Image
          src="/images/ic_back.png"
          width={24}
          height={24}
          alt="목록 아이콘"
        />
      </button>
    </div>
  );
}

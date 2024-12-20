import styles from './ArticleList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '@/lib/utils/formatDate';
import { ArticleType } from '@/types/type';

export default function ArticleList({ articles }: { articles: ArticleType[] }) {
  return (
    <>
      <ul className={styles[`article-list`]}>
        {articles.map((article) => (
          <li className={styles.container} key={article.id}>
            <Link href={`/articles/${article.id}`}>
              <div className={styles.title}>
                <h1>{article.title}</h1>
                <div className={styles.image}>
                  <Image
                    src={article.image || '/images/Property 1=md-1.png'}
                    width={48}
                    height={48}
                    alt="상품 이미지(디폴트)"
                  />
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles[`user-info`]}>
                  <Image
                    src="/images/size=large.png"
                    width={24}
                    height={24}
                    alt="유저 프로필"
                  />
                  <p>{article.writer.nickname}</p>
                  <p>{formatDate(article.createdAt)}</p>
                </div>
                <div className={styles.like}>
                  <Image
                    src="/images/ic_heart.png"
                    width={24}
                    height={24}
                    alt="좋아요"
                  />
                  <p>{article.likeCount}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

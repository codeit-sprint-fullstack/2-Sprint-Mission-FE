import styles from './ArticleInfo.module.css';
import Image from 'next/image';
import { deleteArticle } from '@/lib/api/ArticleService';
import { useRouter } from 'next/router';
import Dropdown from '@/components/Common/Dropdown';

export default function ArticleInfo({ article }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm('삭제하시겠습니까?');
    if (confirmed) {
      try {
        await deleteArticle(article.id);
        router.push('/articles');
      } catch (error) {
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleEdit = () => {
    router.push(`/articles/edit?id=${article.id}`);
  };

  const handleDropdownChange = (name, value) => {
    if (value === 'edit') handleEdit();
    if (value === 'delete') handleDelete();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>
      
      <div className={styles.articleInfo}>
        <div className={styles.writerInfo}>
          <div className={styles.nicknameWrapper}>
            <div className={styles.profileIcon}>
              <Image
                src="/images/user_profile.png"
                alt="프로필 이미지"
                fill
                sizes="4rem"
                className={styles.profileImage}
              />
            </div>
            <span className={styles.nickname}>{article.author || '익명'}</span>
            <span className={styles.date}>{article.formattedDate}</span>
          </div>
        </div>

        <div className={styles.likesWrapper}>
          <div className={styles.likesIcon}>
            <Image
              src="/images/articles/ic_heart.svg"
              alt="좋아요 아이콘"
              fill
              sizes="3.2rem"
              className={styles.heartImage}
            />
          </div>
          <span className={styles.likesCount}>{article.likes > 9999 ? '9999+' : article.likes}</span>
        </div>

        {/* 드롭다운 메뉴 */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            name="articleOptions"
            iconMode={true}
            options={[
              { label: '수정하기', value: 'edit' },
              { label: '삭제하기', value: 'delete' },
            ]}
            value="" // 기본 선택 없음
            onChange={handleDropdownChange}
            className={styles.dropdownToggle}
          />
        </div>
      </div>
      <div className={styles.content}>{article.content}</div>
    </div>
  );
}

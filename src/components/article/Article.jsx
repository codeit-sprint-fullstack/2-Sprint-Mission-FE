/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

const style = {
  article: css`
    height: 13.8rem;
    background-color: #fcfcfc;
    border-bottom: 1px solid var(--gray-200);

    .content {
      margin-bottom: 1.6rem;
      display: flex;
      justify-content: space-between;

      p {
        font-size: 2rem;
        line-height: 3.2rem;
        font-weight: 600;
        color: var(--gray-800);
      }
    }

    .info {
      margin-bottom: 2.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > div {
        display: flex;
        align-items: center;
      }

      span {
        margin-left: 0.8rem;
      }
    }
  `,
  BestArticle: css`
    width: 38.4rem;
    height: 16.9rem;
    background-color: var(--gray-50);
    padding: 0 2.4rem;

    .best {
      display: flex;
      justify-content: center;
      align-items: center;

      color: white;
      font-size: 1.6rem;
      line-height: 2.6rem;
      font-weight: 600;
      text-align: center;

      width: 10.2rem;
      padding: 0.2rem 2.4rem;
      border-bottom-right-radius: 16px;
      border-bottom-left-radius: 16px;
      background-color: var(--Primary-100);

      span {
        margin-left: 0.5rem;
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 1.6rem;
      margin-bottom: 1.8rem;

      p {
        width: 25.6rem;

        color: var(--gray-800);
        font-size: 2rem;
        line-height: 3.2rem;
        font-weight: 600;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;

      .nickname {
        margin-right: 0.8rem;
      }

      .heart {
        margin-left: 0.4rem;
      }
    }
  `,
};

export default function Article({ item, best = false }) {
  const createdDate = new Date(item.createdAt);

  return best ? (
    <div className="article" css={style.BestArticle}>
      <div className="best">
        <Image src="/Image/ic_medal.png" alt="medal" width={16} height={16} />
        <span>Best</span>
      </div>
      <div className="content">
        <p>{item.title}</p>
        <Image src="/Image/img_article_default.png" alt="default image" width={72} height={72} />
      </div>
      <div className="info">
        <div>
          <span className="nickname">{item.owner.nickname}</span>
          <Image src="/Image/ic_heart.png" alt="favorite heart" width={16} height={16} />
          <span className="heart">{item.likeCount}</span>
        </div>
        <div>
          <p className="date">{`${createdDate.getFullYear()}. ${createdDate.getMonth()}. ${createdDate.getDate()}`}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="article" css={style.article}>
      <div className="content">
        <p>{item.title}</p>
        <Image src="/Image/img_article_default.png" alt="default image" width={72} height={72} />
      </div>
      <div className="info">
        <div>
          <Image src="/Image/ic_profile.png" alt="profile image" width={24} height={24} />
          <span className="nickname">{item.owner.nickname}</span>
          <span className="date">{`${createdDate.getFullYear()}. ${createdDate.getMonth()}. ${createdDate.getDate()}`}</span>
        </div>
        <div>
          <Image src="/Image/ic_heart.png" alt="favorite heart" width={16} height={16} />
          <span className="heart">{item.likeCount}</span>
        </div>
      </div>
    </div>
  );
}

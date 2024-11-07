/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Comment from '@components/Comment';
import DropdownMenu from '@components/DropdownMenu';
import Input from '@components/Input';
import TagButton from '@components/product/TagButton';
import DropdownProvider, { useDropdown } from '@contexts/DropdownProvider';
import c from '@utils/constants';

const style = {
  itemDetailPost: css`
    margin-top: 2.9rem;
    display: flex;
    gap: 2.4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--gray-200);

    #itemDetail {
      flex-grow: 1;

      #itemDetailContent {
        margin-top: 2.4rem;
      }

      #itemDetailTag {
        margin-top: 2.4rem;
      }

      #itemDetailInfo {
        margin-top: 6.2rem;
      }
    }
  `,
  itemDetailTitle: css`
    height: 11.2rem;
    border-bottom: 1px solid var(--gray-200);

    .title-and-button {
      display: flex;
      justify-content: space-between;

      > h1 {
        font-size: 2.4rem;
        line-height: 3.2rem;
        font-weight: 600;
        color: var(--gray-800);
      }
    }

    .price {
      margin-top: 1.6rem;

      font-size: 4rem;
      line-height: 4.773rem;
      color: var(--gray-800);
      font-weight: 600;
    }
  `,
  itemDetailContent: css`
    h2 {
      font-size: 1.6rem;
      line-height: 2.6rem;
      font-weight: 600;
      color: var(--gray-600);
    }

    pre {
      margin-top: 1.6rem;

      font-size: 1.6rem;
      line-height: 2.6rem;
      font-weight: 400;
      color: var(--gray-600);
    }
  `,
  itemDetailTag: css`
    p {
      font-size: 1.6rem;
      line-height: 2.6rem;
      font-weight: 600;
      color: var(--gray-600);
    }

    .tags {
      margin-top: 1.6rem;

      display: flex;
      gap: 0.8rem;
    }
  `,
  itemDetailInfo: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.6rem;

    .owner-info {
      flex-grow: 1;

      display: inline-block;
      margin-left: 0.8rem;

      > span {
        display: block;
        font-size: 1.2rem;
        line-height: 1.8rem;
        font-weight: 400;

        &.nickname {
          color: var(--gray-600);
        }

        &.time {
          margin-top: 0.4rem;
          color: var(--gray-400);
        }
      }
    }

    button {
      padding: 0.4rem 1.2rem;
      border: 1px solid var(--gray-200);
      border-radius: 35px;
      display: flex;
      align-items: center;
    }
  `,
  comments: css`
    margin-top: 4rem;

    #commentsForm {
      button {
        display: block;
        margin-left: auto;

        padding: 1.2rem 2.3rem;
        border-radius: 8px;

        color: var(--gray-100);
        font-size: 1.6rem;
        line-height: 2.6rem;
        font-weight: 600;
      }
    }

    #commentsList {
      margin-top: 4rem;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      #noComment {
        margin: 0 auto;
      }
    }
  `,
  returnButton: css`
    margin-top: 6.4rem;
    margin-bottom: 17.3rem;

    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 1.2rem 6.4rem;
      border-radius: 40px;

      font-size: 1.8rem;
      line-height: 2.6rem;
      font-weight: 600;

      img {
        margin-left: 0.8rem;
      }
    }
  `,
};

function ModifyButton() {
  const { dropdownOpen, setDropdownOpen } = useDropdown();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="modify-button" onClick={toggleDropdown}>
      <Image src="/Image/ic_kebab.png" alt="kebab button" width={24} height={24} />
    </div>
  );
}

const content = `액정에 잔기스랑 주변부 스크래치있습니다만 예민하신분아니면 전혀 신경쓰이지않을정도입니다. 
박스 보관중입니다.
메모용과 넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나 문제점을 못느꼈네요 잘 안써서 싸게넘깁니다!
택배거래안합니다.`;
const comment = {
  id: 'test',
  content: '혹시 사용기간이 어떻게 되실까요?',
  owner: {
    nickname: '똑똑한판다',
  },
  createdAt: '2024-10-27T09:25:28.145Z',
};

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleDropdownClick = modify => {
    switch (modify) {
      case c.MODIFY.EDIT:
        // router.push('/articles/post');
        break;
      case c.MODIFY.DELETE:
    }
  };

  return (
    <div id="itemDetailPage">
      <div id="itemDetailPost" css={style.itemDetailPost}>
        <div id="itemImage">
          <Image src="/Image/img_product_default.png" alt="default image" width={486} height={486} />
        </div>
        <div id="itemDetail">
          <div id="itemDetailTitle" css={style.itemDetailTitle}>
            <div className="title-and-button">
              <h1>아이패드 미니 팔아요</h1>
              <DropdownProvider>
                <DropdownMenu
                  DropdownButton={<ModifyButton />}
                  list={c.MODIFY}
                  dictionary={c.MODIFY_MSG}
                  onClick={handleDropdownClick}
                />
              </DropdownProvider>
            </div>
            <div className="price">500,000원</div>
          </div>
          <div id="itemDetailContent" css={style.itemDetailContent}>
            <h2>상품 소개</h2>
            <pre>{content}</pre>
          </div>
          <div id="itemDetailTag" css={style.itemDetailTag}>
            <p>상품 태그</p>
            <div className="tags">
              <TagButton name={'아이패드미니'} />
              <TagButton name={'애플'} />
              <TagButton name={'가성비'} />
            </div>
          </div>
          <div id="itemDetailInfo" css={style.itemDetailInfo}>
            <Image src="/Image/ic_profile.png" alt="profile img" width={40} height={40} />
            <div className="owner-info">
              <span className="nickname">{'총명한판다'}</span>
              <span className="time">{`2024. 01. 02`}</span>
            </div>
            <button type="button">
              <img src="/Image/ic_heart.png" alt="heart" width={32} height={32} />
              <span>{123}</span>
            </button>
          </div>
        </div>
      </div>
      <div id="comments" css={style.comments}>
        <form id="commentsForm">
          <Input
            inputObj={''}
            label={'문의하기'}
            placeholder={`개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.`}
            onChange={''}
            textarea
            comment
          />
          <button type="button" className="button" disabled={true} onClick={''}>
            등록
          </button>
        </form>

        <div id="commentsList">
          {/* {comments.length === 0 && (
            <Image id="noComment" src="/Image/Img_inquiry_empty.png" alt="no inquiry Image" width={196} height={230} />
          )} */}
          {/* {comments.map(comment => (
            <DropdownProvider key={comment.id}>
              <Comment item={comment} ModifyButton={<ModifyButton />} key={comment.id} />
            </DropdownProvider>
          ))} */}
          <DropdownProvider>
            <Comment item={comment} ModifyButton={<ModifyButton />} />
          </DropdownProvider>
          <DropdownProvider>
            <Comment item={comment} ModifyButton={<ModifyButton />} />
          </DropdownProvider>
          <DropdownProvider>
            <Comment item={comment} ModifyButton={<ModifyButton />} />
          </DropdownProvider>
        </div>
      </div>
      <div id="returnButton" css={style.returnButton}>
        <Link href="/items">
          <button type="button" className="button">
            목록으로 돌아가기
            <Image src="/Image/ic_back.png" alt="return Image" width={24} height={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}

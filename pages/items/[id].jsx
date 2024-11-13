/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Comment from '@components/Comment';
import DeleteModal from '@components/DeleteModal';
import DropdownMenu from '@components/DropdownMenu';
import Input from '@components/Input';
import TagButton from '@components/product/TagButton';
import { useAuth } from '@contexts/AuthProvider';
import DropdownProvider, { useDropdown } from '@contexts/DropdownProvider';
import useOwnMutation from '@hooks/useOwnMutation';
import useOwnQuery from '@hooks/useOwnQuery';
import {
  deleteProduct,
  deleteProductFavorite,
  getCommentsOfProduct,
  getProductDetail,
  postCommentOfProduct,
  postProductFavorite,
} from '@utils/api';
import c from '@utils/constants';
import { toDateString, toPriceString } from '@utils/utils';

const style = {
  itemDetailPost: css`
    margin-top: 2.9rem;
    display: flex;
    gap: 2.4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--gray-200);

    #itemDetail {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      #itemDetailContent {
        flex-grow: 1;
      }

      #itemDetailInfo {
        margin-top: ${6.2 - 2.4}rem;
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

      span {
        margin-left: 0.5rem;
      }
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

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user, tokenExpireCheck } = useAuth(true);
  const [item, setItem] = useState({});
  const [comments, setComments] = useState([]);
  const [commentObj, setCommentObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'comment', type: 'text' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getProductDetailQuery = useOwnQuery({
    queryFn: _ => getProductDetail(id),
    queryKey: ['product', id],
    onSuccess: result => setItem(result),
  });
  const getCommentsOfProductQuery = useOwnQuery({
    queryFn: _ => getCommentsOfProduct(id, { limit: 5 }),
    queryKey: ['comments', id],
    onSuccess: result => setComments(result.list),
  });
  const postCommentOfProductMutation = useOwnMutation({
    mutationFn: data => postCommentOfProduct(id, data),
    invalidQueryKey: ['comments', id],
  });
  const deleteProductMutation = useOwnMutation({ mutationFn: _ => deleteProduct(id), onSuccess: () => router.push('/items') });
  const postProductFavoritetMutation = useOwnMutation({
    mutationFn: _ => postProductFavorite(id),
    invalidQueryKey: ['product', id],
  });
  const deleteProductFavoriteMutation = useOwnMutation({
    mutationFn: _ => deleteProductFavorite(id),
    invalidQueryKey: ['product', id],
  });

  const handleDropdownClick = modify => {
    switch (modify) {
      case c.MODIFY.EDIT:
        router.push(`/items/registration/${id}`);
        break;
      case c.MODIFY.DELETE:
        setDeleteModalOpen(true);
    }
  };
  const handleDeleteItem = async () => {
    deleteProductMutation.mutate();
  };
  const handleFavorite = async () => {
    if (item.isFavorite) deleteProductFavoriteMutation.mutate();
    else postProductFavoritetMutation.mutate();
  };
  const handlePostComments = async () => {
    if (!tokenExpireCheck()) router.push('/items');
    postCommentOfProductMutation.mutate({ content: commentObj.value.trim() });
  };

  return (
    <div id="itemDetailPage">
      <DeleteModal isOpen={deleteModalOpen} onConfirmClick={handleDeleteItem} onCancelClick={() => setDeleteModalOpen(false)} />
      <div id="itemDetailPost" css={style.itemDetailPost}>
        <div id="itemImage">
          <Image
            src={item?.images?.length > 0 ? item.images[0] : '/Image/img_product_default.png'}
            alt="default image"
            width={486}
            height={486}
            priority
          />
        </div>
        <div id="itemDetail">
          <div id="itemDetailTitle" css={style.itemDetailTitle}>
            <div className="title-and-button">
              <h1>{item?.name}</h1>
              <DropdownProvider>
                <DropdownMenu
                  DropdownButton={<ModifyButton />}
                  list={c.MODIFY}
                  dictionary={c.MODIFY_MSG}
                  onClick={handleDropdownClick}
                />
              </DropdownProvider>
            </div>
            <div className="price">{toPriceString(item?.price)}원</div>
          </div>
          <div id="itemDetailContent" css={style.itemDetailContent}>
            <h2>상품 소개</h2>
            <pre>{item?.description}</pre>
          </div>
          <div id="itemDetailTag" css={style.itemDetailTag}>
            <p>상품 태그</p>
            <div className="tags">
              {item?.tags?.map(tag => (
                <TagButton name={tag} key={tag} />
              ))}
            </div>
          </div>
          <div id="itemDetailInfo" css={style.itemDetailInfo}>
            <Image src="/Image/ic_profile.png" alt="profile img" width={40} height={40} />
            <div className="owner-info">
              <span className="nickname">{item?.ownerNickname}</span>
              <span className="time">{toDateString(item?.createdAt)}</span>
            </div>
            <button type="button" onClick={handleFavorite}>
              <img src="/Image/ic_heart.png" alt="heart" width={32} height={32} />
              <span>{item?.likeCount}</span>
            </button>
          </div>
        </div>
      </div>
      <div id="comments" css={style.comments}>
        <form id="commentsForm">
          <Input
            inputObj={commentObj}
            label={'문의하기'}
            placeholder={`개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.`}
            onChange={setCommentObj}
            textarea
            comment
          />
          <button type="button" className="button" disabled={!commentObj.value.trim()} onClick={handlePostComments}>
            등록
          </button>
        </form>

        <div id="commentsList">
          {comments.length === 0 && (
            <Image id="noComment" src="/Image/Img_inquiry_empty.png" alt="no inquiry Image" width={196} height={230} />
          )}
          {comments.map(comment => (
            <DropdownProvider key={comment.id}>
              <Comment item={comment} parentId={id} ModifyButton={<ModifyButton />} key={comment.id} />
            </DropdownProvider>
          ))}
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

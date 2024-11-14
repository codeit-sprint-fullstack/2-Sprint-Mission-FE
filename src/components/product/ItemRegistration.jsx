/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Input from '@components/Input';
import TagButton from '@components/product/TagButton';
import { useAuth } from '@contexts/AuthProvider';
import useOwnMutation from '@hooks/useOwnMutation';
import useOwnQuery from '@hooks/useOwnQuery';
import useValidation from '@hooks/useValidation';
import { getOneUser, getProductDetail, patchProduct, postProduct } from '@utils/api';
import c from '@utils/constants';

const style = {
  registrationPage: css`
    padding-top: 2.6rem;
    padding-bottom: 16.2rem;

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      margin: 1.8rem auto 19.4rem auto;
      height: 80.6rem;
      padding: 0 2.4rem;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      margin: 2.4rem auto 18.6rem auto;
      padding: 0 1.6rem;
    }
  `,
  title: css`
    display: flex;
    justify-content: space-between;
    height: 4.2rem;

    margin-bottom: 2.4rem;

    p {
      font-weight: 700;
      font-size: 2rem;
      line-height: 3.2rem;
      color: var(--gray-800);
    }
  `,
  registButton: css`
    padding: 1.2rem 2.3rem;
    border-radius: 8px;

    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: var(--gray-100);
  `,
  info: css`
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      gap: 2.4rem;
    }
  `,
  tagButtonWrap: css`
    margin-top: 1.4rem;
  `,
};

export default function ItemRegistration({ productId }) {
  const { user, tokenExpireCheck } = useAuth(true);
  const validation = useValidation();
  const router = useRouter();
  const userId = useRef('');
  const [nameObj, setNameObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'name', type: 'text' });
  const [descriptionObj, setDescriptionObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'description', type: 'text' });
  const [priceObj, setPriceObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'price', type: 'number' });
  const [tagObj, setTagObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'tag', type: 'text' });
  const [fileObj, setFileObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'image', type: 'file' });
  const [fileurl, setFileurl] = useState('');
  const [tags, setTags] = useState([]);
  const [validationCheck, setValidationCheck] = useState(
    productId ? { name: true, description: true, price: true, tag: true } : {},
  );
  const [canSubmit, setCanSubmit] = useState(false);
  const isFirstVisit = useRef(true);

  const getOneUserQuery = useOwnQuery({
    queryFn: _ => getOneUser(),
    queryKey: ['randomUserId'],
    onSuccess: result => (userId.current = result.list[0].id),
  });
  const getProductDetailQuery = useOwnQuery({
    queryFn: _ => getProductDetail(productId),
    queryKey: ['product', productId],
    onSuccess: result => {
      setNameObj(old => ({ ...old, value: result.name }));
      setDescriptionObj(old => ({ ...old, value: result.description }));
      setPriceObj(old => ({ ...old, value: result.price }));
      setTags(result.tags);
    },
  });
  const postProductMutation = useOwnMutation({
    mutationFn: data => postProduct(data),
    onSuccess: result => {
      console.log(result);
      router.push(`/items/${result.id}`);
    },
  });
  const patchProductMutation = useOwnMutation({
    mutationFn: data => patchProduct(productId, data),
    invalidQueryKey: ['product', productId],
    onSuccess: result => router.push(`/items/${result.id}`),
  });

  const handleValidation = inputObj => {
    const { name, value } = inputObj;

    // NOTE Validation
    const errMsg = validation(name, value.trim());

    // NOTE count validation
    setValidationCheck(old => ({ ...old, [name]: true }));

    // NOTE Set input Ojbect
    let setInputObj = null;
    switch (name) {
      case 'name':
        setInputObj = setNameObj;
        break;
      case 'description':
        setInputObj = setDescriptionObj;
        break;
      case 'price':
        setInputObj = setPriceObj;
        break;
      case 'tag':
        setInputObj = setTagObj;
        break;
    }
    setInputObj(old => ({ ...old, errMsg, value: value.trim() }));

    // NOTE errMsg가 없음 = validation을 통과함.
    return !errMsg;
  };
  const handleAddTag = (e, inputObj, setInputValue) => {
    if (e.key === 'Enter') {
      const { value } = inputObj;
      if (!value.trim()) return setTagObj(old => ({ ...old, errMsg: '빈 문자만 입력할 수 없습니다.' }));
      if (tags.length >= 5) return setTagObj(old => ({ ...old, errMsg: '태그는 5개까지 입력 가능합니다.' }));
      if (tags.includes(value)) return setTagObj(old => ({ ...old, errMsg: '같은 태그가 존재합니다' }));
      if (!handleValidation(inputObj)) return null;

      setTags(old => [...old, value]);
      setTagObj(old => ({ ...old, value: '' }));
      setInputValue('');
    }
  };
  const handleRemoveTag = name => {
    const idx = tags.findIndex(t => t === name);
    const newTags = [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    setTags(newTags);
  };
  const handleChnageImage = e => {
    const fileArray = Array.from(e.target.files);
    const file = fileArray[0];
    setFileObj(old => ({ ...old, value: file }));
    setFileurl(URL.createObjectURL(file));
  };
  const handleSubmit = async () => {
    if (!tokenExpireCheck()) router.push('/items');
    const formData = new FormData();
    formData.append('file', fileObj.value);

    const data = {
      name: nameObj.value,
      description: descriptionObj.value,
      price: parseInt(priceObj.value),
      tags,
      ownerId: userId.current,
    };
    formData.append('data', JSON.stringify(data));

    productId ? patchProductMutation.mutate(formData) : postProductMutation.mutate(formData);
  };

  useEffect(() => {
    if (isFirstVisit.current) {
      isFirstVisit.current = false;
      if (!productId) return setCanSubmit(false);
      return setCanSubmit(true);
    }

    // NOTE 4개 항목의 최초 Validation이 진행되지 않았을 경우, false를 리턴.
    if (Object.keys(validationCheck).length !== 4) return setCanSubmit(false);

    // NOTE validation을 통과했는가? + 태그가 1개 이상인가?
    const isOk = !(nameObj.errMsg || descriptionObj.errMsg || priceObj.errMsg || tagObj.errMsg) && tags.length > 0;

    return setCanSubmit(isOk);
  }, [nameObj.errMsg, descriptionObj.errMsg, priceObj.errMsg, tagObj.errMsg, tags, validationCheck]);

  if (!user) return null;
  return (
    <div id="registration" css={style.registrationPage}>
      <form>
        <div css={style.title}>
          <p>상품 등록하기</p>
          <button css={style.registButton} className="button" type="button" onClick={handleSubmit} disabled={!canSubmit}>
            등록
          </button>
        </div>

        <div css={style.info}>
          <Input inputObj={nameObj} label={'상품명'} placeholder={'상품명을 입력해주세요'} onChange={handleValidation} />
          <Input
            inputObj={descriptionObj}
            label={'상품 소개'}
            placeholder={'상품 소개를 입력해주세요'}
            onChange={handleValidation}
            textarea
          />
          <Input inputObj={priceObj} label={'판매가격'} placeholder={'판매 가격을 입력해주세요'} onChange={handleValidation} />
          <Input
            inputObj={tagObj}
            label={'태그'}
            placeholder={'태그를 입력해주세요'}
            onChange={handleValidation}
            onKeyDown={handleAddTag}
          />
          <div className="tag-button-wrap" css={style.tagButtonWrap}>
            {tags.map(tag => (
              <TagButton name={tag} key={tag} onClick={handleRemoveTag} />
            ))}
          </div>
          <div className="files">
            <img src={fileurl} alt="" />
            <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onChange={handleChnageImage} multiple={false} />
          </div>
        </div>
      </form>
    </div>
  );
}

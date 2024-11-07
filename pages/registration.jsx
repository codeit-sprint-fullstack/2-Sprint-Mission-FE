/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import TagButton from '@/src/components/product/TagButton.jsx';
import useValidation from '@/src/hooks/useValidation.js';
import c from '@/src/utils/constants.js';
import Input from '@/src/components/Input';

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

export default function RegistrationPage() {
  const validation = useValidation();
  const [nameObj, setNameObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'name', type: 'text' });
  const [descriptionObj, setDescriptionObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'description', type: 'text' });
  const [priceObj, setPriceObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'price', type: 'number' });
  const [tagObj, setTagObj] = useState({ ...c.EMPTY_INPUT_OBJ, name: 'tag', type: 'text' });
  const [tags, setTags] = useState([]);
  const [validationCheck, setValidationCheck] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const handleValidation = inputObj => {
    const { name, value } = inputObj;

    // NOTE Validation
    const errMsg = validation(name, value);

    // NOTE count validation
    setValidationCheck(prev => {
      return { ...prev, [name]: true };
    });

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
    setInputObj(prev => {
      return { ...prev, errMsg, value };
    });

    // NOTE errMsg가 없음 = validation을 통과함.
    return !errMsg;
  };
  const handleAddTag = (e, inputObj) => {
    if (e.key === 'Enter') {
      const { value } = inputObj;
      if (tags.length >= 5)
        return setTagObj(prev => {
          return { ...prev, errMsg: '태그는 5개까지 입력 가능합니다.' };
        });
      if (tags.includes(value))
        return setTagObj(prev => {
          return { ...prev, errMsg: '같은 태그가 존재합니다' };
        });
      if (!handleValidation(e)) return;

      setTags(prev => [...prev, value]);
    }
  };
  const handleRemoveTag = name => {
    const idx = tags.findIndex(t => t === name);
    const newTags = [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    setTags(newTags);
  };

  useEffect(() => {
    // NOTE 4개 항목의 최초 Validation이 진행되지 않았을 경우, false를 리턴.
    if (Object.keys(validationCheck).length !== 4) return setCanSubmit(false);

    // NOTE validation 통과 여부
    const isOk = !(nameObj.errMsg || descriptionObj.errMsg || priceObj.errMsg || tagObj.errMsg);

    // NOTE validation을 통과했는가? + 태그가 1개 이상인가?
    return setCanSubmit(isOk && tags.length > 0);
  }, [nameObj.errMsg, descriptionObj.errMsg, priceObj.errMsg, tagObj.errMsg, validationCheck]);

  return (
    <div id="registration" css={style.registrationPage}>
      <form>
        <div css={style.title}>
          <p>상품 등록하기</p>
          <button css={style.registButton} className="button" type="button" disabled={!canSubmit}>
            등록
          </button>
        </div>

        <div css={style.info}>
          <Input inputObj={nameObj} label={'상품명'} placeholder={'상품명을 입력해주세요'} onBlur={handleValidation} />
          <Input
            inputObj={descriptionObj}
            label={'상품 소개'}
            placeholder={'상품 소개를 입력해주세요'}
            onBlur={handleValidation}
            textarea
          />
          <Input inputObj={priceObj} label={'판매가격'} placeholder={'판매 가격을 입력해주세요'} onBlur={handleValidation} />
          <Input
            inputObj={tagObj}
            label={'태그'}
            placeholder={'태그를 입력해주세요'}
            onBlur={handleValidation}
            onKeyDown={handleAddTag}
          />
          <div className="tag-button-wrap" css={style.tagButtonWrap}>
            {tags.map(tag => (
              <TagButton name={tag} key={tag} onClick={handleRemoveTag} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

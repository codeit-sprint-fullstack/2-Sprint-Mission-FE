import { useState } from 'react';

function useRegisterValidation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [tagError, setTagError] = useState('');
  
  const validateName = () => {
    if (name.length > 10) {
      setNameError('10자 이내로 입력해주세요');
    } else {
      setNameError('');
    }
  }
  
  const validateDescription = () => {
    if (description.length < 10) {
      setDescriptionError('10자 이상 입력해주세요');
    } else {
      setDescriptionError('');
    }
  }
  
  const validatePrice = () => {
    const value = Number(price);
    if (isNaN(value)) {
      setPriceError('숫자로 입력해주세요');
    } else {
      setPriceError('');
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      validateTag();
    }
  }

  const validateTag = () => {
    if (tag.length > 5) {
      setTagError('5글자 이내로 입력해주세요');
    } else {
      setTagError('');
      setTags(prevTags => [...prevTags, tag]);
      setTag('');
    }
  }
  
  const removeTag = tagIdx => {
    setTags(tags.filter((tag, idx) => idx !== tagIdx));
  }

  const isFormValid = () => {
    return name && description && price && !nameError && !descriptionError && !priceError && tags.length > 0;
  }

  return {
    name, setName, nameError, validateName, description, setDescription, descriptionError, validateDescription, price, setPrice, priceError, validatePrice, tag, tags, setTag, handleKeyUp, removeTag, tagError, isFormValid
  }
}

export default useRegisterValidation;
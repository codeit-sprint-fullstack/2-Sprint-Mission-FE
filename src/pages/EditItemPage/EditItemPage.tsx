import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import { getProduct, patchProduct } from "../../api/products";
import TextareaItem from "../../components/UI/TextareaItem";
import Button from "../../components/UI/Button";
import ImageUpload from "../../components/UI/ImageUpload";
import { ProductData } from "../../../types/products";

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;



function pickFormValues(product: ProductData): ProductData {
  const { name, description, price, images, tags } = product;
  const formValues = { name, description, price, images, tags };
  return formValues;
}

function EditItemPage() {
  const navigate = useNavigate();
  const { itemId: productId } = useParams<{ itemId: string }>();
  const { data } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(Number(productId)),
    enabled: !!productId,
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<ProductData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ProductData> = async (data) => {
    try {
      const result = await patchProduct(Number(productId), data);
      navigate(`/items/${result.id}`);
    } catch (error) {
      console.error("상품 수정 실패:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const formValue = pickFormValues(data);
      reset(formValue);
    }
  }, [data, reset]);

  if (!data) return null;

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleSection>
          <SectionTitle>상품 수정하기</SectionTitle>
          <Button type="submit" disabled={!isValid}>
            등록
          </Button>
        </TitleSection>

        <InputSection>
          {/* react-hook-form의 Controller를 사용해서 이미지 업로드 인풋을 활용하는 예시입니다. */}
          <Controller
            name="images"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUpload
                id="images"
                label="상품 이미지"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <InputItem
            id="name"
            label="상품명"
            placeholder="상품명을 입력해 주세요"
            error={errors.name?.message}
            register={register("name", {
              required: "",
              minLength: {
                value: 2,
                message: "2자 이상 10자 이내로 입력해주세요",
              },
              maxLength: {
                value: 10,
                message: "2자 이상 10자 이내로 입력해주세요",
              },
            })}
          />

          <TextareaItem
            id="description"
            label="상품 소개"
            error={errors.description?.message}
            placeholder="상품 소개를 입력해 주세요"
            register={register("description", {
              required: "",
              minLength: {
                value: 10,
                message: "10자 이상 입력해주세요.",
              },
            })}
          />

          <InputItem
            id="price"
            label="판매 가격"
            error={errors.price?.message}
            placeholder="판매 가격을 입력해 주세요"
            register={register("price", {
              validate: (v) => /^\d+$/.test(String(v)) || "숫자로 입력해 주세요.",
              valueAsNumber: true,
            })}
          />

          <Controller
            name="tags"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TagInput value={value} onChange={onChange} />
            )}
          />
        </InputSection>
      </form>
    </Container>
  );
}

export default EditItemPage;

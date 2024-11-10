import ProductInput from "./ProductInput";
import Header from "../Header";
import style from "@/src/styles/items/WriteProductForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import SignButton from "../signInUp/SignButton";
import { PRODUCT } from "@/src/variables/formValidation";
import { postProduct } from "@/src/api/productServices";

export default function WriteProductForm() {
  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isValid },
    watch
  } = formMethods;

  const handleLogInSubmit = async () => {
    const filterData = {
      price: watch("price"),
      description: watch("description"),
      name: watch("name")
    };
    console.log("Submitting login with data:", filterData);
    await postProduct(filterData);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className={style.container}
        onSubmit={handleSubmit(handleLogInSubmit)}
      >
        <div className={style.headerButton}>
          <Header>중고 상품 작성하기</Header>
          <SignButton status={isValid} type="submit">
            작성 완료
          </SignButton>
        </div>
        <ProductInput
          name="name"
          label="제품명"
          type="text"
          validations={PRODUCT.TITLE}
          placeholder="글 제목을 작성해주세요"
        />
        <ProductInput
          name="price"
          label="가격"
          type="text"
          validations={PRODUCT.PRICE}
          placeholder="가격을 입력해주세요"
        />
        <ProductInput
          name="description"
          label="제품 설명"
          type="text"
          validations={PRODUCT.CONTENT}
          placeholder="글 내용을 작성해주세요"
        />
      </form>
    </FormProvider>
  );
}

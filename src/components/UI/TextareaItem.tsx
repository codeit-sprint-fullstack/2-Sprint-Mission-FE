import styled from "styled-components";
import { inputStyle } from "./InputItem";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { TextareaItemProps } from "../../../types/components";

const Textarea = styled.textarea<{ $error?: boolean }>`
  ${inputStyle}
  height: 200px;
  resize: none;
`;

function TextareaItem({
  id,
  label,
  error,
  register = {},
  ...inputProps
}: TextareaItemProps) {
  return (<div>
    {label && <Label htmlFor={id}>{label}</Label>}
    <Textarea
      id={id}
      $error={!!error}
      {...inputProps}
      {...register}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
  )
}

export default TextareaItem;

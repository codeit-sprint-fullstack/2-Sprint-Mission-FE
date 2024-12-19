import styled from "styled-components";
import { inputStyle } from "./InputItem";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";


interface InputFieldProps {
  $error?: boolean;
  id: string;
}

interface TextareaItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  register?: any;
  placeholder: string;
}

const Textarea = styled.textarea<InputFieldProps>`
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

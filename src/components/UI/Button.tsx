import styled, { css } from "styled-components";
import { ReactComponent as Spinner } from "../../assets/images/ui/spinner.svg";
import { ButtonProps } from "../../../types/components";


export const buttonStyle = css<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.blue[0]};
  color: #ffffff;
  border-radius: ${({ $pill }) => ($pill ? "999px" : "8px")};
  padding: 14px 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[1]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.blue[2]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    cursor: default;
    pointer-events: none;
  }

  ${({ $appearance, theme }) =>
    $appearance === "secondary" &&
    css`
      background-color: ${theme.colors.white};
      border: 1px solid ${theme.colors.blue[0]};
      color: ${theme.colors.blue[0]};

      &:focus,
      &:hover,
      &:disabled {
        color: ${theme.colors.white};
      }
    `}
`;

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  $pill?: boolean;
  $appearance?: string;

}

function BaseButton({ isLoading, children, onClick, ...props }: BaseButtonProps) {
  return (
    <button onClick={onClick} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

const Button = styled(BaseButton) <ButtonProps>`
  ${buttonStyle}
`;

export default Button;

import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import { buttonStyle } from "./Button";
import { ButtonProps } from "../../../types/components";

const LinkButton = styled(Link) <ButtonProps>`
  ${buttonStyle}
`;

export default LinkButton;

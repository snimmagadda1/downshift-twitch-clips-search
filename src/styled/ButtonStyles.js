import styled from "styled-components";

const ButtonStyles = styled.button`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  svg {
    left: 0px;
    width: 30px;
    height: 30px;
    top: 0px;
    path {
      fill: ${(props) => (props.disabled ? "gray" : props.theme.purple)};
    }
  }

  &:disabled {
    background-color: #FAFAFA;
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

export { ButtonStyles };

import styled from "styled-components";

const VideoStyles = styled.div`
  position: relative;
  display: flex;

  .frame {
    background-color: ${(props) => props.theme.purple};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  img {
    width: 250px;
    height: 120px;
    z-index: 99;
  }

  &:hover img {
    transform: translate(5px, -7px);
  }
`;
const InputStyles = styled.div`
  display: flex;
  margin-top: 200px;
  input {
    background-color: ${(props) => props.theme.gray};
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: ${(props) => (props.collapsed ? "10px" : "0")};
    border-left: 10px solid ${(props) => props.theme.purple};
    outline: 0;
    font-family: inherit;
  }

  input:focus {
    outline: 0;
    background-color: #fff;
    border: 2px solid ${(props) => props.theme.purple};
    border-left: 10px solid ${(props) => props.theme.purple};
  }
  
`;

export { VideoStyles, InputStyles };

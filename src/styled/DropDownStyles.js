import styled from "styled-components";

const DropDown = styled.div`
  width: 100%;
  z-index: 2;
  background-color: ${(props) => props.theme.lightgrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  border-right: 1px solid ${(props) => props.theme.lightgrey};
  border-top: 1px solid
    ${(props) =>
      props.highlighted ? props.theme.purple : props.theme.lightgray};
  /* background: ${(props) => (props.highlighted ? "#f7f7f7" : "white")}; */
  padding: 0.5rem;
  background-color: #fff;
  display: flex;
  align-items: top;
  border-left: 10px solid;
  border-color: ${(props) =>
    props.highlighted ? props.theme.purple : props.theme.lightgray};
  transition: all 0.2s;
  border-bottom-left-radius: ${(props) => (props.last ? "10px" : "0px")};
  border-bottom-right-radius: ${(props) => (props.last ? "10px" : "0px")};
  margin-bottom: ${(props) => (props.last ? "20px" : "0px")};

  video {
    width: 175px;
    height: 175px;
    border-radius: 5px;
  }

  .info {
    padding: 20px;
    padding-top: 0px;
    max-width: 200px;
  }

  h4 {
    margin: 0;
    font-size: 20px;
  }

  small {
    font-size: 0.9rem;
    font-style: italic;
    color: black;
  }

  &:hover div img {
    transform: translate(7px, -7px);
  }

  & > img {
    transform: ${(props) =>
      props.highlighted ? "translate(7px, -7px)" : "translate(0, 0)"};
  }
`;

export { DropDown, DropDownItem };

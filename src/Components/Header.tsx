import styled from "@emotion/styled";

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Filterable countrylist</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderTitle = styled.h1`
  margin-left: 1vw;
  margin-top: 2.5vh;
`;

const HeaderContainer = styled.div`
  text-align: left;
  position: fixed;
  height: 9vh;
  width: 100vw;
  background-color: #f2f2f2;
  box-shadow: rgb(0 0 0 / 10%) 0px 6px 3px;
  z-index: 1;
`;

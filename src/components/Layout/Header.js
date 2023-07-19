import styled from "styled-components";

import CartButton from "./CartButton";
import pizzaHeader from '../../assets/app-header.jpg'
import Teaser from "./Teaser";

const Header = (props) => {
  return (
    <>
      <HeaderTeaser>
        <h1>Botanical</h1>

        <CartButton onClick={props.onShowModal}/>
      </HeaderTeaser>
      <MainImage>
        <img src={pizzaHeader} alt="Room full of plants"/>
      </MainImage>
      <Teaser />
    </>
  );
};

const HeaderTeaser = styled.header`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 5rem;
/* background-color: rgba(38, 92, 74, 0.8); */
background-color: #f9f9f9;
color: rgba(38, 92, 74, 1);;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 10%;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
z-index: 10;

& h1 {
  font-family: 'Amiri', serif;
  font-size: 3rem;
  font-weight: bolder;
}
`

const MainImage = styled.div`
position: relative;
width: 100%;
height: 25rem;
z-index: 0;
overflow: hidden;

& img {
    width: 100%;
  height: 100%;
  object-fit: cover;
}
`

export default Header;

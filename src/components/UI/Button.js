import styled from "styled-components";



const Button = styled.button`
font: inherit;
cursor: pointer;
background-color: ${props => (props.$bg ? 'grey' : '#4BB3FD')} ;
border: none;
color: white;
padding: 0.25rem 2rem;
font-weight: bold;


&:hover,
&:active {
background-color: ${props => (props.$bg ? '#a1a1a1' : '#357db1')} ; ;
}`

export default Button
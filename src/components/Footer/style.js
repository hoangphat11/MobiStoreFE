// import styled from "styled-components";

// export const WrapperFooter = styled.div`
//     height: 80px;
//     display: flex;
//     background-color:#2e3a47;
//     position: relative;
//     bottom: 0;
// `;
// // #79CCF2
// export const WrapperContentCopyright = styled.div`
//         width: fit-content;
//         height: 100%;
//         color: white;
//         font-weight: 600;
//         font-size: 17px;
//         align-content: center;
//         position: absolute;
//         left: 470px;

//         a {
//             text-decoration: none;
//         }
// `;

// export const WrapperLogos = styled.div`
//         align-items: center;
//         width: fit-content;
//         display: flex;
//         position: absolute;
//         right: 85px;
//         height: 100%;
//         //border:1px solid red;

//         span {
//             color: white;
//             font-size: 35px;
//             padding: 10px;
//             margin-right: 8px;
//             border-radius: 50%;
//             justify-content: space-around;

//             &:hover {
//                 color: rgb(138, 157, 163);
//                 cursor: pointer;
//             }
//         }
// `;

import styled from 'styled-components';

export const WrapperFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #1e1f2b;
  color: white;
  padding: 20px 60px;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterColumn = styled.div`
//  display: flex;
  flex-direction: column;
  gap: 15px;

`;

export const FooterTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const FooterText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const FooterMap = styled.div`
  iframe {
    border: 0;
    border-radius: 6px;
  }
`;

export const FooterIconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top:10px
  
`;

export const FooterSocials = styled.div`
  display: flex;
  gap: 10px;
  a {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
`;

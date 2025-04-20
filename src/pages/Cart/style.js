import { Col } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  padding: 100px 120px;
  width: 100%;
  background: #efefef
`;

// Styled left section
export const LeftSection = styled(Col)`
  height:fit-content;
  background: #ffffff;
  padding: 25px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;

// Styled right section
export const RightSection = styled(Col)`
  background: #ffffff;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  height: fit-content;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;

  &:last-child {
    font-weight: bold;
    font-size: 18px;
  }
`;

export const WrapperSteps = styled.div`
  margin-bottom: 15px;
`;

// for OrderRecentPage
export const WrapperHeading = styled.div`
  font-size: 22px;
  color: rgb(255, 57, 69);
  font-weight: 600;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
  text-transform:uppercase;
`;
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
`;

export const NotFound = () => {
  return (
    <Container>
      Not Found Page, <Link to="/">Go back to main page.</Link>
    </Container>
  );
};

import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  margin-bottom: 0.5rem;
`;

const Count = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

const FilteredPosts = ({ onChange, cards }) => (
  <Wrapper>
    <Input
      onChange={onChange}
      placeholder="Please enter your search query..."
    />
    <Count>{`${cards.length} ${cards.length === 1 ? "post" : "posts"}`}</Count>
  </Wrapper>
);

export default FilteredPosts;

import styled from "styled-components";
export const NavUnlisted = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--grad-1);
  margin: 0 0 -5px;
  padding: 1rem;
  flex-direction: row-reverse;
  justify-content: space-between;
  .active {
    border-bottom: 2px solid black;
  }
`;

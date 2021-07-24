import styled from "styled-components";

export const StyledWrapper = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 8px;
  position: relative;
  margin-bottom: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .delete-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    transform: translate(10px, -10px);
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }

  .card-row {
    display: flex;
    align-items: baseline;
    justify-content: center;

    p {
      margin-right: 4px;
    }
  }
`;

import styled from "styled-components";

export const StyledWrapper = styled.div`
  max-width: 700px;
  padding: 30px;
  height: calc(100vh - 220px);
  overflow: auto;

  .name-input {
    margin-bottom: 20px;
  }

  .add-project {
    margin: 15px 0;

    span {
      margin-right: 5px;
    }
  }

  margin-bottom: 60px;

  .buttons-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 10px;
    left: 0;

    .submit-buttons {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;

      button {
        background-color: #09e69c;
        color: white;
        border: 1px solid #07a36f;
        border-radius: 4px;
        padding: 10px 15px;
        cursor: pointer;
      }
    }

    .switch-button {
      align-self: flex-start;
      padding-left: 20px;
      padding-bottom: 10px;

      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: #0bd6d6;
      }
    }
  }
`;

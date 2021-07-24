import styled from "styled-components";

export const StyledWrapper = styled.div`
max-width: 600px;
padding: 30px;
  
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
    
    .submit-buttons {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }
    
    .switch-button {
      align-self: flex-start;
      padding-left: 20px;
      padding-bottom: 10px;
    }
  }
`;


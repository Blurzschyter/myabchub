import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
    to {
      transform: rotate(360deg);
    }
  `;

const LoadingNew = styled.div`
  width: 6rem;
  height: 6rem;
  border: 5px solid #829ab1;
  border-radius: 50%;
  border-top-color: #2cb1bc;
  animation: ${spinner} 2s linear infinite;
`;

export default LoadingNew;

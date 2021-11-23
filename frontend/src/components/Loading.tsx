import styled, { keyframes } from "styled-components";

const Loading = ({ disabled }: { disabled?: boolean }) => {
  return <LoadContainer>{!disabled && <Load />}</LoadContainer>;
};

const loading = keyframes`
    0% { margin-left: 0, width: 0 }
    10% { margin-left: 0; width: 20% }
    90% { margin-left: 80%; width: 20% }
    100% { margin-left: 100%; width: 0 } 

`;

const LoadContainer = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue2};
`;

const Load = styled.div`
  background-color: ${({ theme }) => theme.colors.blue1};
  width: 0;
  height: 100%;
  animation-name: ${loading};
  animation-duration: 1.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export default Loading;

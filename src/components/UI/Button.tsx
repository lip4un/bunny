import styled from 'styled-components';

const Button = styled.button<{ color?: string; bg?: string; rounded?: boolean }>`
  padding: 0.8em 1.5em;
  border: none;
  border-radius: ${({ rounded }) => (rounded ? '999px' : '8px')};
  background: ${({ bg }) => bg || '#222'};
  color: ${({ color }) => color || '#fff'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.2s;
  &:active {
    background: #333;
  }
`;

export default Button;

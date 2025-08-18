import styled from 'styled-components';

const BlurredImage = styled.div<{ src: string }>`
  width: 100%;
  height: 220px;
  background: url(${({ src }) => src}) center/cover no-repeat;
  filter: blur(12px) brightness(0.5);
  border-radius: 18px;
  margin-bottom: 1em;
`;

export default BlurredImage;

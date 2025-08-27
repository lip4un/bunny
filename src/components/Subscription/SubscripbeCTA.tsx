import React from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';

const CTAContainer = styled.div`
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: rgba(20,20,20,0.95);
  padding: 1.5em 1em 2em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.4);
`;

const Teaser = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 1em;
  border-radius: 16px;
  background: linear-gradient(90deg, #222 60%, #444 100%);
  filter: blur(4px);
`;

type Props = { onSubscribe: () => void };

const SubscribeCTA: React.FC<Props> = ({ onSubscribe }) => (
  <CTAContainer>
    <Button bg="#e74c3c" color="#fff" rounded style={{ fontSize: '1.1rem', width: '100%' }} onClick={onSubscribe}>
      Inscreva-se para ver novas postagens
    </Button>
    <Teaser />
  </CTAContainer>
);

export default SubscribeCTA;
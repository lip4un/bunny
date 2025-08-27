import React from 'react';
import styled from 'styled-components';
import OnlineDot from '../UI/OnlineDot';
import Button from '../UI/Button';
import StatButton from '../UI/StatButton';
//import BlurredImage from '../UI/blurredImage';
import SubscripbeCTA from '../Subscription/SubscripbeCTA';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getPhotosByModel, isSubscribed, subscribeToModel } from '../../utils/api';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 1.5em 1em 7em 1em;
  background: #111;
  min-height: 100vh;
  @media (max-width: 600px) {
    padding: 1.2em 0.2em 7em 0.2em;
  }
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src}) center/cover` : '#444'};
  margin: 0 auto 1em auto;
  border: 3px solid #222;
  box-shadow: 0 2px 12px #0008;
`;

const Bio = styled.p`
  color: #bbb;
  font-size: 1.05rem;
  text-align: center;
  margin-bottom: 1em;
`;

const InstagramBtn = styled(Button)`
  background: #e74c3c;
  color: #fff;
  width: 100%;
  margin-bottom: 1.2em;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.2em;
`;

const LockIcon = styled.img`
  display: block;
  margin: 2em auto 1em auto;
  width: 54px;
  opacity: 0.7;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5em 0 0.5em 0;
  gap: 1.2em;
`;

const Tab = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#fff' : '#888')};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  font-size: 1.1rem;
  border-bottom: ${({ active }) => (active ? '2px solid #e74c3c' : 'none')};
  padding-bottom: 0.3em;
  cursor: pointer;
`;

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [tab, setTab] = React.useState<'postagens' | 'midia' | 'chat'>('postagens');
  const [model, setModel] = React.useState<any>(null);
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
    setModel(users.find((u: any) => u.id === id));
    if (user) setSubscribed(isSubscribed(user.id, id!));
  }, [id, user]);

  if (!model) return <Container>Carregando...</Container>;

  const handleSubscribe = () => {
    if (user) {
      subscribeToModel(user.id, model.id);
      setSubscribed(true);
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <Container>
      <NameRow>
        {model.name}
        {model.online && <OnlineDot aria-label="Online" />}
      </NameRow>
      <Avatar src={model.avatar} aria-label="Foto de perfil" />
      <Bio>{model.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</Bio>
      {model.instagram && (
        <InstagramBtn as="a" href={model.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </InstagramBtn>
      )}
      <Row>
        <Button bg="#3498db" color="#fff" rounded style={{ marginRight: '1em' }}>
          Chat $1,99
        </Button>
        <StatButton>
          <span>{model.posts || 0}</span>
          Postagens
        </StatButton>
        <StatButton>
          <span>{model.media || 0}</span>
          Mídia
        </StatButton>
      </Row>
      <Tabs>
        <Tab active={tab === 'postagens'} onClick={() => setTab('postagens')}>Postagens</Tab>
        <Tab active={tab === 'midia'} onClick={() => setTab('midia')}>Mídia</Tab>
        <Tab active={tab === 'chat'} onClick={() => setTab('chat')}>Chat</Tab>
      </Tabs>
      {!subscribed ? (
        <>
          <LockIcon src="/public/115716_lock_unlock_password_secure_security_icon 1.svg" alt="Conteúdo restrito" />
          <SubscripbeCTA onSubscribe={handleSubscribe} />
        </>
      ) : (
        <div>
          {/* Exibe fotos do modelo */}
          {getPhotosByModel(model.id).map(photo => (
            <img
              key={photo.id}
              src={photo.url}
              alt="Foto"
              style={{
                width: '100%',
                borderRadius: 16,
                marginBottom: 12,
                boxShadow: '0 2px 12px #0008',
                objectFit: 'cover',
                maxHeight: 320,
              }}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Profile;
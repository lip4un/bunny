import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 1.5em 1em 7em 1em;
  background: #111;
  min-height: 100vh;
`;

const Card = styled.div`
  background: #181818;
  border-radius: 18px;
  margin-bottom: 1.5em;
  padding: 1.2em;
  box-shadow: 0 2px 12px #0008;
  display: flex;
  align-items: center;
  gap: 1.2em;
`;

const Avatar = styled.div<{ src?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ src }) => src ? `url(${src}) center/cover` : '#444'};
  border: 2px solid #222;
`;

const Name = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
`;

const Bio = styled.div`
  color: #bbb;
  font-size: 0.98rem;
`;

const Feed: React.FC = () => {
  const [models, setModels] = React.useState<any[]>([]);

  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
    setModels(users.filter((u: any) => u.isModel));
  }, []);

  return (
    <Container>
      <h2 style={{ color: '#fff', marginBottom: 24 }}>Modelos em destaque</h2>
      {models.map(model => (
        <Link to={`/profile/${model.id}`} key={model.id}>
          <Card>
            <Avatar src={model.avatar} />
            <div>
              <Name>{model.name}</Name>
              <Bio>{model.bio || 'Modelo na plataforma.'}</Bio>
            </div>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default Feed;
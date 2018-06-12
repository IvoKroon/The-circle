import styled from 'react-emotion';

const Holder = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  cursor: pointer;
`;

const Container = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(5, 5, 5, 0.8);
`;

const Inside = styled.div`
  position: absolute;
  background: rgba(5, 5, 5, 0.4);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  &:hover {
    background: rgba(5, 5, 5, 0.8);
  }
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  font-weight: 100;
  text-align: center;
  font-size: 18px;
  word-break: break-word;
`;

export { Title, Inside, Holder, Container };

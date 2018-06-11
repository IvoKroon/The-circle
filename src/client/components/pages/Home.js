import React from 'react';
import styled from 'react-emotion';
import ProductContainer from '../product/ProductContainer';
import ProductView from '../product/ProductView';
import RequestNotification from '../notification/RequestNotification';
import SearchBar from '../form/SearchBar';
import { Title } from '../general/Headers';
import { MainContainer, Grey } from '../general/GlobalCss';

const RequestNotificationHolder = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.img`
  min-width: 100%;
  height: 350px;
`;

const HeaderHolder = styled.div`
  position: relative;
  top: 0;
  min-width: 100%;
  height: 350px;
`;

const HeaderData = styled.div`
  background: ${Grey};
  position: absolute;
  min-width: 100%;
  height: 350px;
  top: 0;
`;

const Home = () => (
  // <img src={require(`${myImg}`)} />
  <div>
    <HeaderHolder>
      <Header src="../images/img.png" />
      <HeaderData>
        <SearchBar
          onClick={() => console.log('CLICK')}
          onChange={e => console.log(e.target.value)}
        />
      </HeaderData>
    </HeaderHolder>
    <MainContainer>
      <RequestNotificationHolder>
        <RequestNotification
          acceptAction={() => console.log('Accepting')}
          declineAction={() => console.log('Declining')}
          user="Ivo"
          item="Landmower"
        />
        <RequestNotification
          acceptAction={() => console.log('Accepting')}
          declineAction={() => console.log('Declining')}
          user="Ivo"
          item="Landmower"
        />
      </RequestNotificationHolder>
    </MainContainer>
  </div>
);
export default Home;

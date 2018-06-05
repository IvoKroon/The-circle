import React from 'react';
import styled from 'react-emotion';
import { withRouter } from 'react-router-dom';
import { Grey, MainContainer, CapitalizeFirstLetter } from '../general/GlobalCss';

const SplitView = styled.div`
  display: flex;
`;

const SplitViewChild = styled.div`
  flex: 1;
`;

const NameField = styled.div`
  color: ${Grey};
`;

const Location = styled.div``;

const ProductDetail = () => (
  <MainContainer>
    <SplitView>
      <SplitViewChild>
        <img height="300" width="400" src={this.state.circle.img} alt={this.state.circle.title} />
      </SplitViewChild>
      <SplitViewChild>
        <h1>{CapitalizeFirstLetter(this.state.circle.title)}</h1>
        <NameField>Ivo Kroon</NameField>
        <Location>
          <b>Sommelsdijk</b> Nicolaas beetsstraat 18
        </Location>
      </SplitViewChild>
    </SplitView>
  </MainContainer>
);

export default withRouter(ProductDetail);

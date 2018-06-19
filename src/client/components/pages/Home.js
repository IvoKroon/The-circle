import React from 'react';
import styled from 'react-emotion';
import ProductContainer from '../product/ProductContainer';
import ProductView from '../product/ProductView';
import RequestNotification from '../notification/RequestNotification';
import SearchBar from '../form/SearchBar';
import { Title } from '../general/Headers';
import { MainContainer, Grey } from '../general/GlobalCss';
import { GetLatestNotifications } from '../firebaseRequests/NotificationRequests';
import NotificationLoader from '../notification/NotificationLoader';
import firebase from '../general/firebaseConfig';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';

const ProductHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.searchTerm = '';
    this.state = {
      results: [],
      search: true,
      firstTime: true,
    };
  }
  search() {
    // console.lo
    const userId = JSON.parse(localStorage.getItem('user')).id;
    firebase
      .database()
      .ref(`users/${userId}/circles`)
      .once('value')
      .then((data) => {
        if (data.val() !== null) {
          const circles = Object.keys(data.val());
          const promises = [];
          for (let i = 0; i < circles.length; i += 1) {
            promises.push(new Promise(resolve =>
              firebase
                .database()
                .ref(`circles/${circles[i]}/products`)
                .orderByChild('title')
                .equalTo(this.searchTerm)
                .once('value')
                .then((products) => {
                  resolve(products.val());
                })));
          }
          Promise.all(promises).then((allProducts) => {
            const results = [];
            for (let i = 0; i < allProducts.length; i += 1) {
              if (allProducts[i] !== null) {
                const prods = Object.values(allProducts[i]);
                const keys = Object.keys(allProducts[i]);
                for (let j = 0; j < prods.length; j += 1) {
                  prods[j].id = keys[j];
                  results.push(prods[j]);
                }
              }
            }
            let search = true;
            for (let i = 0; i < allProducts.length; i += 1) {
              if (allProducts[i] !== null) {
                search = false;
                break;
              }
            }
            this.setState({ results, search, firstTime: false });
          });
        } else {
          console.log('NO circles found!');
        }
      });
  }
  render() {
    const results = [];
    if (this.state.results.length !== 0) {
      for (let i = 0; i < this.state.results.length; i += 1) {
        const { title, image, id } = this.state.results[i];
        results.push(<ProductView title={title} id={id} image={image} key={i}>
          {this.state.results[i].title}
        </ProductView>);
      }
    }
    return (
      <div>
        <HeaderHolder>
          <Header src="../images/img.png" />
          <HeaderData>
            <SearchBar
              placeholder="Search for a product..."
              shadow={false}
              onClick={() => this.search()}
              onChange={(e) => {
                this.searchTerm = e.target.value;
              }}
            />
          </HeaderData>
        </HeaderHolder>
        <MainContainer>
          {!this.state.firstTime ? (
            <h1>
              {!this.state.search
                ? `Search results for ${this.searchTerm}`
                : `No products found with the name: ${this.searchTerm}`}
            </h1>
          ) : null}
          <ProductHolder>{results}</ProductHolder>
          <NotificationLoader />
        </MainContainer>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getData } from 'servises/api';
// // import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    hits: null,
    status: 'idle',
    page: 1,
    // disable: true,

    error: null,
  };

  //ств метод який буде забирати значееня яке ми вводимо у форму
  handleSearch = value => {
    this.setState({ searchValue: value });
  };
  // onLoadMoreClick = () => {
  //   this.setState(prevState => {
  //     return { page: prevState.page + 1 };
  //   });
  // };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.page !== prevState.page
    ) {
      const getHits = async () => {
        try {
          this.setState({ status: 'pending' });
          const { hits, totalHits } = await getData(
            this.state.searchValue,
            this.state.page
          );
          this.setState({ hits, status: 'success' });
          if (hits.length === 0) {
            alert(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }

          console.log(hits, totalHits);
        } catch (error) {
          this.setState({ error: error.message, status: 'error' });
        }
      };

      getHits();
    }
  };
  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      hits: [...prevState.hits, this.state.hits],
    }));
  };
  render() {
    return (
      <div className="container">
        <Searchbar handleSearch={this.handleSearch} />
        {this.state.status === 'pending' && <Loader />}
        {this.state.status === 'error' && (
          <p>
            Oops...your request was rejected with the error: {this.state.error}
          </p>
        )}
        {this.state.status === 'success' && (
          <>
            <ImageGallery hits={this.state.hits} />
            <Button onClick={this.onLoadMoreClick} />
          </>
        )}
      </div>
    );
  }
}

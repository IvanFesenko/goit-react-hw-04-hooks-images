import React, { Component } from 'react';

import s from './App.module.css';

import getData from './services/pixabayAPI';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Preloader from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    pageNumber: 1,
    isLoading: false,
    error: false,
    images: [],
    totalPages: 0,
    newPageCords: 0,
    modalSrc: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, pageNumber } = this.state;
    if (prevState.query !== query) {
      this.fetchData();
    }
    if (
      prevState.pageNumber !== pageNumber &&
      prevState.pageNumber < pageNumber
    ) {
      await this.fetchData();
      this.scrollToNextPage();
    }
  }

  fetchData = async () => {
    const { query, pageNumber } = this.state;
    try {
      const data = await getData(query, pageNumber);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
        totalPages:
          prevState.totalPages > 0
            ? prevState.totalPages
            : Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({
        error: true,
        isLoading: false,
      });
    }
  };

  scrollToNextPage = () => {
    const { newPageCords } = this.state;
    window.scrollTo({
      top: newPageCords,
      behavior: 'smooth',
    });
  };

  onSearch = query => {
    this.setState({
      query: query,
      pageNumber: 1,
      isLoading: true,
      error: false,
      images: [],
      totalPages: 0,
      newPageCords: 0,
    });
  };

  loadMore = () => {
    const cords = document.documentElement.scrollHeight - 170;
    this.setState(prevState => ({
      isLoading: true,
      newPageCords: cords,
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  onImageClick = event => {
    const {
      dataset: { url },
    } = event.target;
    this.setState({
      modalSrc: url,
    });
  };

  onCloseModal = () => {
    this.setState({
      modalSrc: '',
    });
  };

  render() {
    const { images, pageNumber, totalPages, isLoading, modalSrc } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSearch={this.onSearch} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.onImageClick} />
        )}
        {isLoading && <Preloader />}
        {pageNumber < totalPages && (
          <LoadMoreButton onClickHandler={this.loadMore} />
        )}
        {modalSrc && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={modalSrc} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

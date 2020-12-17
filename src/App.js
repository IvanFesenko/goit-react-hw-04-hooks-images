import React, { useState, useEffect } from 'react';

import s from './App.module.css';

import API from './services/pixabayAPI';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Preloader from './components/Preloader/Preloader';
import Modal from './components/Modal/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [modalSrc, setModalSrc] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [newPageCords, setNewPageCords] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    const scrollToNextPage = () => {
      window.scrollTo({
        top: newPageCords,
        behavior: 'smooth',
      });
    };

    const getData = async () => {
      try {
        const data = await API.getData(query, pageNumber);
        setImages(prevImages => [...prevImages, ...data.hits]);
        scrollToNextPage();
        setNewPageCords(document.documentElement.scrollHeight - 170);
        setTotalPages(Math.ceil(data.totalHits / 12));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getData();
  }, [pageNumber, query]);

  const onSearch = newQuery => {
    setPage(1);
    setTotalPages(0);
    setQuery(newQuery);
    setLoading(true);
    setImages([]);
    setNewPageCords(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSearch={onSearch} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImageClick={({ target }) => setModalSrc(target.dataset.url)}
        />
      )}
      {isLoading && <Preloader />}
      {pageNumber < totalPages && <LoadMoreButton onClickHandler={loadMore} />}
      {modalSrc && (
        <Modal onCloseModal={() => setModalSrc('')}>
          <img src={modalSrc} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;

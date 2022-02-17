import React, { useState, useEffect } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Message from './components/Message/Message';
import Modal from './components/Modal/Modal';
import IconButton from './components/IconButton/IconButton';
import { ToastContainer } from 'react-toastify';
// import { BsX } from 'react-icons/bs';


import fetchImages from './api/api-services';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);
  const [totalHits, settotalHits] = useState('');

  // Запрос за картинками при обновлении инпута
  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  // Принимаем с формы запрос и пишем в стейт + сбрасываем после отправки стейт
  const onChangeQuery = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
    setLoading(false);
    setModal(false);
    setlargeImage('');
    setError(null);
    settotalHits('');
  };

  // Получаем дату из фетча
  const getImages = async () => {
    setLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, currentPage);

      setImages(prev => [...prev, ...hits]);

      setPage(prevPage => prevPage + 1);

      settotalHits(totalHits);

      if (currentPage !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  // Получает полное изображение, пишет его в стейт и открывает модалку
  const handleGalleryItem = fullImageUrl => {
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  // Переключение модалки
  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  // Скролл при клике на кнопку
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const needToShowLoadMore = totalHits / 12 > currentPage; // Нужны доп проверки;

  return (
    <>
      <Searchbar onSearch={onChangeQuery} />

      {images.length < 1 && (
        <ToastContainer position="top-center"
        autoClose={5000}
        pauseOnHover />
      )}

      <ImageGallery images={images} onImageClick={handleGalleryItem} />

      {needToShowLoadMore && <Button onClick={getImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div>
            <IconButton onClick={toggleModal} aria-label="Close modal">
            {/* <BsX width="2em" height="2em" fill="#7e7b7b" size="40px" position="absolute" top="10px" right="10px" /> */}
            </IconButton>
          </div>
          <img src={largeImage} alt="" />
        </Modal>
      )}

      {isLoading && <Loader />}

      {error && (
        <Message>
          <h2>Oops! 😫</h2>
          <p>
            Sorry, something went wrong. Please try again, or{' '}
            <a href="/">refresh the page</a>.
          </p>
        </Message>
      )}
    </>
  );
};

export default App;
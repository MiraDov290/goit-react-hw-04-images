import { useState, useEffect } from 'react';
import * as API from '../services/PixabayApi';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
   // Встановлення початкового стану
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

useEffect(() => {
  if (searchName === '') {
    return;
  }

  async function addImages() {
      try {
        // Встановлюємо загрузку
        setIsLoading(true);
        // Отримуємо дані завдяки API запиту до Pixabay
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          // Якщо зображення не знайдено виводиться напис
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        // Нормалізуємо отримання фотографії
        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]); // Добавляємо нове зображення
        setIsLoading(false); // Скидаємо загрузку
        setTotalPages(Math.ceil(data.totalHits / 12)); // Вираховуємо загальну кількість 
      } catch {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        }); // Якщо виникла помилка виводимо повідомлення
      } finally {
        setIsLoading(false); // В любому випадку скидаємо загрузку
      }
    }
    addImages();
  }, [searchName, currentPage]);

  
  // Метод для загрузки додаткового зображення шляхом збільшення номера сторінки
  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Метод для обробки відправки форми пошуку
  const handleSubmit = query => {
    setSearchName(query); // Встановлення введеного запита в стан
    setImages([]); // Очистка масива з зображеннями
    setCurrentPage(1); // Скидання номер сторінки на першу
    };

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <p
            style={{
              padding: 100,
              textAlign: 'center',
              fontSize: 30,
            }}
          >
          </p>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={loadMore} /> // Кнопка для загрузки додаткового зображення
        )}
      </div>
    );
  };

export default App;

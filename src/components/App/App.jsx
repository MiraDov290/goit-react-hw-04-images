import { Component } from 'react';
// import * as API from '../../services/PixabayApi';
import * as API from '../services/PixabayApi';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  // Встановлення початкового стану
  state = {
    searchName: '',
    images: [], 
    currentPage: 1, 
    error: null, 
    isLoading: false, 
    totalPages: 0, 
  };

  // Метод життєвого циклу, що викликається при обновленні сторінки
  componentDidUpdate(_, prevState) {
    // Перевірка чи змінився запит і номер сторінки
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.addImages(); // Отримання і добавлення зображення
    }
  }

  // Метод для загрузки додаткового зображення шляхом збільшення номера сторінки
  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  // Метод для обробки відправки форми пошуку
  handleSubmit = query => {
    this.setState({
      searchName: query, // Встановлення введеного запита в стан
      images: [], // Очистка масива з зображеннями
      currentPage: 1, // Скидання номер сторінки на першу
    });
  };

  // Метод для отримання і добавлення зображення в стан
  addImages = async () => {
    const { searchName, currentPage } = this.state;
    try {
      this.setState({ isLoading: true }); // Вствлення загрузки

      // Ортмання даний за допомогою API запиту до Pixabay
      const data = await API.getImages(searchName, currentPage);

      if (data.hits.length === 0) {
        // Якщо зображення не знайдено виводимо повідомлення
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      // Нормалізуємо отримання зображення
      const normalizedImages = API.normalizedImages(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImages], // Добвляємо нове зображення до існуючого
        isLoading: false, // Скидаємо загрузку
        error: '', // Очищаємо повідомлення від помилок
        totalPages: Math.ceil(data.totalHits / 12), // Вираховуємо загальну кількість сторінок
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); // Якщо виникла помилка виводимо повідомлення
    } finally {
      this.setState({ isLoading: false }); // Скидамо загрузку
    }
  };

  render() {
    const { images, isLoading, currentPage, totalPages } = this.state;

    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handleSubmit} />
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
          <Button onClick={this.loadMore} /> // Кнопка для загрузки додаткового зображення
        )}
      </div>
    );
  }
}

export default App;

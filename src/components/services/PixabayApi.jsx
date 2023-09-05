import axios from 'axios';

// Встановлюємо базовий URL для всіх запитів
axios.defaults.baseURL = 'https://pixabay.com/api/';

// Константа з API-ключем
const API_KEY = '34523545-f21683fd59bfc3e4e2549fe07';

// Константа, яка визначає кількість зображень на сторінці
export const perPage = 12;

// Функція для отримання зображення із API Pixabay
export const getImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};

// Функція для нормалізації масива зображення
export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
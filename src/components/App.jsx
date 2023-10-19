import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import * as API from '../api/Api';

import { Component } from 'react';
import {Loader} from './Loader/Loader';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [], //Зберігає завантажені зображення
    searchValue: '', // Зберігає запит для пошуку
    page: 1, // Зберігає поточний номер сторінки
    totalPage: 0, // Зберігає загальну кількість сторінок
    isLoading: false, // Індикатор завантаження зображень
    error: null, // Зберігає повідомлення про помилку
  };

  // Метод життєвого циклу: викликається при оновлення компонента
  componentDidUpdate(_, prevState) {
    // Перевіряємо, чи є зміни
    if (
      prevState.searchValue !== this.state.searchValue || //запит
      prevState.page !== this.state.page //номер сторінки
    ) {
      this.addImg(); //Додаємо зображення у стан
    }
  }

  // Отримання та додавання зображень у стан

  addImg = async () => {
    const { searchValue, page } = this.state;
    try {
      this.setState({ isLoading: true }); //додаємо iндикатор завантаження зображень
      const data = await API.fetchImg(searchValue, page); //отримання данни

      if (data.hits.length === 0) {
        //
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // Нормалізуємо отримані зображення
      const normalizedImg = API.normalizedImg(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImg], // Додаємо нові зображення до існуючих
        isLoading: false, // Прибираємо індикатор завантаження зображень
        error: '', // Очищаємо повідомлення про помилку
        totalPage: Math.ceil(data.totalHits / 12), //Вираховуємо  загальну кількість сторінок
      }));
    } catch (error) {
      this.setState({ error: 'Something went wrong!' }); // якщо виникла помилка
    } finally {
      this.setState({ isLoading: false }); //Прибираємо індикатор завантаження зображень в будь-якому випадку
    }
  };

 

  //Оброблення та відправлення форми
  handledSubmit = value => {
    this.setState({
      searchValue: value, //Встановлюємо введений запит до стану
      images: [], //Очищаємо масив із зображеннями
      page: 1, //Скидаємо номер поточної сторінки на першу
    });
  };
  //Завантаження додаткових зображень шляхом збільшення номера поточної сторінки
  nextPortionImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images,  page, totalPage, isLoading, } = this.state;
    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handledSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {totalPage > 1 && page < totalPage && (
          <Button onClick={this.nextPortionImg} /> // Кнопка для завантаження додаткових зображень
        )}
       
        
       
      </div>
    );
  }
}

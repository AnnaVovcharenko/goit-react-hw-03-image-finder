import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import * as API from '../api/Api';

import { Component } from 'react';
import {Loader} from './Loader/Loader';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
 // всі коменти які я роблю, були взяті з документації React та конспекту 
//ЗМІНА НАЗВ ВЛАСТИВОСТЕЙ КОМПОНЕНТІВ(збереження даних компонентів)
state = {
  query: "", // searchValue: ''
  images: [],
  error: false,
  loading: false, // isLoading
  page: 1,
  totalImges: 0 //totalPage:
}

  
  // Стадій життєвого циклу – монтування (Викликається відразу після монтування компонента в DOM)
  async componentDidUpdate(_, prevState) {
    // Обгортаєм виклик в умову, щоб уникнути безкінечного циклу
    if (
      prevState.query !== this.state.query || //запит
      prevState.page !== this.state.page //номер сторінки
    ) { this.setState({ loading: true });
       // Отримання та додавання зображень
       try{ 
        const data = await API.fetchImg(this.state.query, this.state.page);
        if (data.hits.length === 0) {
          //
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } 
        const normalizedImg = API.normalizedImg(data.hits);
        this.setState(state => ({
          images: [...state.images, ...normalizedImg], // Додаємо нові зображення до існуючих
          loading: false, // Прибираємо індикатор завантаження зображень
          error: '', // Очищаємо повідомлення про помилку
          totalImges: Math.ceil(data.totalHits / 12), //Вираховуємо  загальну кількість сторінок
        }));
      } catch (error) {
        this.setState({ error: 'Something went wrong!' }); // якщо виникла помилка
      } finally {
        this.setState({  loading: false }); //Прибираємо індикатор завантаження зображень в будь-якому випадку
      }};
  }
    
  
  //Оброблення та відправлення форми
  handledSubmit = value => {
    this.setState({
      query: value, //Встановлюємо введений запит до стану
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
    const { images,  page, totalImges, loading, } = this.state;
    return (
      <div>
        <ToastContainer transition={Slide} />
        <SearchBar onSubmit={this.handledSubmit} />
        <ImageGallery 
        images={images} />

        {loading && <Loader />}
        {totalImges > 1 && page < totalImges && (
          <Button onClick={this.nextPortionImg} /> // Кнопка для завантаження додаткових зображень
        )}
               
       
      </div>
    );
  }
}

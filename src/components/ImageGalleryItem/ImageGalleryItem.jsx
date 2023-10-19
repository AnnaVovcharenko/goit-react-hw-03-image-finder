import React, { Component } from 'react';
import { ModalWindow } from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export class ImgGalleryItem extends Component {
  state = {
    isModalOpen: false, //Зберігає стан модального вікна (відчинено чи закрито)
    showImg: {},
  };
  openModal = (imgUrl, alt) => {
   
    this.setState({ isModalOpen: true, showImg: { imgUrl, alt } }); // відкриття модального вікна
  };
  closeModal = () => {
    
    this.setState({ isModalOpen: false }); // закриття модального вікна
  };

  render() {
    const { isModalOpen, showImg } = this.state; //Отримуємо поточне значення isModalOpen зі стану
    const { image } = this.props; // Отримуємо переданий пропс

    return (
      <>
         <Item>
        <Img
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.openModal}
        />
        {isModalOpen && (
          <ModalWindow
            onClose={this.closeModal}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
          />
        )}
      </Item>
      </>
   
    );
  }
}



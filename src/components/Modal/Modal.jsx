import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal  } from './Modal.styled';
const modalRoot = document.querySelector('#root');


export class ModalWindow extends Component {
  //Метод життєвого циклу: викликається після монтування компонента

  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); //Додаємо обробник події натискання клавіші
    document.body.style.overflow = 'hidden';
  }

  //Метод життєвого циклу: викликається перед розмонтуванням компонента
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); // Видаляємо обробник події натискання клавіші
    document.body.style.overflow = 'visible';
  }

  // Обробник події натискання клавіші
  keyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); // Закриваємо модальне вікно при натисканні клавіші Escape
    }
  };

  // Обробник кліка на тлі модального вікна
  backdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); // Закриваємо модальне вікно при натисканні на тлі
    }
  };

  render() {
    const { largeImageURL, tags } = this.props; //Отримуємо значення пропсів

    return createPortal(
      <Overlay onClick={this.backdropClick}>
        <Modal><img src={largeImageURL} alt={tags} /></Modal>
        
      </Overlay>,
      modalRoot
    );
  }
}



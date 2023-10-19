import React from 'react';
import { ImgGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';


export const ImageGallery =({images}) => {
  
    return (<List>
       {images.map(image => (
        <ImgGalleryItem 
        key={image.id}
        image={image}
        />
       ))}

    </List>)
  
}

import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ hits }) => {
  return (
    <ul className={css.gallery}>
      <ImageGalleryItem hits={hits} />
    </ul>
  );
};
export default ImageGallery;

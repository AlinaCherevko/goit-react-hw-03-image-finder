import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ hits }) => {
  return (
    <>
      {hits?.map(hit => (
        <li key={hit.id} className={css.galleryItem}>
          <img
            className={css.itemImage}
            src={hit.webformatURL}
            alt={hit.tags}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;

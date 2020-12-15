import s from './ImageGallery.module.css';

function ImageGalleryItem({ imageSrc, imageUrl, handler }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={imageSrc}
        alt=""
        data-url={imageUrl}
        className={s.ImageGalleryItem_image}
        onClick={handler}
      />
    </li>
  );
}

export default ImageGalleryItem;

import s from './LoadMoreButton.module.css';

function LoadMoreButton({ onClickHandler }) {
  return (
    <button className={s.Button} onClick={onClickHandler}>
      Load more...
    </button>
  );
}

export default LoadMoreButton;

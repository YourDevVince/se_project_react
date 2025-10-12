import './ItemModal.css';

function ItemModal({ activeModal, card, handleCloseClick, onDeleteItem }) {
  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseClick();
    }
  };
  return (
    <div
      className={`modal ${activeModal === 'preview' && 'modal_opened'}`}
      onMouseDown={handleMouseDown}
    >
      <div className='modal__content modal__content_type_image'>
        <button
          onClick={handleCloseClick}
          type='button'
          className='modal__close'
        ></button>
        <img src={card.imageUrl} alt={card.name} className='modal__image' />
        <div className='modal__footer'>
          <div className='modal__text'>
            <h2 className='modal__caption'>{card.name}</h2>
            <p className='modal__weather'>Weather: {card.weather}</p>
          </div>

          <button
            type='button'
            className='modal__delete'
            onClick={() => onDeleteItem(card._id)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

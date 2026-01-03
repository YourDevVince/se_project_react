import './ModalWithForm.css';

function ModalWithForm({
  name = 'default',
  children,
  buttonText,
  title,
  handleCloseClick,
  onSubmit,
  isOpen = false,
  switchText,
  onSwitch,
}) {
  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseClick();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? 'modal_opened' : ''}`}
      onMouseDown={handleMouseDown}
    >
      <div className='modal__content'>
        <h2 className='modal__title'>{title}</h2>
        <button
          onClick={handleCloseClick}
          type='button'
          className='modal__close'
        ></button>

        <form className='modal__form' onSubmit={onSubmit} noValidate>
          {children}

          <div className='modal__actions'>
            <button type='submit' className='modal__submit'>
              {buttonText}
            </button>

            {switchText && onSwitch && (
              <div className='modal__switch'>
                <span className='modal__switch-text'>or</span>
                <button
                  type='button'
                  className='modal__switch-button'
                  onClick={onSwitch}
                >
                  {switchText}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

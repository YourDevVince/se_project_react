import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './AddItemModal.css';

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const defaultValues = {
    name: '',
    imageUrl: '',
    weatherType: '',
  };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values);
    resetForm();
  };

  return (
    <ModalWithForm
      name='add-garment'
      buttonText='Add garment'
      title='New garment'
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor='name' className='modal__label'>
        Name
        <input
          type='text'
          name='name'
          id='clothing-name'
          className='modal__input modal__input_type_card-name'
          placeholder='Name'
          minLength='1'
          maxLength='30'
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor='imageUrl' className='modal__label'>
        Image
        <input
          type='url'
          name='imageUrl'
          className='modal__input'
          id='clothing-link'
          placeholder='Image URL'
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className='modal__radio-buttons'>
        <legend className='modal__legend'>Select the weather type:</legend>
        <label htmlFor='hot' className='modal__label modal__label_type_radio'>
          <input
            name='weatherType'
            type='radio'
            id='choiceHot'
            className='modal__radio-input'
            value='hot'
            onChange={handleChange}
          />{' '}
          <span className='radio__label'>Hot</span>
        </label>
        <label htmlFor='warm' className='modal__label modal__label_type_radio'>
          <input
            name='weatherType'
            type='radio'
            id='choiceWarm'
            className='modal__radio-input'
            value='warm'
            onChange={handleChange}
          />{' '}
          <span className='radio__label'>Warm</span>
        </label>
        <label htmlFor='cold' className='modal__label modal__label_type_radio'>
          <input
            name='weatherType'
            type='radio'
            id='choiceCold'
            className='modal__radio-input'
            value='cold'
            onChange={handleChange}
          />{' '}
          <span className='radio__label'>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

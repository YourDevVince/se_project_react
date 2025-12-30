import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  const defaultValues = { name: '', avatar: '', email: '', password: '' };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <ModalWithForm
      name='register'
      title='Sign up'
      buttonText='Sign up'
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className='modal__label'>
        Name
        <input
          name='name'
          type='text'
          className='modal__input'
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className='modal__label'>
        Avatar URL
        <input
          name='avatar'
          type='url'
          className='modal__input'
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>

      <label className='modal__label'>
        Email
        <input
          name='email'
          type='email'
          className='modal__input'
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className='modal__label'>
        Password
        <input
          name='password'
          type='password'
          className='modal__input'
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;

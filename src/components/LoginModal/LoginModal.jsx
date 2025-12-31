import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, onLogin, onCloseModal }) => {
  const defaultValues = { email: '', password: '' };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    resetForm(defaultValues);
  }, [isOpen]);

  return (
    <ModalWithForm
      name='login'
      title='Sign in'
      buttonText='Sign in'
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className='modal__label'>
        Email
        <input
          name='email'
          placeholder='Email'
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
          placeholder='Password'
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

export default LoginModal;

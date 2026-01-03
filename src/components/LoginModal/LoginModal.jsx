import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './LoginModal.css';

const LoginModal = ({ isOpen, onLogin, onCloseModal, onSwitchToRegister }) => {
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
      title='Log in'
      buttonText='Log in'
      isOpen={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
      switchText='Sign Up'
      onSwitch={onSwitchToRegister}
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

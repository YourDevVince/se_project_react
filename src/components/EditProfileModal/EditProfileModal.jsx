import { useContext, useEffect, useMemo } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useForm } from '../../hooks/useForm';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

export default function EditProfileModal({
  isOpen,
  onCloseModal,
  onUpdateUser,
}) {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = useMemo(() => ({ name: '', avatar: '' }), []);
  const { values, handleChange, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) return;
    resetForm({
      name: currentUser?.name || '',
      avatar: currentUser?.avatar || '',
    });
  }, [isOpen, currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      title='Change profile data'
      buttonText='Save changes'
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
          minLength='2'
        />
      </label>

      <label className='modal__label'>
        Avatar
        <input
          name='avatar'
          type='url'
          className='modal__input'
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

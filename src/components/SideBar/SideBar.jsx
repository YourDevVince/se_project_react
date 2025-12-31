import './SideBar.css';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const firstLetter = (currentUser?.name?.trim()?.[0] || 'U').toUpperCase();

  return (
    <aside className='sidebar'>
      <div className='sidebar__user-container'>
        <p className='sidebar__username'>{currentUser?.name || 'User'}</p>

        {currentUser?.avatar ? (
          <img
            className='sidebar__avatar'
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className='sidebar__avatar-placeholder'>{firstLetter}</div>
        )}
      </div>
      <div className='sidebar__button-container'>
        <button
          type='button'
          className='sidebar__button'
          onClick={onEditProfile}
        >
          Change profile data
        </button>

        <button type='button' className='sidebar__button' onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}

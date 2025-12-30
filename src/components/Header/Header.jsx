import './Header.css';
import Logo from '../../assets/logo.svg';
import Avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || 'User';
  const userAvatar = currentUser?.avatar || Avatar;
  const firstLetter = (currentUser?.name?.trim()?.[0] || 'U').toUpperCase();

  return (
    <header className='header'>
      <div className='header__container'>
        <NavLink to='/' className='header__logo-link'>
          <img className='header__logo' src={Logo} alt='App logo' />
        </NavLink>
        <p className='header__date-and-location'>
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type='button'
            className='header__add-clothes-btn'
          >
            + Add clothes
          </button>

          <NavLink to='/profile' className='header__profile-link'>
            <div className='header__user-container'>
              <p className='header__username'>{currentUser?.name}</p>

              {currentUser?.avatar ? (
                <img
                  className='header__avatar'
                  src={currentUser.avatar}
                  alt={currentUser.name}
                />
              ) : (
                <div className='header__avatar-placeholder'>{firstLetter}</div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className='header__auth'>
          <button
            type='button'
            onClick={handleRegisterClick}
            className='header__auth-btn'
          >
            Sign up
          </button>
          <button
            type='button'
            onClick={handleLoginClick}
            className='header__auth-btn'
          >
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

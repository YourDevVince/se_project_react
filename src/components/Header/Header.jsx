import './Header.css';
import Logo from '../../assets/logo.svg';
import Avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { NavLink } from 'react-router-dom';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

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
      <button
        onClick={handleAddClick}
        type='button'
        className='header__add-clothes-btn'
      >
        + Add clothes
      </button>
      <NavLink to='/profile' className='header__profile-link'>
        <div className='header__user-container'>
          <p className='header__username'>Terrence Tegegne</p>
          <img src={Avatar} alt='Terrence Tegegne' className='header__avatar' />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;

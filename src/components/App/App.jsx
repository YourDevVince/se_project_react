import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { register, authorize, checkToken } from '../../utils/auth';

import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, WEATHER_API_KEY } from '../../utils/constants';

import {
  getItems,
  addItem,
  removeItem,
  likeItem,
  dislikeItem,
  updateUserInfo,
} from '../../utils/api';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

function App() {
  const [weatherData, setWeatherData] = useState({
    city: '',
    condition: '',
    type: '',
    temp: { F: 999, C: 999 },
    isDay: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  const handleToggleSwitch = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const handleRegisterClick = () => setActiveModal('register');
  const handleLoginClick = () => setActiveModal('login');
  const handleEditProfileClick = () => setActiveModal('edit-profile');

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        if (!res.token) {
          return Promise.reject('No token returned from server');
        }
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(res.token);
      })
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error('Login failed', err));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal('');
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        if (!res.token) {
          return Promise.reject('No token returned from server');
        }
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(res.token);
      })
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error('Registration failed', err));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem('jwt');
    updateUserInfo({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    if (!isLoggedIn) {
      setActiveModal('login');
      return;
    }

    const token = localStorage.getItem('jwt');

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    if (!isLoggedIn) {
      setActiveModal('login');
      return;
    }

    const token = localStorage.getItem('jwt');

    removeItem(id, token)
      .then(() => {
        const next = clothingItems.filter((card) => card._id !== id);
        setClothingItems(next);
        closeActiveModal();
      })
      .catch((err) => console.error('Failed to delete item', err));
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    const request = !isLiked ? likeItem(id, token) : dislikeItem(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error('Token invalid', err);
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, WEATHER_API_KEY)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error('Weather load failed', err);
      });

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitch }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className='app'>
          <div className='app__content'>
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    currentTemperatureUnit={currentTemperatureUnit}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      isLoggedIn={isLoggedIn}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === 'add-garment'}
            onAddItem={onAddItem}
            onCloseModal={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onCloseModal={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === 'register'}
            onRegister={handleRegister}
            onCloseModal={closeActiveModal}
          />

          <LoginModal
            isOpen={activeModal === 'login'}
            onLogin={handleLogin}
            onCloseModal={closeActiveModal}
          />
          <EditProfileModal
            isOpen={activeModal === 'edit-profile'}
            onCloseModal={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';

import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, WEATHER_API_KEY } from '../../utils/constants';

import { getItems, addItem, removeItem } from '../../utils/api';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext';

function App() {
  const [weatherData, setWeatherData] = useState({
    city: '',
    condition: '',
    type: '',
    temp: { F: 999, C: 999 },
    isDay: false,
  });
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

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    removeItem(id)
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
      <div className='app'>
        <div className='app__content'>
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path='/'
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  currentTemperatureUnit={currentTemperatureUnit}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
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
          handleCloseClick={closeActiveModal}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

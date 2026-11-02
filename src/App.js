import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Spinner,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { TiWeatherPartlySunny } from 'react-icons/ti';

const API_KEY = '7f3546e915511f0f7941d7d68d3119a6';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return now.toLocaleDateString(undefined, options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setErrorMessage('Please enter a city name to continue.');
      setWeather(null);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      setWeather(null);
      setErrorMessage('We could not find that city. Try another location.');
      console.error('Error fetching weather data:', error);
    }

    setLoading(false);
  };

  return (
    <Box className="App">
      <Box className="overlay" />
      <Box className="contentWrapper">
        <VStack spacing={6} className="searchPanel">
          <HStack spacing={2} justify="center" color="orange.200">
            <Icon as={TiWeatherPartlySunny} boxSize={10} />
            <Heading as="h1" size="xl" className="titleText">
              Local Weather Snapshot
            </Heading>
          </HStack>

          <Text color="whiteAlpha.900" fontSize="md" textAlign="center" maxW="560px">
            Search any city to instantly view current temperature and conditions.
          </Text>

          <HStack spacing={3} w="100%" flexDirection={['column', 'row']}>
            <Input
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') fetchWeather();
              }}
              className="cityInput"
            />
            <Button className="weatherButton" onClick={fetchWeather} isDisabled={loading}>
              Get Weather
            </Button>
          </HStack>

          {loading && <Spinner size="lg" color="orange.200" thickness="4px" />}

          {errorMessage && (
            <Text color="red.200" fontWeight="600" textAlign="center">
              {errorMessage}
            </Text>
          )}

          {weather && (
            <Box className="weatherCard">
              <Text fontSize="2xl" fontWeight={700} color="white">
                {weather.name}, {weather.sys.country}
              </Text>
              <Text fontSize="6xl" fontWeight={800} color="orange.100" lineHeight="1.1">
                {Math.round(weather.main.temp)}°C
              </Text>
              <Text fontSize="lg" color="whiteAlpha.900" textTransform="capitalize">
                {weather.weather[0].description}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.800" mt={2}>
                {currentDate}
              </Text>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

export default App;

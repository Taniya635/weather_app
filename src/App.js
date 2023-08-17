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
  Center,
} from '@chakra-ui/react';
import {TiWeatherPartlySunny} from 'react-icons/ti'
import {BsCloudFogFill,BsCloudHaze2Fill} from 'react-icons/bs'

const API_KEY = '7f3546e915511f0f7941d7d68d3119a6';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return now.toLocaleDateString(undefined, options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };
  let w=window.innerWidth
  console.log(w);

  return (
    <Box className="App">
      <Box textAlign="center" p={4}>
        <Heading as="h1" mb={4} mt={'5rem'} color='rgb(227, 138, 74)'>
          Get a weather update 
          
        </Heading>
        <Box position="relative">
            <Input
              placeholder="Enter city name"
              // value={city}
              mb={2}
              onChange={(e)=>setCity(e.target.value)}
              w={['90%', '70%', '500px']}
              fontSize={'20px'}
              mt={'2rem'}
              textAlign="center"
              fontWeight={'500'}
              border="2px solid rgb(227, 138, 74)"
            />
                   
                        
          </Box>


        <Button bg="rgba(227, 138, 74, 0.8)" onClick={fetchWeather} ml={'2rem'} fontSize={'18px'} _hover={{bg:'orange.100'}} borderRadius={'2rem'}>
          Get Weather
        </Button>
        {loading && <Spinner mt={4} />}
        {weather && (
          <Box  width={['90%', '500px']} h={'300px'} m={'auto'} bg="rgba(192, 192, 192, 0.9)" mt={'3rem'} borderRadius={'3rem'}
          cursor={'pointer'}
          transition='1s'
          _hover={{bg:'orange.100'}}
          >
            <Text  fontSize='25px' fontWeight={600} pt={'4rem'}>
              Weather in {weather.name}, {weather.sys.country}:
            </Text>

            <Text fontSize="3xl" fontWeight={500}>
              {Math.round(weather.main.temp)}°C
            </Text>

            <Text pt={'1rem'} color='brown' fontSize={'20px'}>
              <Box mt={'-1.5rem'} fontWeight={550}>{weather.weather[0].description}</Box>
            </Text>

            <Text mt={2} fontWeight={800}>{currentDate}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;

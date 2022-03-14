import { useCallback, useEffect, useState } from 'react';
import { Container, useColorMode, useColorModeValue } from '@chakra-ui/react'

import { ThekrHeader, ThekrBox } from './components/Thekr';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { TashkeelModeSwitcher } from './components/TashkeelModeSwitcher';
import ChakraCarousel from './components/ChakraCarousel/ChakraCarousel';

import { setWithExpiry, getWithExpiry, setInitialColorMode } from './helpers';

import athkar from './resources/athkar.json'
import tashkeelAthkar from './resources/athkar_tashkeel.json';
import nightAthkar from './resources/athkar_night.json';
import tashkeelNightAthkar from './resources/athkar_night_tashkeel.json';

function App() {
  const { toggleColorMode } = useColorMode();

  const [tashkeelState, updateTashkeelState] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [trackIsActive, setTrackIsActive] = useState(false);

  const athkarNormal = useColorModeValue(athkar, nightAthkar);
  const athkarTashkeel = useColorModeValue(tashkeelAthkar, tashkeelNightAthkar);
  const initialColorState = useColorModeValue(false, true);

  const memoizedReset = useCallback(() => {
    setTrackIsActive(true);
    setActiveItem(0);
  }, []);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const location = getWithExpiry('location');
    if (location) {
      const country = location.split('+')[0];
      const city = location.split('+')[1];
      fetch(`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=4&month=${month}&year=${year}`)
      .then(resp => resp.json())
      .then(resp => setInitialColorMode(resp, now, toggleColorMode, initialColorState));
    } else {
      const key = "x95i5ncysbrcywd9";
      // const key = "tryout";
      fetch(`https://api.ipregistry.co/?key=${key}`)
        .then(resp => resp.json())
        .then(payload => {
            const country = payload.location.country.name;
            const city = payload.location.city;
            setWithExpiry('location', `${country}+${city}`, 2628000000);
            fetch(`http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=4&month=${month}&year=${year}`)
              .then(resp => resp.json())
              .then(resp => setInitialColorMode(resp, now, toggleColorMode, initialColorState));
        });
    }
  }, []);

  const athkarToMapOn = (tashkeelState === 0 ? athkarTashkeel : athkarNormal);
  const athkarComps = athkarToMapOn.map((t, i) => {
    const key = i;
    const thekr = t;
    const athkarCount = athkarNormal.length;
    const thekrBoxProps = {
      key,
      thekr,
      athkarCount,
      setActiveItem,
      setTrackIsActive,
      memoizedReset
    };
    return (<ThekrBox {...thekrBoxProps}/>);
  });

  const widths = {
    base: "100%",
    sm: "35rem",
    md: "43.75rem",
    lg: "57.5rem",
    xl: "75rem",
    xxl: "87.5rem"
  };

  const carouselProps = {
    activeItem,
    setActiveItem,
    trackIsActive,
    setTrackIsActive
  };

  return (
    <Container py={20} px={0} maxW={widths}>
      <ColorModeSwitcher />
      <TashkeelModeSwitcher currentState={tashkeelState} updateState={updateTashkeelState} />
      <ThekrHeader />
      <ChakraCarousel gap={32} {...carouselProps}>
        {athkarComps}
      </ChakraCarousel>
    </Container>
  );
}

export default App;

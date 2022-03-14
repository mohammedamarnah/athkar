import { useCallback, useState } from 'react';
import { Container, useColorModeValue } from '@chakra-ui/react'

import { ThekrHeader, ThekrBox } from './components/Thekr';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { TashkeelModeSwitcher } from './components/TashkeelModeSwitcher';
import ChakraCarousel from './components/ChakraCarousel/ChakraCarousel';

import useGaTracker from './components/GaTracker';

import athkar from './resources/athkar.json'
import tashkeelAthkar from './resources/athkar_tashkeel.json';
import nightAthkar from './resources/athkar_night.json';
import tashkeelNightAthkar from './resources/athkar_night_tashkeel.json';

function App() {
  useGaTracker();

  const [tashkeelState, updateTashkeelState] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [trackIsActive, setTrackIsActive] = useState(false);
  const gap = 32;

  const memoizedReset = useCallback(() => {
    setTrackIsActive(true);
    setActiveItem(0);
  }, []);

  const athkarNormal = useColorModeValue(athkar, nightAthkar);
  const athkarTashkeel = useColorModeValue(tashkeelAthkar, tashkeelNightAthkar);

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
    gap,
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
      <ChakraCarousel {...carouselProps}>
        {athkarComps}
      </ChakraCarousel>
    </Container>
  );
}

export default App;

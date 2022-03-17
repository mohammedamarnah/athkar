// React Components
import { useCallback, useEffect, useState } from 'react';
import { Container, useColorMode, useColorModeValue } from '@chakra-ui/react';

// Custom Components
import { ThekrHeader, ThekrBox } from './components/Thekr';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import ChakraCarousel from './components/ChakraCarousel/ChakraCarousel';
import { AddToHomeScreenModal } from './components/AddToHomeScreenModal';
import { TashkeelModeSwitcher } from './components/TashkeelModeSwitcher';

// Helpers
import { setDarkModeOnAthan } from './helpers';

// Morning Athkar Resources
import athkar from './resources/athkar.json';
import tashkeelAthkar from './resources/athkar_tashkeel.json';

// Night Athkar Resources
import nightAthkar from './resources/athkar_night.json';
import tashkeelNightAthkar from './resources/athkar_night_tashkeel.json';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [tashkeelState, updateTashkeelState] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [runCount, setRunCount] = useState(0);

  const athkarNormal = useColorModeValue(athkar, nightAthkar);
  const athkarTashkeel = useColorModeValue(tashkeelAthkar, tashkeelNightAthkar);
  const athkarToMapOn = tashkeelState === 0 ? athkarTashkeel : athkarNormal;

  const memoizedReset = useCallback(() => {
    setTrackIsActive(true);
    setActiveItem(0);
  }, []);

  useEffect(() => {
    if (runCount >= 2) return;
    setRunCount(count => count + 1);
    setDarkModeOnAthan(colorMode, toggleColorMode);
  }, [runCount, colorMode, toggleColorMode]);

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
      memoizedReset,
    };
    return <ThekrBox {...thekrBoxProps} />;
  });

  const widths = {
    base: '100%',
    sm: '35rem',
    md: '43.75rem',
    lg: '57.5rem',
    xl: '75rem',
    xxl: '87.5rem',
  };

  const carouselProps = {
    activeItem,
    setActiveItem,
    trackIsActive,
    setTrackIsActive,
  };

  return (
    <Container py={20} px={0} maxW={widths}>
      <ColorModeSwitcher />
      <TashkeelModeSwitcher
        currentState={tashkeelState}
        updateState={updateTashkeelState}
      />
      <ThekrHeader />
      <ChakraCarousel gap={32} {...carouselProps}>
        {athkarComps}
      </ChakraCarousel>
      <AddToHomeScreenModal />
    </Container>
  );
}

export default App;

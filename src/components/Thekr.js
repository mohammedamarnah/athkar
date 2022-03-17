import { useEffect, useState } from 'react';
import { RepeatIcon } from '@chakra-ui/icons';
import {
  useColorModeValue,
  Heading,
  VStack,
  HStack,
  Circle,
  Center,
  Text,
  Flex,
} from '@chakra-ui/react';

export function ThekrHeader() {
  const thekrStr = useColorModeValue('الصباح', 'المساء');
  const headerColor = useColorModeValue('orange.400', 'teal.300');
  const mainColor = useColorModeValue('black', 'gray.300');
  return (
    <Center dir='rtl' m='3' fontSize='3xl' color={mainColor} fontFamily='Cairo'>
      أذكار
      <Center as='span' color={headerColor} fontWeight='Bold' marginRight={2}>
        {thekrStr}
      </Center>
    </Center>
  );
}

export function ThekrContent({ thekrInfo }) {
  const innerColor = useColorModeValue('orange.500', 'teal.200');

  return (
    <Flex
      boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
      justifyContent='space-between'
      flexDirection='column'
      overflow='hidden'
      color={useColorModeValue('black', 'gray.300')}
      bg={useColorModeValue('orange.100', 'base.d100')}
      rounded={5}
      flex={1}
      p={5}
      dir='rtl'
    >
      <VStack mb={6}>
        <Heading w='full' fontSize='lg' mb={2} color={innerColor}>
          {thekrInfo.header}
        </Heading>
        <Text w='full' fontSize='md'>
          {thekrInfo.body}
          <Text as='span' w='full' color='gray.500' fontSize='sm'>
            {thekrInfo.subtitle}
          </Text>
        </Text>
        <Text w='full' fontSize='sm' color={innerColor}>
          {thekrInfo.footer}
        </Text>
      </VStack>
    </Flex>
  );
}

export function ThekrCounter({
  totalCount,
  count,
  updateState,
  athkarCount,
  setActiveItem,
  setTrackIsActive,
}) {
  const handleCount = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (count + 1 === totalCount) {
      updateState(0);
      setTrackIsActive(true);
      setActiveItem((prev) => (prev + 1 >= athkarCount ? 0 : prev + 1));
    } else {
      updateState(count + 1);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    updateState(0);
  };

  const buttonColors = useColorModeValue('orange.500', 'teal');
  const boxShadowColor = useColorModeValue('lg', 'dark-lg');

  return (
    <HStack>
      <Circle
        as='button'
        size='46px'
        fontSize='xl'
        bg={useColorModeValue('white', 'gray.300')}
        boxShadow={boxShadowColor}
        marginRight={3}
        onClick={handleReset}
      >
        {' '}<RepeatIcon color={buttonColors} />{' '}
      </Circle>
      <Circle
        as='button'
        size='64px'
        fontSize='lg'
        fontFamily='Cairo'
        fontWeight='Bold'
        bg={buttonColors}
        boxShadow={boxShadowColor}
        onClick={handleCount}
      >
        {` ${count}/${totalCount} `}
      </Circle>
    </HStack>
  );
}

export function ThekrBox({
  thekr,
  athkarCount,
  setActiveItem,
  setTrackIsActive,
  memoizedReset,
}) {
  const [thekrCount, updateThekrCount] = useState(0);

  useEffect(() => {
    updateThekrCount(0);
    memoizedReset();
  }, [thekr, memoizedReset]);

  const counterProps = {
    athkarCount,
    setActiveItem,
    setTrackIsActive,
  };

  return (
    <VStack spacing={-5}>
      <ThekrContent thekrInfo={thekr} />
      <ThekrCounter
        totalCount={parseInt(thekr.count)}
        count={thekrCount} // current count state
        updateState={updateThekrCount}
        {...counterProps}
      />
    </VStack>
  );
}

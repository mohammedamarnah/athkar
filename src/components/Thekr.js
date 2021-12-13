import { useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  Heading,
  VStack, 
  HStack, 
  Circle,
  Center,
  Text, 
  Flex,
  useColorMode,
} from "@chakra-ui/react";

export function ThekrHeader({ mode }) {
  const thekrStr = useColorModeValue("الصباح", "المساء");
  const headerColor = useColorModeValue("orange.400", "teal.300");
  const mainColor = useColorModeValue("black", "gray.300");
  return (
    <Center dir='rtl' m='3' fontSize='3xl' color={mainColor}>
      أذكار
      <Center as='span' color={headerColor}>{thekrStr}</Center>
    </Center>)
}

export function ThekrContent({ thekrInfo }) {
  const innerColor = useColorModeValue("orange.500", "teal.200");
  
  return (
    <Flex
      boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
      justifyContent="space-between"
      flexDirection="column"
      overflow="hidden"
      color={useColorModeValue("black", "gray.300")}
      bg={useColorModeValue("orange.100", "base.d100")}
      rounded={5}
      flex={1}
      p={5}
      dir="rtl"
    >
      <VStack mb={6}>
        <Heading w="full" fontSize='lg' mb={2} color={innerColor}>
          {thekrInfo.header}
        </Heading>
        <Text w="full" fontSize='sm'>
          {thekrInfo.body} 
          <Text as='span' w='full' color="gray.500" fontSize='sm'>
            {thekrInfo.subtitle}
          </Text>
        </Text>
        <Text w="full" fontSize='md' color={innerColor}>{thekrInfo.footer}</Text>
      </VStack>
    </Flex>
  )
}

export function ThekrCounter({ thekrInfo }) {
  const [thekrCount, updateThekrCount] = useState(parseInt(thekrInfo.count));

  const handleCount = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (thekrCount - 1 < 0) return;
    updateThekrCount(thekrCount - 1);
  }

  const handleReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    updateThekrCount(parseInt(thekrInfo.count));
  }

  const buttonColors = useColorModeValue("orange.500", "teal")

  return (
    <HStack>
      <Circle
        as='button'
        size='50px' f
        ontSize='xl'
        bg={useColorModeValue("white", 'gray.300')}
        boxShadow={useColorModeValue('md', 'dark-lg')}
        onClick={handleReset}> <RepeatIcon color={buttonColors} /> </Circle>
      <Circle
        as='button'
        size='50px'
        fontSize='xl'
        bg={buttonColors}
        boxShadow={useColorModeValue('md', 'dark-lg')}
        onClick={handleCount}> {thekrCount} </Circle>
    </HStack>
  )
}

export function ThekrBox({ thekr }) {
  return (
    <VStack spacing={-5}>
      <ThekrContent thekrInfo={thekr} />
      <ThekrCounter thekrInfo={thekr} />
    </VStack>
  )
}
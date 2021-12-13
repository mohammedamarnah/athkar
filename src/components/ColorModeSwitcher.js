import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Center, HStack, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";

export function ColorModeSwitcher() {
  const { _, toggleColorMode } = useColorMode();
  const initialState = useColorModeValue(false, true);
  
  return (
    <Center>
      <HStack>
        <SunIcon color='orange' />
        <Switch colorScheme='teal' onChange={toggleColorMode} isChecked={initialState}/>
        <MoonIcon color='teal' />
      </HStack>
    </Center>
  )
}
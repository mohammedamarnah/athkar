import { Center, HStack, Switch, useColorModeValue } from '@chakra-ui/react';
import {
  TashkeelIcon,
  NoTashkeelIcon,
  TashkeelWhiteIcon,
  NoTashkeelWhiteIcon,
} from '../icons/tashkeel';

export function TashkeelModeSwitcher({ currentState, updateState }) {
  const tashkeelIcon = useColorModeValue(
    <TashkeelIcon />,
    <TashkeelWhiteIcon />
  );
  const noTashkeelIcon = useColorModeValue(
    <NoTashkeelIcon />,
    <NoTashkeelWhiteIcon />
  );
  return (
    <Center>
      <HStack>
        {tashkeelIcon}
        <Switch
          colorScheme='teal'
          onChange={(e) => updateState(currentState ^ 1)}
        />
        {noTashkeelIcon}
      </HStack>
    </Center>
  );
}

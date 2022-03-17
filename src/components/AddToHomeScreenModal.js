import { PlusSquareIcon } from "@chakra-ui/icons";
import { 
  Box,
  Text,
  Image,
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";

export function AddToHomeScreenModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("orange", "teal");
  return <Center paddingBottom={3}>
    <Button colorScheme={color} variant='ghost' rightIcon={<PlusSquareIcon />} onClick={onOpen} fontFamily='Cairo'>
      إضافة للشاشة الرئيسية
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' isCentered>
      <ModalOverlay bg='none'
        backdropFilter='blur(5px)' />
      <ModalContent>
        <ModalHeader color="black">
          إضافة الأذكار للشاشة الرئيسية
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color="black">
          <Text dir="rtl">يمكنك إضافة الموقع كبرنامج على الصفحة الرئيسية من خلال الخطوات التالية:</Text>
          <Text dir="rtl">ملاحظة: متصفح Google Chrome غير مدعوم على هواتف الايفون و iOS.</Text>
          <Text>1.</Text>
          <Image src="images/step1.jpg"></Image>
          <Box margin={2} bgColor='teal.400' height={1} />
          <Text>2.</Text>
          <Image src="images/step2.PNG"></Image>
          <Box margin={2} bgColor='teal.400' height={1} />
          <Text>3.</Text>
          <Image src="images/step3.PNG"></Image>
        </ModalBody>
      </ModalContent>
    </Modal>
  </Center>
}
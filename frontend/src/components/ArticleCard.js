import React, {useState} from 'react';
import {  Flex, Avatar, Box, Text, IconButton, Button, Image, Card, CardHeader, CardBody, CardFooter, Modal, ModalHeader,ModalContent, ModalBody, ModalCloseButton, ModalFooter, ModalOverlay } from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import moment from 'moment';

export default function ArticleCard(props) {

  const [isOpen, setIsOpen] = useState(false);
  const timeSincePublished = (date) => {
    return moment(date).fromNow();
  };

    return (
   
            <div>
                    {/* {console.log(props.source_image)} */}

              
                    <Card minW='100px' minH='300px'> 

                      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Article Overview</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Image
                            objectFit='cover'
                            src={props.image}
                            alt={props.title}
                            mb={4} /* Add margin-bottom for spacing */
                          />
                          <Text>{props.title}</Text>
                          <Box>
                            <Text>{timeSincePublished(props.published_date)}</Text>
                          </Box>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
                            Close
                          </Button>
                          <Button variant="ghost" leftIcon={<BiLike />} />
                          <Button variant="ghost" leftIcon={<BiChat />} />
                          <Button variant="ghost" leftIcon={<BiShare />} />
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                        <CardHeader py={3}>
                            <Flex direction='row' spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name='Luxovant' src={props.image} size='md' />
                                </Flex>
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'
                                    icon={<BsThreeDotsVertical />}
                                />
                            </Flex>
                        </CardHeader>
                        <Box onClick={() => setIsOpen(true)}>
                        <CardBody py={0} >
                            <Text
                               fontSize="xl"
                               fontWeight="bold"
                               lineHeight="shorter"
                               minHeight="2.5em"
                               maxHeight="2.5em"
                               overflow="hidden"
                               textOverflow="ellipsis"
                              
                              >
                                {props.title}</Text>
                            <Box>
                              <Text fontSize="sm"  fontWeight="normal">
                                {timeSincePublished(props.published_date)}</Text>
                            </Box>
                        </CardBody>
                        <Image
                            objectFit='cover'
                            src={props.image}
                            alt={props.title}
                            boxSize='200px' 
                            width='270px'
                            mx={4}
                            my={0}
                            borderRadius='10px'
                            
                        />
                        </Box>
                        
          <CardFooter
            display="flex"
            justifyContent="center"
            py={0}
            px={0}
            
            sx={{
                '& > button': {
                    flex: '1',
                    minWidth: '0',
                    
                },
               
            }}
            
        >
            <Button variant="ghost" leftIcon={<BiLike />} />
            <Button variant="ghost" leftIcon={<BiChat />}  />
            <Button variant="ghost" leftIcon={<BiShare />} />
        </CardFooter>
                    </Card>
                </div>
           
       
    );
}

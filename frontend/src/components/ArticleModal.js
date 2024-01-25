import React, { useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {  Flex,
    Avatar,
    Box,
    Heading, 
    Text, 
    IconButton, 
    Button, 
    Image, 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Modal, 
    ModalHeader,
    ModalContent, 
    ModalBody, 
    ModalCloseButton, 
    ModalOverlay,
    Stack,} from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import moment from 'moment';
import BadgeComponent from './BadgeComponent';
import FacebookShare from './share/FacebookShare';
import LinkedinShare from './share/LinkedinShare';
import WhatsAppShare from './share/WhatsAppShare';
import CopyLink from './share/CopyLink';
import TwitterShare from './share/TwitterShare';

import { BiLogoTwitter, BiLogoLinkedin, BiLogoWhatsapp, BiCopy, BiLogoFacebook } from 'react-icons/bi';


export default function ArticleModal(props) {

    const modalRef = useRef();
    const timeSincePublished = (date) => {
      return moment(date).fromNow();
    };
    const tagsArray = JSON.parse(props.tags.replace(/'/g, '"'));

    const copyUrlToClipboard = () => {
        try {
          navigator.clipboard.writeText(props.url);
          alert('URL copied to clipboard successfully!');
        } catch (error) {
          alert('Error copying URL to clipboard.');
        }
      };
    
      
      const closeModal = () => {
        props.onClose(); // Call the onClose prop to close the modal
      };

return(
  
<Modal isOpen  onClose={closeModal}>
<ModalOverlay />
<ModalContent w="90%" maxW="900px">
  <ModalHeader >
  <Flex direction='row' spacing='3' >
         
          <a href={props.url} target='_blank'>
            <Button
             ml={570} 
             mr={100}
            fontSize="sm" 
            px={2}
            bg={'gray.200'}
            color={'black'}
            rounded={'xl'}
            _hover={{
              bg: 'gray.400',
            }}
            _focus={{
              bg: 'gray.400',
            }}>
            Read post  <ExternalLinkIcon mx='2px' />
          </Button>
          </a>
          <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
          />
      </Flex>
  </ModalHeader>
  <ModalCloseButton />
  <ModalBody>

    <Flex direction="row" h="100%" gap={10}  >
      <Flex flex="5" direction="column" borderRight="1px solid gray">
      <Card>
      <CardHeader>
        <Heading size='md'>{props.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{props.description}</Text>
      </CardBody>
      
  </Card>

    <Stack align="center" justify="center" direction="row" mt={6} flexWrap='wrap'>
      {tagsArray.map((tag, index) => (
      <BadgeComponent key={index} tag={tag} />
    ))}
  </Stack>
    <Text m={4}><span >• </span>{timeSincePublished(props.published_date)}</Text>
        <Image

         mx={3}
         my={3}
         borderRadius='10px'
          objectFit="cover"
          src={props.image}
          alt={props.title}
          mb={4} 
        />

        <Card mt={7} >
          
          <CardBody mx={12}>
            <Flex direction='row'  justifyContent="space-between">
              <Button variant="ghost" leftIcon={<BiLike />} />
              <Button variant="ghost" leftIcon={<BiChat />}  />
              <Button variant="ghost" leftIcon={<BiShare />} />
            </Flex>
          </CardBody>
          
        </Card>
        
      </Flex>
      <Flex flex="3" justifyContent="flex-start" alignItems="center" direction="column">
        <Card>
          <CardHeader>
            <Heading size='sm' textAlign='center' mb={-5} >source</Heading>
          </CardHeader>
          <CardBody mx={12}>
            <Flex direction='row' gap={2}>
            <Avatar name='Luxovant' src={props.source_image} size='md' width='32px' height='32px' />
            <Text>{props.source}</Text>
            </Flex>
          </CardBody>
          
        </Card>
        <Card mt={7} >
          <CardHeader>
            <Heading size='sm' textAlign='center' >share with friends</Heading>
          </CardHeader>
          <CardBody mx={12}>
            <Flex direction='row' justifyContent='space-between'>
              {/* <CopyLink/>
              <TwitterShare/>
              <FacebookShare/>
              <WhatsAppShare/>
              <LinkedinShare/> */}

               {/* Twitter share */}
<IconButton
variant="ghost"
colorScheme="blue"
aria-label="Share on Twitter"
icon={<BiLogoTwitter />}
onClick={() => {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    props.title
  )}&url=${encodeURIComponent(props.url)}`;
  window.open(shareUrl, '_blank');
}}
/>

{/* LinkedIn share */}
<IconButton
variant="ghost"
colorScheme="blue"
aria-label="Share on LinkedIn"
icon={<BiLogoLinkedin />}
onClick={() => {
  const shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
    props.url
  )}&title=${encodeURIComponent(props.title)}`;
  window.open(shareUrl, '_blank');
}}
/>

{/* WhatsApp share */}
<IconButton
variant="ghost"
colorScheme="green"
aria-label="Share on WhatsApp"
icon={<BiLogoWhatsapp />}
onClick={() => {
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    props.title + ' ' + props.url
  )}`;
  window.open(shareUrl, '_blank');
}}
/>

{/* Copy URL */}
<IconButton
variant="ghost"
colorScheme="gray"
aria-label="Copy URL"
icon={<BiCopy />}
onClick={copyUrlToClipboard}
/>
{/* Facebook share */}
<IconButton
variant="ghost"
colorScheme="blue"
aria-label="Share on Facebook"
icon={<BiLogoFacebook />}
onClick={() => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    props.url
  )}`;
  window.open(shareUrl, '_blank');
}}
/>

            </Flex>
          </CardBody>
          
        </Card>
       
      </Flex>
    </Flex>
  </ModalBody>
  
</ModalContent>
</Modal>


)
}
import React, { useState } from 'react';
import {
  Flex,
  Avatar,
  Box,
  Text,
  IconButton,
  Button,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import moment from 'moment';
import ArticleModal from './ArticleModal';

export default function ArticleCard(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const timeSincePublished = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div>
      <Card minW="100px" minH="300px">
        <CardHeader py={3}>
          <Flex direction="row" spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Luxovant" src={props.source_image} size="md" width="32px" height="32px" />
            </Flex>
            <a href={props.url} target="_blank" rel="noopener noreferrer">
              <Button
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
                }}
              >
                Read post <ExternalLinkIcon mx="2px" />
              </Button>
            </a>
            <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
          </Flex>
        </CardHeader>
        <Box onClick={openModal} cursor="pointer">
          <CardBody py={0}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              lineHeight="shorter"
              minHeight="2.5em"
              maxHeight="2.5em"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {props.title}
            </Text>
            <Box>
              <Text fontSize="sm" fontWeight="normal">
                {timeSincePublished(props.published_date)}
              </Text>
            </Box>
          </CardBody>
          <Image
            objectFit="cover"
            src={props.image}
            alt={props.title}
            boxSize="200px"
            width="270px"
            mx={4}
            my={0}
            borderRadius="10px"
          />
          <CardFooter display="flex" justifyContent="center" py={0} px={0} 
sx={{
  '& > button': {
      flex: '1',
      minWidth: '0',
      
  },
 
}}>
            <Button variant="ghost" leftIcon={<BiLike />} />
            <Button variant="ghost" leftIcon={<BiChat />} />
            <Button variant="ghost" leftIcon={<BiShare />} />
          </CardFooter>
        </Box>
      </Card>

      {modalOpen && (
        <ArticleModal {...props} onClose={closeModal} />
      )}
    </div>
  );
}

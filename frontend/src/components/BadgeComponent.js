import React from 'react';
import { Badge } from '@chakra-ui/react';

function BadgeComponent ({ tag }) {
  return (
    <Badge
      px={2}
      py={1}
      bg="gray.200"
      color="black"
      fontWeight="400"
      mr={2}
      rounded={'xl'}
    >
      #{tag}
    </Badge>
  );
}

export default BadgeComponent;

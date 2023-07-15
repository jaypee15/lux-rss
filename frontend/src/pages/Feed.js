import ArticleList from '../components/ArticleList';
import SidebarWithHeader from '../components/Sidebar';

import { Grid, GridItem, Flex, Box, Spacer } from '@chakra-ui/react'


function Feed() {

  
  return (
    <div className="Feed" style={{ background: '#0b1626' }}>

        <Grid
        templateAreas={`"header header"
                        "nav main"
                        `}
        gridTemplateRows={'50px 1fr 30px'}
        gap='1'
        fontWeight='bold'
        
        >
        <GridItem pl='2'  area={'header'}>
            <SidebarWithHeader/>
        </GridItem>
        <GridItem pl='20'  area={'main'} >
            <Flex>
                <Box p='4' ml='12' mt='12'>
                    <ArticleList/>
                </Box>
                <Spacer />
            </Flex>
            
        </GridItem>
        </Grid>
        
      
    </div>
  );
}

export default Feed;


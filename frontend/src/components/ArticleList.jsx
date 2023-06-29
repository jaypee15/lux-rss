import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import ArticlesCard from "./ArticleCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  function fetchArticles() {
    axios({
      method: "GET",
      url: "/articles",
    })
      .then((response) => {
        const data = response.data;
        setArticles(data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <Box>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={6}>
        {articles &&
          articles.map((article) => (
            <ArticlesCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              url={article.link}
              published_date={article.published_date}
              image={article.image}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
}

export default ArticleList;

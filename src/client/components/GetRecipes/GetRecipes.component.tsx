import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { Box, Button } from "@chakra-ui/core";
import { RecipeCard } from "../RecipeCard/RecipeCard.component";
import { RECIPES_QUERY } from "../../gql/recipes";
import InfiniteScroll from "react-infinite-scroller";

export const GetRecipes = ({
  isArchived = false,
  orderBy = "published_desc",
  first = 5,
  offset = 0,
  ...filter
}) => {
  const router = useRouter();
  const tag = router.query.tag;
  const q = router.query.q;

  if (tag) {
    filter = {
      ...filter,
      tags_single: { name_contains: tag },
    };
  }
  if (q) {
    filter = {
      ...filter,
      name_contains: q,
    };
  }

  const recipes = useQuery(RECIPES_QUERY, {
    variables: {
      isArchived: isArchived,
      orderBy: orderBy,
      first: first,
      offset: offset,
      filter: filter,
    },
  });

  const handleFetchMore = () => {
    recipes.fetchMore({
      variables: {
        offset: recipes.data.Recipe.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        //@ts-ignore
        console.log(recipes.data.Recipe.length);
        return Object.assign({}, prev, {
          //@ts-ignore
          Recipe: [...prev.Recipe, ...fetchMoreResult.Recipe],
        });
      },
    });
  };

  return (
    <Box>
      {recipes.loading && !recipes.error && <p>Loading...</p>}
      {recipes.error && !recipes.loading && (
        <p>Error: {JSON.stringify(recipes.error)}</p>
      )}

      {recipes.data && !recipes.loading && !recipes.error && (
        <InfiniteScroll
          pageStart={0}
          loadMore={handleFetchMore}
          hasMore={true}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {recipes.data.Recipe.map((recipe: any) => (
            <RecipeCard key={recipe.recipeId} {...recipe} />
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
};

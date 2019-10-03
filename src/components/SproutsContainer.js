import React, { useState } from 'react';
import RandomSprout from './RandomSprout';
import SproutsIndex from './SproutsIndex';

const SproutsContainer = (props) => {
  const [recipe, setRecipe] = useState("")
  const [recipes, setRecipes] = useState([])

  const getRandomRecipe = () => {
    fetch('/api/v1/random-recipe')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let randomRecipe = body
      setRecipe(randomRecipe)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const getAllRecipes = (formPayload) => {
    fetch('/api/v1/recipes', {
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let allRecipes = body
      setRecipes(allRecipes)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const handleRandomClick = () => {
    getRandomRecipe();
    setRecipes([])
  }

  const handleIndexClick = () => {
    getAllRecipes();
    setRecipes([])
  }

  return(
    <div className="container">
      <h1>Sprout Fetcher</h1>
      <RandomSprout
        recipe={recipe}
      />
      <SproutsIndex
        recipes={recipes}
      />

      <div className="buttons">
        <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

        <button onClick={handleIndexClick} className="btn">See All Recipes</button>
      </div>
    </div>
  )
}

export default SproutsContainer;

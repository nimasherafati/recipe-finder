import React from "react";
import { Recipe } from "@/types/recipe";

const RecipeCard : React.FC<{recipe : Recipe}> = ({recipe}) => {
     return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-600">{recipe.strCategory} • {recipe.strArea}</p>
      </div>
    </div>
  );
}

export default RecipeCard;
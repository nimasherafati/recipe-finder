'use client'
import { useState , useCallback } from "react"
import SearchBar from "@/components/SearchBar"
import RecipeCard from "@/components/RecipeCard"
import { Recipe } from "@/types/recipe";
import { debounce } from "lodash";


export default function Home() {
  const [searchTerm,setSearchTerm] = useState('');
  const [recipes,setRecipes] = useState<Recipe[]>([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  const fetchRecipes = async () => {
    if(!searchTerm.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      setError('something went wrong!')
    }
    finally{
      setLoading(false);
    }
  }

  const debounceFetchRecipes = useCallback(
    debounce((query:string) => {
      fetchRecipes;
    },500)
    ,[])

  return (
     <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍽️ Recipe Finder</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={fetchRecipes}
      />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="text-center text-gray-500">No recipes found. Try a different search.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </main>
  )
}

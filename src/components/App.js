import { useEffect, useState } from "react";
import mainApi from "../utils/mainApi";
import Dish from "./Dish";
import Main from "./Main";
import { Routes, Route} from "react-router-dom";
import Loader from "./Loader";

function App() {
  const recipesApi = new mainApi({
    baseUrl: 'https://dummyjson.com'
  })

  const [recipes, setRecipes] = useState(localStorage.getItem('recipes'));
  
  useEffect(() => {
    if(!recipes){
      recipesApi.getAllRecipes()
        .then((recipes) => {
          localStorage.setItem('recipes', JSON.stringify(recipes));
          setRecipes(recipes);
        })
        .catch((err) => {
            console.log(`Ошибка:${err}. Запрос не выполнен`);
        })
    }
  }, [])

  return (
    <div className="page">
    {recipes ? 
      <Routes>
        <Route exact path ="/" element={
          <Main />
          }>
        </Route>
        <Route exact path ="/dish" element={
            <Dish />
          }>  
        </Route>
      </Routes> : <Loader />
      }
    </div>
  );
}

export default App;

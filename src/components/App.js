import { useEffect } from "react";
import mainApi from "../utils/mainApi";
import Dish from "./Dish";
import Main from "./Main";
import { Routes, Route} from "react-router-dom";

function App() {
  const recipesApi = new mainApi({
    baseUrl: 'https://dummyjson.com'
  })


  useEffect(() => {
    recipesApi.getAllRecipes()
    .then((recipes) => {
      localStorage.setItem('recipes', JSON.stringify(recipes));
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, [])

  return (
    <div className="page">
      <Routes>
        <Route exact path ="/" element={
          <Main />
          }>
        </Route>
        <Route exact path ="/dish" element={
            <Dish />
          }>  
        </Route>
      </Routes>
      </div>
  );
}

export default App;

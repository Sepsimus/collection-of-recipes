import { useEffect } from "react";
import mainApi from "../utils/mainApi";
import Dish from "./Dish";
import Header from "./Header";
import Main from "./Main";

function App() {
  const recipesApi = new mainApi({
    baseUrl: 'https://dummyjson.com'
  })

  useEffect(() => {
    recipesApi.getAllRecipes()
    .then((recipes) => {
      localStorage.setItem('recipes', JSON.stringify(recipes))
    })
    .catch((err) => {
        console.log(`Ошибка:${err}. Запрос не выполнен`);
    })
  }, [])

  return (
    <div className="page">
      <Header />
      <Main />
      {/* <Dish /> */}
    </div>
  );
}

export default App;

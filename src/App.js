import SearchPage from "./Component/Search/SearchPage"
// import LoadingPage from "./Component/Loading/LoadingPage";

import DetailPage from "./Component/Detail/DetailPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path : "/",
      element : <SearchPage/>
    },
    {
      path : "/PokemonDetails/:id",
      element : < DetailPage/>
    },
    
  ])
  return(
      <RouterProvider router={routes}/>
  )
}

export default App;

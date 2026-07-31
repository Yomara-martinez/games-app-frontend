import { useState } from 'react'
import { Route, Routes } from "react-router"
import HomePage from "./pages/homePage"
import CreateReview from "./pages/createReview"
import ReviewPage from "./pages/reviewPage"
import WanToPlay from "./pages/wanToPlay"
import PlayedList from "./pages/playedList"
import NavBar from "./components/Navbar"
import './App.css'

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
    <NavBar search={search} setSearch={setSearch}/>
<main>
  <Routes>
    <Route path= "/" element={<HomePage search={search}/>} />
    <Route path= "/create" element={<CreateReview/>} />
    <Route path= "/:id" element={<ReviewPage/>} />
    <Route path= "/:id/playlist" element={<WanToPlay/>} />
    <Route path= "/:id/playedlist" element={<PlayedList/>} />
     <Route path= "*" element={<HomePage search={search}/>} />
  </Routes>
</main>
   </> 
   )
}

export default App

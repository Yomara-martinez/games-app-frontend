import { useState } from 'react'
import homePage from "./pages/homePage"
import createReview from "./pages/createReview"
import reviewPage from "./pages/reviewPage"
import wanToPlay from "./pages/wanToPlay"
import playedList from "./pages/playedList"
import './App.css'

function App() {

  return (
    <>
<main>
  <Routes>
    <Route path= "/" element={<HomePage/>} />
    <Route path= "/create" element={<createReview/>} />
    <Route path= "/id" element={<reviewPage/>} />
    <Route path= "/id/playlist" element={<wanToPlay/>} />
    <Route path= "/id/playedlist" element={<playedList/>} />
     <Route path= "*" element={<HomePage/>} />
  </Routes>
</main>
   </> 
   )
}

export default App

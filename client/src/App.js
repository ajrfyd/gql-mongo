import React from "react";
import Headers from "./components/Headers";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";
import Projects from "./components/Projects";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const App = () => {
  
  return (
    <>
      <Headers />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/project/:id' element={<Project />}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
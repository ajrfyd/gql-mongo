import React from "react";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

const Home = () => {

  return (
    <>
      <div>
        <AddClientModal className='d-flex gap-3 mb-4'/>
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  )
}

export default Home;
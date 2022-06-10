import React from "react";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { data, error, loading } = useQuery(GET_PROJECTS);

  console.log(data);
  if(loading) return <Spinner />
  if(error) return <p>Something Went Wrong!</p>
  return (
    <>
      {
        data.projects.length > 0 ? (
          <div className='row mt-4'>
            {
              data.projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            }
          </div>
        ) : <p>No Projects</p>
      }
    </>
  )
}

export default Projects;
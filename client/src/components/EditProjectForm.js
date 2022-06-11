import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutation";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [desc, setDesc] = useState(project.description);
  const [status, setStatus] = useState('');
  
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description: desc,
      status
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
  })

  const onSubmit = (e) => {
    e.preventDefault();
    if(!name || !desc || !status) {
      return alert('Please fill out all fields')
    }

    updateProject(name, desc, status);
  }

  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Description</label>
        <textarea
          className='form-control'
          id='desc'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        >
        </textarea>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Status</label>
        <select 
          id="status" 
          className='form-select' 
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="new">Not Started</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default EditProjectForm;
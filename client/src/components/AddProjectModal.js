import React, { useState, useRef } from "react";
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";

const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const dateRef = useRef('');
  const dateHandler = (e) => {
    dateRef.current.value = e.target.value;
  }

  const { data, loading, error } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description: desc, status, clientId},
    update: (cache, { data: { addProject }}) => {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS
      });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject]}
      })
    }
  })
  // const [addClient] = useMutation(ADD_CLIENT, {
  //   variables: { name, email, phone },
  //   update(cache, { data: { addClient } }) {
  //     const { clients } = cache.readQuery({
  //       query: GET_CLIENTS
  //     });
  //     cache.writeQuery({
  //       query: GET_CLIENTS,
  //       data: { clients: [...clients, addClient] }
  //     })
  //   }
  // })

  const onSubmit = (e) => {
    e.preventDefault();
    if(name === '' || desc === '' || status === '') {
      return alert('Please fill in the fields');
    }

    addProject(name, desc, status, clientId);

    setName('');
    setDesc('');
    setStatus('new');
    setClientId('');
  }

  if(loading) return null;
  if(error)return `Something Went Wrong!`

  return (
      <>
        {
          !loading && !error && (
            <>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#addProjectModal'
              >
                <div className='d-flex align-items-center'>
                  <FaList className='icon' />
                  <div>New Project</div>
                </div>
              </button>

              <div
                className='modal fade'
                id='addProjectModal'
                aria-labelledby='addProjecttModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title' id='addClientModalLabel'>
                        New Project
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
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

                        <div className='mb-3'> 
                          <label id='form-label'>
                            Client
                          </label>
                          <select 
                            className='form-select' 
                            id="clientId" 
                            value={clientId}
                            onChange={e => setClientId(e.target.value)}
                          >
                            {
                              data.clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>  )
                            }
                          </select>
                        </div>

                        <div className='mb-3'>
                          <input 
                            type="date" 
                            className='w-100' 
                            ref={dateRef} 
                            min='1989-05-21'
                            max='2030-05-21'
                            onChange={e => dateHandler(e)}
                          />
                        </div>

                        <div className='mb-3'>
                          <input type="range" className='w-100' min='60'/>
                        </div>

                        <button
                          type='submit'
                          data-bs-dismiss='modal'
                          className='btn btn-primary'
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </>
  )
}

export default AddProjectModal;
import React from 'react'
import image from '../../image2.jpg';
import './Task.scss';
function Task() {
  return (
    <li className='task-item'>
              {<img src={image} alt='this is alt'/>}
              </li>
  )
}

export default Task
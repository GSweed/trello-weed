import React from 'react'
import './Column.scss';
import Card from '../Card/Card';
import { mapOrder } from 'utilities/sorts';
function Column(props) {
  const { column } = props
  //sort card
  const cards = mapOrder(column.cards, column.cardOder, 'id')
  return (
    <div className='column'>
            <header>{column.title}</header>
            <ul className='Card-list'>
              {cards.map((card, index) => <Card key={index} card = {card} />)}
               
              
            </ul>
            <footer>Add another card</footer>
          </div>   
  )
}

export default Column
import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from "react-smooth-dnd";
import './Column.scss'
import Card from '../Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal';
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form, Button } from 'react-bootstrap';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants';
import { saveContentAfterEnter, selectAllInlineText } from 'utilities/contentEdit';
import {cloneDeep} from 'lodash';
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  //sort card
  const cards = mapOrder(column.cards, column.cardOder, 'id')
  const onConfirmModalAction = (type) => {
    if(type === MODAL_ACTION_CONFIRM){
        const newColumn = {
          ...column,
          _destroy: true,
        }
        onUpdateColumn(newColumn)
    }

    toggleShowConfirmModal()
  }
  //set state hien thi confirm modal
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () =>{
    setShowConfirmModal(!showConfirmModal)
  }
  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)// defaule la false de an khong cho hien form them moi new card
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    //onclick => khi openNewCardForm la false thi set la true va nguoc lai
  
  }
  const newCardTextAreaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value) //41-42 de lay value cua input

  useEffect(() =>{
    setColumnTitle(column.title)
  },[column.title])

  useEffect(() => {
    if(newCardTextAreaRef && newCardTextAreaRef.current)
    {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
      
    }
  },[openNewCardForm])// moi khi openNewColumnForm thay doi se focus vao input
  
  const handleColumnTitleBlur = () =>{
    const newColumn = {
      ...column,
      title: columnTitle,
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus()
      return
    }//khi khong nhap gi vao input thi van se focus vao input

    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      columnId:column.id,
      title: newCardTitle.trim(),
      cover:null
      
    }

    let newColumn = cloneDeep(column) //clone cac column trong state
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOder.push(newCardToAdd.id)
    
    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  return (
    <div className='column'>
      <header className='column-drag-handle'>
        <div className='column_title'>
        <Form.Control 
              size='sm' 
              type='text' 
              className='weed-content-edit'
              value={columnTitle}
              spellCheck="false"
              onClick={selectAllInlineText}
              onChange={handleColumnTitleChange}
              onBlur={handleColumnTitleBlur}
              onKeyDown = {saveContentAfterEnter}
              onMouseDown={e => e.preventDefault()}
              />  
        </div>
        <div className='column_dropdown_actions'>
          <Dropdown>
            <Dropdown.Toggle size='sm' className='dropdown-btn' id="dropdown-basic"/>

            <Dropdown.Menu >
              <Dropdown.Item onClick={toggleOpenNewCardForm}>Add Card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column</Dropdown.Item>
              <Dropdown.Item >Move all card in this column</Dropdown.Item>
              <Dropdown.Item >Archive all card in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
      </header>
      <div className='Card-list'>
      <Container
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'card-drop-preview' 
                    }}
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholderAnimationDuration={200}
                  >
        {cards.map((card, index) => (
          <Draggable key ={index}>
            <Card card = {card}/>
          </Draggable>
        ))}
        </Container>
        {openNewCardForm && 
          <div className='add-new-card-area'>
          <Form.Control 
                size='sm' 
                as='textarea'
                rows={3} 
                placeholder='Enter a Title for this card'
                className='textarea-enter-new-card'
                ref={newCardTextAreaRef}
                value={newCardTitle}
                onChange={onNewCardTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewCard()}
          />
          </div>
        }
        
      </div>
      <footer>
      {openNewCardForm && 
          <div className='add-new-card-actions'>
              <Button variant="success" size='sm' onClick={addNewCard}>Add Card</Button>
              <span className='cancel-icon' onClick={toggleOpenNewCardForm}>
                <i className='fa fa-trash icon'/>
              </span>
          </div>
        }
        {!openNewCardForm && 
          <div className='footer-actions' onClick={toggleOpenNewCardForm}>
          <i className='fa fa-plus icon'/> Add another card
          </div>
        }
        
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title='remove Column'
        content={`Are you sure to remove column ${column.title}`}
      />
    </div>
  )
}

export default Column
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from "react-smooth-dnd";
import './Column.scss'
import Card from '../Card/Card'
import ConfirmModal from 'components/Common/ConfirmModal';
import { mapOrder } from 'utilities/sorts'
import { Dropdown, Form } from 'react-bootstrap';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants';
import { saveContentAfterEnter, selectAllInlineText } from 'utilities/contentEdit';
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
  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value),[])
  useEffect(() =>{
    setColumnTitle(column.title)
  },[column.title])

  
  const handleColumnTitleBlur = () =>{
    const newColumn = {
      ...column,
      title: columnTitle,
    }
    onUpdateColumn(newColumn)
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
              <Dropdown.Item >Add Card</Dropdown.Item>
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
      </div>
      <footer>
        <div className='footer-actions'>
       <i className='fa fa-plus icon'/> Add another card
       </div>
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
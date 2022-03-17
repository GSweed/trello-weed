import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Container, Draggable } from "react-smooth-dnd";
import {Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { applyDrag } from 'utilities/dragDrop';
import _ from 'lodash';
import './BoardContent.scss';
import Column from '../Column/Column';
import { mapOrder } from 'utilities/sorts';
import { initialData } from 'actions/initialData';
function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)// defaule la false de an khong cho hien form them moi new column

  const newColumnInputRef = useRef(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = useCallback((e) =>{setNewColumnTitle(e.target.value)},[])
  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if(boardFromDB){
      setBoard(boardFromDB)
      //sort column
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOder, 'id'))
    }
  },[])
  useEffect(() => {
    if(newColumnInputRef && newColumnInputRef.current)
    {
      newColumnInputRef.current.focus()
    }
  },[openNewColumnForm])// moi khi openNewColumnForm thay doi se focus vao input
  if(_.isEmpty(board)){
    return <div className='not-found'>Board not found</div>
  }
  const onColumnDrop = (dropResult) =>{
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = {...board}
    newBoard.columnOder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){

      let newColumns = [...columns]
      
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOder = currentColumn.cards.map(i => i.id)

      setColumns(newColumns)
    }
  }

  const toggleOpenNewColumnForm = () => {
      setOpenNewColumnForm(!openNewColumnForm)
      //onclick => khi openNewColumnForm la false thi set la true va nguoc lai
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }//khi khong nhap gi vao input thi van se focus vao input

    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOder:[],
      cards:[]
    }

    let newColumns = [...columns] //clone cac column trong state
    newColumns.push(newColumnToAdd)//add column moi vao cuoi bang

    let newBoard = {...board}
    newBoard.columnOder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }

  const onUpdateColumn = (newColumnToUpdate) =>{
      const columnIdToUpdate = newColumnToUpdate.id

      let newColumns = [...columns]
      
      const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)

      if(newColumnToUpdate._destroy){
          newColumns.splice(columnIndexToUpdate, 1)
      }else{
        newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
      }
      let newBoard = {...board}
      newBoard.columnOder = newColumns.map(c => c.id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
  }

  return (
    <div className='board-content'>
      <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]
          }
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
          {columns.map((column, index) => (
            <Draggable key ={index}>
                <Column  column = {column} onCardDrop = {onCardDrop} onUpdateColumn={onUpdateColumn}/>
            </Draggable>
            
          ))}
        </Container>
        <BootstrapContainer className='trello-weed-container'>
          {!openNewColumnForm &&
            
            <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
              <i className='fa fa-plus icon'/> Add another column
            </Col>
            </Row>
            //khi ! openNewColumnForm thi hien
          }
          {openNewColumnForm &&
          <Row>
          <Col className='enter-new-column'>
            <Form.Control 
              size='sm' 
              type='text' 
              placeholder='Enter Column Title'
              className='input-enter-new-column'
              ref={newColumnInputRef}
              value={newColumnTitle}
              onChange={onNewColumnTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewColumn()}/>
            <Button variant="success" size='sm' onClick={addNewColumn}>Add Column</Button>{' '}
            <span className='cancel-new-column' onClick={toggleOpenNewColumnForm}>
              <i className='fa fa-trash icon'/>
            </span>
          </Col>
        </Row>
          //onkeydown khi an enter thi them column
          // khi openNewColumnForm thi hien
          }
        </BootstrapContainer>
              
        </div>
  )
}

export default BoardContent
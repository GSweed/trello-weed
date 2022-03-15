import React, {useState, useEffect} from 'react'
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from 'utilities/dragDrop';
import _ from 'lodash';
import './BoardContent.scss';
import Column from '../Column/Column';
import { mapOrder } from 'utilities/sorts';
import { initialData } from 'actions/initialData';
function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if(boardFromDB){
      setBoard(boardFromDB)
      //sort column
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOder, 'id'))
    }
  },[])
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
                <Column  column = {column} onCardDrop = {onCardDrop}/>
            </Draggable>
            
          ))}
        </Container>
        <div className='add-new-column'>
        <i className='fa fa-plus icon'/> Add another column
        </div>
              
        </div>
  )
}

export default BoardContent
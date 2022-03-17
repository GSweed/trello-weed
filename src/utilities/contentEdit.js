  //sellect all value input when click

export const selectAllInlineText = (e) => {
    e.target.focus()
    e.target.select()
  }
//save when click eenter
export const saveContentAfterEnter = (e) =>{
    if(e.key === 'Enter'){
      e.target.preventDefault()
      e.target.blur()
    }
  }
document.addEventListener('DOMContentLoaded', ()=>{
  //the elements
  const taskForm=document.getElementById('create-task-form')
  const taskdescription=document.getElementById('new-task-description')
  const myTask=document.getElementById('tasks')
   
  const priorityDropdown=document.createElement('select')
  const levels=['high','medium','low']
    levels.forEach(level=>{
    const option =document.createElement('option')
    option.value=level
    option.textContent=level[0].toUpperCase()+ level.slice(1)
    priorityDropdown.appendChild(option)
    
  });

   //insert dropdown
   taskForm.insertBefore(priorityDropdown,taskForm.querySelector("[type='submit']"))
  //listen for form submission
  taskForm.addEventListener('submit',(event)=>{
    //prevents the page from refreshing
     event.preventDefault()
       //removes any spaces that might be on the inputed task
     const theTask=taskdescription.value.trim()
     //checks is the user keyed in anything
     if(theTask!==''){
      //create a new list item
      const list=document.createElement('li')
     //selected priority
     const selectedPriority=priorityDropdown.value
     // task text and priority
     if(selectedPriority==='high'){
      list.style.color='red'
     }else if(
      selectedPriority==='medium'){
        list.style.color='orange'
      }else{
        list.style.color='green'
      }

      const taskText=document.createElement('span')
      taskText.textContent=theTask
      list.appendChild(taskText)
    
      //create delete button
      const deletebutton=document.createElement('button')
      deletebutton.textContent='DEL'
      //add event listener to delete button
      deletebutton.addEventListener('click',()=>{
        list.remove()
      })

      //append button to the list
      list.appendChild(deletebutton)
      //add it to the mytask list
      myTask.appendChild(list)
      //then clear the input field
      taskdescription.value=''
     }
  })
})
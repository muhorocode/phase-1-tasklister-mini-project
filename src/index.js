document.addEventListener('DOMContentLoaded', ()=>{
  //get important elements from the DOM
  const taskForm=document.getElementById('create-task-form')
  const taskdescription=document.getElementById('new-task-description')
  const myTask=document.getElementById('tasks')
  // the priority dropdown
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
   //sort buttons
   const sortAscendButton=document.createElement('button')
   sortAscendButton.textContent='sort ascending'
   const sortDescendingButton=document.createElement('button')
   sortDescendingButton.textContent='sort descending'
   taskForm.appendChild(sortAscendButton)
   taskForm.appendChild(sortDescendingButton)
   // enlarge fonts
   sortAscendButton.style.fontSize=sortDescendingButton.style.fontSize='12px'
   //store tasks
   const tasks=[]
  
     // task text priority to color
     function getPriorityColor(priority){
      if (priority==='high') return 'red'
      if(priority==='medium') return 'orange'
      return 'green'
     }
       // priority value
      function priorityValue(priority){
       if(priority==='high')return 1
       if(priority==='medium')return 2
       return 3
      }
      //render tasks to the DOM
     function renderTasks(){
      myTask.innerHTML=''
     tasks.forEach(task=>{
      const list=document.createElement('li')
      list.style.color=getPriorityColor(task.priority)

    const taskText=document.createElement('span')
      taskText.textContent=task.description
      list.appendChild(taskText)
    
      //create delete button
      const deletebutton=document.createElement('button')
      deletebutton.textContent='DEL'
      //add event listener to delete button
      deletebutton.addEventListener('click',()=>{
        const index=tasks.indexOf(task)
        if(index!==-1){
          //remove from array
          tasks.splice(index, 1)
          renderTasks()
        }
      })
       //append button to the list
      list.appendChild(deletebutton)
      //add it to the mytask list
      myTask.appendChild(list)
     })
    }
     //listen for form submission
     taskForm.addEventListener('submit',(event)=>{
    //prevents the page from refreshing
     event.preventDefault()
       //removes any spaces that might be on the inputed task
     const theTask=taskdescription.value.trim()
          //selected priority
     const selectedPriority=priorityDropdown.value

     //checks is the user keyed in anything
     if(theTask!==''){
     // add task object to array
     tasks.push({
      description:theTask,
      priority:selectedPriority
     })

     taskdescription.value=''
     renderTasks()
    }
  })
      //sorting
      sortAscendButton.addEventListener('click', (event)=>{
         event.preventDefault()
         tasks.sort((a,b)=>priorityValue(a.priority)-priorityValue(b.priority))
         renderTasks()
      })

      sortDescendingButton.addEventListener('click', (event)=>{
           event.preventDefault()
           tasks.sort((a,b)=>priorityValue(b.priority)-priorityValue(a.priority))
           renderTasks()
  })
})




    
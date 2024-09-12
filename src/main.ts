const inputElem = document.querySelector<HTMLInputElement>('#input-box')
const formElem = document.querySelector<HTMLFormElement>('form')
const ulElem = document.querySelector<HTMLUListElement>('ul')

type Task = {
  id: number
  title: string
  isDone: boolean
}

let tasks: Task[] = fetchData()

//====Form Event
formElem?.addEventListener('submit', (e) => {
  e.preventDefault()
  if (inputElem && inputElem.value === '') {
    alert('Please provide some text')
  } else if (inputElem) {
    addTask(inputElem.value)
    inputElem.value = ''
  }
})

//====Add Task

function addTask(text: string): void {
  tasks = [...tasks, { id: Math.random(), title: text, isDone: false }]
  renderTask()
  addToStorage()
}

//====Render Task
function renderTask(): void {
  if (ulElem) {
    ulElem.innerHTML = ''
  }
  tasks.forEach(({ id, title, isDone }) => {
    if (ulElem) {
      ulElem.innerHTML += `
      <li>
        <div><input type="checkbox" data-id="${id}" ${
        isDone ? 'checked' : ''
      } /><span class="sms">${title}</span></div>
        <button class='delete-btn' data-id="${id}">Delete</button>
      </li>`
    }
  })
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      let id = btn.getAttribute('data-id')
      if (id) {
        deleteTask(Number(id))
      }
    })
  })
  document.querySelectorAll('input[type="checkbox"]').forEach((btn) => {
    btn.addEventListener('change', () => {
      let id = btn.getAttribute('data-id')
      if (id) {
        editTask(Number(id))
      }
    })
  })
}

//====Delete Task
function deleteTask(id: number): void {
  tasks = tasks.filter((item) => item.id !== id)
  renderTask()
  addToStorage()
}

//====Edit Task
function editTask(id: number): void {
  tasks = tasks.map((item) =>
    item.id === id ? { ...item, isDone: !item.isDone } : item
  )
  renderTask()
  addToStorage()
}

//====Add To Storage
function addToStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
//====Fetch From Storage
function fetchData(): Task[] {
  const data = localStorage.getItem('tasks')
  return data ? JSON.parse(data) : []
}

renderTask()

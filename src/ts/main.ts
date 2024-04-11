import { TodoList } from './TodoList';

// Skapa en ny instans av TodoList-klassen
const todoList = new TodoList();

// Vänta tills DOM är inladdat och lägg till händelsehanterare
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form') as HTMLFormElement;

    // Lägg till en händelsehanterare för formulärinskick
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Förhindra standardinskick av formulär
        const formData = new FormData(form); // Skapa en FormData-instans med formulärdata
        const todo = formData.get('todo') as string;
        const prio = parseInt(formData.get('prio') as string);
        addTodo(todo, prio);
    });
});

// Funktion för att lägga till en ny todo
function addTodo(task: string, priority: number): void {
    const added = todoList.addTodo(task, priority);
    if (!added) {
        alert("Du måste fylla i en todo!");
    }
    loadTodos();
}

// Funktion för att ladda todos från todo-listan och skriv ut till DOM
function loadTodos(): void {
    const todos = todoList.getTodos(); // Hämta listan över todos
    const prio1 = document.querySelector("#prio-1") as HTMLUListElement;
    const prio2 = document.querySelector("#prio-2") as HTMLUListElement;
    const prio3 = document.querySelector("#prio-3") as HTMLUListElement;

    console.log(todoList)

    if (prio1 || prio2 || prio3) {
        prio1.innerHTML = "";
        prio2.innerHTML = "";
        prio3.innerHTML = "";

        // Loopa igenom todo-arrayen och skriv ut till DOM
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo';
            li.innerHTML = `<p>${todo.task}</p>`;

            const p = li.querySelector('p')!;

            const checkbox = document.createElement('input'); // Skapa en checkbox för att markera todo som klar eller inte
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed; // Om checkbox är checked, todo.completed=true
            checkbox.addEventListener('change', () => {
                todoList.toggleTodoCompleted(index, checkbox.checked);
                loadTodos();
            });
            li.appendChild(checkbox);

            if (todo.completed) {
                p.classList.add('completed'); // Lägg till klassen 'completed' till p-elementet om todo är markerad som klar
            }

            // Skapa en knapp för att radera en todo
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Radera';
            deleteBtn.className = 'delete-button';
            deleteBtn.addEventListener('click', () => deleteTodo(index));
            li.appendChild(deleteBtn);

            if (todo.priority == 1) {
                prio1.appendChild(li);
            } else if (todo.priority == 2) {
                prio2.appendChild(li);
            } else {
                prio3.appendChild(li);
            }

        });
    }
}

// Funktion för att radera en todo
function deleteTodo(index: number): void {
    if (confirm("Är du säker på att du vill radera denna todo?")) {
        // Ta bort todo från den globala instansen baserat på prioritet och index
        todoList.deleteTodo(index);
        loadTodos();
    }
}

loadTodos();
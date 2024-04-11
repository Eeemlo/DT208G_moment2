import { iTodo } from './iTodo';
import { StorageHandle } from './StorageHandle';

export class TodoList {
    todos: iTodo[] = [];

    constructor() {
        this.loadTodosFromStorage();
    }

    addTodo(task: string, priority: number): boolean {
        // Validera inmatade värden
        if (!task.trim() || priority < 1 || priority > 3) {
            return false; // Returnera false om inmatade värden är ogiltiga
        }

        // Skapa ett nytt iTodo-objekt och lägg till i listan
        const newTodo: iTodo = {
            task: task,
            priority: priority,
            completed: false
        };

        this.todos.push(newTodo);
        this.saveTodosToStorage();
        return true;
    }

    deleteTodo(index: number): void {
        this.todos.splice(index, 1);
        this.saveTodosToStorage();
    }

    toggleTodoCompleted(index: number, completed: boolean): void {
        this.todos[index].completed = completed;
        this.saveTodosToStorage();
    }

    private saveTodosToStorage(): void {
        StorageHandle.saveTodos(this.todos);
    }

    private loadTodosFromStorage(): void {
        this.todos = StorageHandle.loadTodos();
    }

    getTodos(): iTodo[] {
        return this.todos;
    }
}
import { iTodo } from './iTodo';

export class StorageHandle {

    static saveTodos(todos: iTodo[]) {
        localStorage.setItem('todos', JSON.stringify(todos)); 
    }

    static loadTodos(): iTodo[] {
        const todoStr = localStorage.getItem('todos');
        if (todoStr) {
            return JSON.parse(todoStr);
        } else {
            return [];
        }
    }
}
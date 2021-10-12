import { TodoItem } from "./todoItem";

type ItemCounts = {
    total: number,
    incomplete: number
}

export class TodoCollection {
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>();

    constructor(public userName: string, todoItems: TodoItem[] = [])
    {
        todoItems.forEach(x => this.itemMap.set(x.id, x));
    }

    addTodo(task: string)
    {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }

        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));

        return this.nextId;
    }

    getTodoById(id: number): TodoItem
    {
        return this.itemMap.get(id);
    }

    getTodoItems(includeComplete: boolean): TodoItem[]
    {
        return [...this.itemMap.values()]
            .filter(x => includeComplete || !x.isComplete);
    }

    markComplete(id: number, complete: boolean): void
    {
        const todoItem = this.getTodoById(id);

        if (todoItem) {
            todoItem.isComplete = true;
        }
    }

    removeComplete(): void
    {
        this.itemMap.forEach(x => {
            if (x.isComplete) {
                this.itemMap.delete(x.id);
            }
        });
    }

    getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}
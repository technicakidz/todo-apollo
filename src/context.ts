export interface Todo {
    id: string;
    name: string;
    complete: boolean;
  }

  let TODOS: Todo[];

  const LS_KEY = 'apollo-elements-todo-list';

  const INITIAL_TODOS: Todo[] = [
    { id: '0', name: 'Get Milk', complete: false },
    { id: '1', name: 'Get Bread', complete: false },
    { id: '2', name: 'Try to Take Over the World', complete: false },
  ];

  function initTodos(): void {
    const stored = localStorage.getItem(LS_KEY);
    TODOS = stored ? JSON.parse(stored) : [...INITIAL_TODOS];
  }

  initTodos();

  function byId(id: string): <T extends { id: string }>(x: T) => boolean {
    return x => x.id === id;
  }

  function updateStorage(): void {
    localStorage.setItem(LS_KEY, JSON.stringify(TODOS));
  }

  function getNextId(): string {
    const last = TODOS.map(x => x.id).sort().pop();
    return (parseInt(last) + 1).toString();
  }

  function getTodo(id: string): Todo {
    const todo = TODOS.find(byId(id));
    if (!todo)
      throw new Error(`TODO ${id} not found`);
    return todo;
  }

  async function randomSleep() {
    await new Promise(r => setTimeout(r, Math.random() * 1000));
  }

  export async function getTodos(): Promise<Todo[]> {
    await randomSleep();
    return TODOS;
  }

  export async function addTodo({ name, complete }: Omit<Todo, 'id'>): Promise<Todo> {
    await randomSleep();
    const todo = { id: getNextId(), name, complete };
    TODOS.push(todo);
    updateStorage();
    return todo;
  }

  export async function updateTodo({ id, name, complete }: Todo): Promise<Todo> {
    await randomSleep();
    const todo = getTodo(id);
    todo.name = name ?? todo.name;
    todo.complete = complete ?? todo.complete;
    updateStorage();
    return todo;
  }

  export async function deleteTodo(id: string): Promise<Todo[]> {
    await randomSleep();
    getTodo(id);
    TODOS = TODOS.filter(x => x.id !== id);
    updateStorage();
    return TODOS;
  }
import AddTodo from "./components/add-todo";
import { getTodos } from "@/services/todo";
import { Todo } from "@/types/todo";
import DeleteTodo from "./components/delete-todo";

export default async function Home() {
  let todos = await getTodos();


  return (
    <main className="max-w-3xl mx-auto">
      <h2>Todos</h2>
      <div className="py-4">
        {todos.map((todo: Todo) => (
          <div key={todo.id} className="flex justify-between py-2">
            <h2>
              Todo:
              {todo.task}
            </h2>
            <DeleteTodo id={todo.id} />
          </div>
        ))}
      </div>
      <AddTodo />
    </main>
  );
}

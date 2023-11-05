"use client";
import React, { useState, ChangeEvent } from "react";
import { addTodo } from "@/services/todo";

interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = () => {
  const [task, setTask] = useState<string>("");

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTodo = () => {
    if (task.trim() === "") {
      return; // Prevent adding empty tasks
    }

    addTodo(task); // Call the parent component's addTodo function
    setTask(""); // Clear the input field
  };

  return (
    <div className="border flex justify-between rounded-lg p-1 gap-2">
      <input
      className="flex-1"
        type="text"
        placeholder="Enter a new task"
        value={task}
        onChange={handleTaskChange}
      />
      <button className="bg-green-100 py-1 px-2 rounded-lg hover:bg-green-500" onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;

'use client'
import { deleteTodo } from "@/services/todo";
import React from "react";

const DeleteTodo = ({ id }: { id: number }) => {
  return <button onClick={() => deleteTodo(id)}>DeleteTodo</button>;
};

export default DeleteTodo;

const addTodo = async (task: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CLIENT}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add todo - Server returned an error");
    }
  } catch (error: any) {
    throw new Error(`Error adding todo: ${error.message}`);
  }
};

const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CLIENT}/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Todo with ID ${id} deleted successfully`);
    } else {
      throw new Error(`Failed to delete todo with ID ${id}`);
    }
  } catch (error) {
    throw new Error(`Error deleting todo with ID ${id}`);
  }
};

const getTodos = async () => {
  const response = await fetch(`${process.env.NEXT_BE_URL_SERVER}/todos`);
  const data = await response.json();
  return data;
};

export { addTodo, getTodos, deleteTodo };

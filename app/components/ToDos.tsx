"use client";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_TODOS } from "../apollo/client/query";
import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../apollo/client/mutation";

const TodoApp: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [AddToDo] = useMutation(ADD_TODO);
  const [UpdateToDo] = useMutation(UPDATE_TODO);
  const [DeleteToDo] = useMutation(DELETE_TODO);

  const addTodo = async () => {
    if (!title || !description) return;

    try {
      await AddToDo({
        variables: {
          title,
          description,
        },
      })
        .then((res) => {
          setTitle("");
          setDescription("");
          console.log("todo added!");
          console.log(res?.data?.addToDo);
        })
        .catch((err) => {
          console.error("Error adding todo:", err.message);
        });

      await refetch();
    } catch (error: any) {
      console.error("Error adding todo:", error?.message);
    }
  };

  const updateTodo = async (id: any, titleTemp: any, descriptionTemp: any) => {
    if (!title || !description) return;
    setIsUpdate(true);
    console.log(isUpdate);

    setTitle(titleTemp);
    setDescription(descriptionTemp);

    try {
      await UpdateToDo({
        variables: {
          id,
          title,
          description,
        },
      })
        .then((res) => {
          setTitle("");
          setDescription("");
          console.log("todo updated!");
          console.log(res?.data?.updateToDo);
        })
        .catch((err) => {
          console.error("Error adding todo:", err.message);
        });

      await refetch();
    } catch (error: any) {
      console.error("Error adding todo:", error?.message);
    }
  };

  const statusHandler = async (id: any, status: any) => {
    if (!id || !status) return;

    if (status === "true") {
      status = false;
    } else {
      status = true;
    }

    console.log("🚀 ~ statusHandler ~ status:", typeof status);

    try {
      await UpdateToDo({
        variables: {
          id,
          status,
        },
      })
        .then((res) => {
          console.log("todo status updated!");
          console.log(res?.data?.updateToDo);
        })
        .catch((err) => {
          console.error("Error status todo:", err.message);
        });

      await refetch();
    } catch (error: any) {
      console.error("Error status todo:", error?.message);
    }
  };

  const deleteToDo = async (id: any) => {
    console.log("🚀 ~ deleteToDo ~ id:", id);

    try {
      await DeleteToDo({
        variables: {
          id,
        },
      })
        .then((res) => {
          console.log("todo deleted!");
          console.log(res?.data?.deleteToDo);
        })
        .catch((err) => {
          console.error("Error deleting todo:", err.message);
        });

      await refetch();
    } catch (error: any) {
      console.error("Error deleting todo:", error?.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-4 border rounded-md shadow-md h-full">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter your todo"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-1"
        />
        <input
          type="text"
          placeholder="Enter your description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          className="mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {isUpdate ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {data?.getToDos.map((todo: any) => (
          <li key={todo._id} className="flex items-center justify-between py-4">
            <input
              type="radio"
              checked={todo?.status === "true"}
              onChange={() => statusHandler(todo._id, todo.status)}
              className="mr-4 focus:outline-none focus:ring focus:border-blue-300"
            />

            <div className="flex-1">
              <p
                className={`text-lg font-semibold ${
                  todo?.status == "true" ? "line-through" : ""
                }`}
              >
                {todo.title}
              </p>
              <p
                className={`text-gray-500 ${
                  todo?.status == "true" ? "line-through" : ""
                } `}
              >
                {todo.description}
              </p>
            </div>
            <button
              onClick={() => updateTodo(todo._id, todo.title, todo.description)}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              !
            </button>
            <button
              onClick={() => deleteToDo(todo._id)}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

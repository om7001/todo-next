import Todo from "../models/todoSchema"
import { ArgsType } from "@/app/Types/todos";


const addToDo = async (_: any, args: ArgsType) => {
    const { title, description } = args
    try {
        const todo = await Todo.create({ title, description })
        if (!todo) return new Error("todo not created!")
        console.log(todo)
        return todo
    } catch (error: any) {
        console.error(error)
        return new Error(error?.message)
    }
}

const updateToDo = async (_: any, args: ArgsType) => {
    const { _id, ...rest } = args
    try {
        const todo = await Todo.findByIdAndUpdate({ _id }, { ...rest })
        if (!todo) return new Error("todo not updated!")
        console.log(todo)
        return { message: "todo updated!" }
    } catch (error: any) {
        console.error(error)
        return new Error(error?.message)
    }
}

const deleteToDo = async (_: any, args: ArgsType) => {
    const { _id } = args
    try {
        const todo = await Todo.findByIdAndDelete({ _id })
        if (!todo) return new Error("todo not deleted!")
        console.log(todo)
        return { message: "todo deleted!" }
    } catch (error: any) {
        console.error(error)
        return new Error(error?.message)
    }
}

const getToDos = async (_: any) => {    
    try {
        const todo = await Todo.find()
        if (!todo) return new Error("todo not found!")
        console.log(todo)
        return todo
    } catch (error: any) {
        console.error(error)
        return new Error(error?.message)
    }
}

const resolvers = {
    Query: {
        getToDos
    },
    Mutation: {
        addToDo,
        updateToDo,
        deleteToDo
    }
}

export default resolvers
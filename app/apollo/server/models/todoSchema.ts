import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { TodoType } from "@/app/Types/todos";

const todoSchema = new Schema<TodoType>({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// Define Todo model if it hasn't been defined yet
const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema)
export default Todo
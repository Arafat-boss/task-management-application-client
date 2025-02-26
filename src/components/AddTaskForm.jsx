import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const AddTaskForm = ({ onAddTask }) => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const taskData = {
      title: data.title,
      description: data.desc,
      category: data.category,
      createdAt: new Date().toISOString(),
      email: user.email,
    };

    try {
      const response = await axios.post("https://task-management-server-chi-six.vercel.app/tasks", taskData);
      console.log("Task added successfully:", response.data);

      if (onAddTask) {
        onAddTask(response.data);
      }
      navigate('/all-task')
      reset();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              {...register("title", { required: true, maxLength: 50 })}
              type="text"
              placeholder="Enter task title"
              className="input input-bordered w-full"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              {...register("desc", { maxLength: 200 , })}
              placeholder="Enter task description (optional)"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          {/* Category Select Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;

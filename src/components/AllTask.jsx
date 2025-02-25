// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { FaEllipsisH } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const initialTasks = {
//   "To-Do": [
//     { id: "1", title: "Reconfigure grunt", desc: "Better ask DevOps to handle it", tags: ["DevOps", "Doing", "High"] },
//     { id: "2", title: "Upgrade babel", desc: "Need support for the latest syntax", tags: ["DevOps", "Doing", "Low"] },
//   ],
//   "In Progress": [
//     { id: "3", title: "Bug with rendering", desc: "Try it on any demo, reproduces easily", tags: ["Developers", "Review", "Medium"] },
//     { id: "4", title: "Remove overflow", desc: "It is overflowing everywhere, it should not", tags: ["Developers", "Doing", "Medium"] },
//   ],
//   Done: [
//     { id: "5", title: "Write tests", desc: "Boss says we have to, test coverage is low", tags: ["Developers", "Done", "High"] },
//     { id: "6", title: "Refactor base class", desc: "It is currently a mess, un-mess it please", tags: ["Developers", "Done", "Medium"] },
//   ],
// };

// const AllTask = () => {
//   const [tasks, setTasks] = useState(initialTasks);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     const sourceTasks = [...tasks[source.droppableId]];
//     const destinationTasks = [...tasks[destination.droppableId]];
//     const [movedTask] = sourceTasks.splice(source.index, 1);

//     destinationTasks.splice(destination.index, 0, movedTask);

//     setTasks({
//       ...tasks,
//       [source.droppableId]: sourceTasks,
//       [destination.droppableId]: destinationTasks,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 p-5">
//         {/* <header className="flex justify-between items-center bg-gray-500 p-4 rounded-lg text-white">
// //         <h1 className="text-xl font-bold">Taskco</h1>
// //         <button className="bg-purple-600 text-white flex items-center">
// //           Logout <FaSignOutAlt className="ml-2" />
// //         </button>
// //       </header> */}
//       <h2 className="text-2xl font-bold text-white mb-5">Task Management Board</h2>
//       <Link to='/'>
//          <button className="btn text-2xl font-bold mt-5">Back to Home</button>
//       </Link>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Object.keys(tasks).map((category) => (
//             <Droppable key={category} droppableId={category}>
//               {(provided) => (
//                 <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-gray-800 rounded-lg shadow-md">
//                   <h3 className="text-lg font-semibold text-white">{category}</h3>
//                   {tasks[category].map((task, index) => (
//                     <Draggable key={task.id} draggableId={task.id} index={index}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-gray-700 p-3 mt-3 rounded-lg relative"
//                         >
//                           <h4 className="font-bold text-white">{task.title}</h4>
//                           <p className="text-sm text-gray-300">{task.desc}</p>
//                           <div className="mt-2 flex flex-wrap gap-1">
//                             {task.tags.map((tag, idx) => (
//                               <span key={idx} className={`px-3 py-1 text-xs rounded-full text-white ${tag === "High" ? "bg-red-500" : tag === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}>
//                                 {tag}
//                               </span>
//                             ))}
//                           </div>
//                           <FaEllipsisH className="absolute top-3 right-3 text-gray-400 cursor-pointer" />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default AllTask;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { FaEllipsisH } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const AllTask = () => {
//   const [tasks, setTasks] = useState([]);

//  // Fetch tasks from API when the component mounts
//  useEffect(() => {
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/tasks");
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };
//   fetchTasks();
// }, []);

// // Categorizing tasks based on their category
// const categorizedTasks = {
//   "To-Do": tasks.filter((task) => task.category === "To-Do"),
//   "In Progress": tasks.filter((task) => task.category === "In Progress"),
//   "Done": tasks.filter((task) => task.category === "Done"),
// };

// // Function to handle drag and drop
// const onDragEnd = (result) => {
//   if (!result.destination) return; // Exit if dropped outside a valid target

//   const { source, destination } = result;

//   // Get the category names for source and destination
//   const sourceCategory = source.droppableId;
//   const destinationCategory = destination.droppableId;

//   // Copy the source list and remove the dragged task
//   const sourceTasks = [...categorizedTasks[sourceCategory]];
//   const [movedTask] = sourceTasks.splice(source.index, 1);

//   // Update the category of the moved task
//   movedTask.category = destinationCategory;

//   // Copy the destination list and insert the moved task at the new position
//   const destinationTasks = [...categorizedTasks[destinationCategory]];
//   destinationTasks.splice(destination.index, 0, movedTask);

//   // Update the state with the new task list, modifying only the moved task's category
//   setTasks((prevTasks) =>
//     prevTasks.map((task) =>
//       task._id === movedTask._id ? { ...task, category: destinationCategory } : task
//     )
//   );
// };
//   return (
//     <div className="min-h-screen bg-gray-900 p-5">
//       <h2 className="text-2xl font-bold text-white mb-5">Task Management Board</h2>
//       <Link to="/">
//         <button className="btn text-2xl font-bold mt-5">Back to Home</button>
//       </Link>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Object.keys(categorizedTasks).map((category) => (
//             <Droppable key={category} droppableId={category}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="p-4 bg-gray-800 rounded-lg shadow-md"
//                 >
//                   <h3 className="text-lg font-semibold text-white">{category}</h3>
//                   {categorizedTasks[category].map((task, index) => (
//                     <Draggable key={task._id} draggableId={task._id} index={index}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="bg-gray-700 p-3 mt-3 rounded-lg relative"
//                         >
//                           <h4 className="font-bold text-white">{task.title}</h4>
//                           <p className="text-sm text-gray-300">{task.description}</p>
//                           <FaEllipsisH className="absolute top-3 right-3 text-gray-400 cursor-pointer" />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };
// export default AllTask;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const {user} = useContext(AuthContext)

  // const email = user.email;
  useEffect(() => {
    if (!user || !user.email) {
      // If user is not logged in or email is not available, return early
      return;
    }
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${user.email}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, [user]); // Dependency on user to trigger the effect when the user state changes
  
  

  // handle Click Outside then modal close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showOptions &&
        !event.target.closest(".task-options") &&
        !event.target.closest(".task-modal")
      ) {
        setShowOptions(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  //delete oparetion
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setShowOptions(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update Modal Open 
  const handleOpenUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setIsUpdateModalOpen(true);
    setShowOptions(null);
  };

  // task update
  const handleUpdate = async () => {
    if (!selectedTask) return;

    try {
      const updatedTask = {
        title: updatedTitle,
        description: updatedDescription,
        category: selectedTask.category,
      };

      await axios.put(`http://localhost:3000/tasks/${selectedTask._id}`, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id ? { ...task, title: updatedTitle, description: updatedDescription } : task
        )
      );

      setIsUpdateModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //category hiseve vag kora hocce
  const categorizedTasks = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    "Done": tasks.filter((task) => task.category === "Done"),
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If the task is dropped in the same place, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    const sourceTasks = [...categorizedTasks[sourceCategory]];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    movedTask.category = destinationCategory;
    const destinationTasks = [...categorizedTasks[destinationCategory]];
    destinationTasks.splice(destination.index, 0, movedTask);

    // Update the state with the new order of tasks
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === movedTask._id ? { ...task, category: destinationCategory } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-5">
      <h2 className="text-2xl font-bold text-white mb-5">Task Management Board</h2>
      <Link to="/">
        <button className="btn btn-outline btn-primary mb-2 text-2xl font-bold mt-5">Back to Home</button>
      </Link>
      <Link to="/add-task">
        <button className="btn btn-outline btn-accent ml-2 mb-2 text-2xl font-bold mt-5">Add Task</button>
      </Link>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(categorizedTasks).map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 bg-gray-800 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                  {categorizedTasks[category].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-700 p-3 mt-3 rounded-lg relative"
                        >
                          <h4 className="font-bold text-white">{task.title}</h4>
                          <p className="text-sm text-gray-300">{task.description}</p>

                          {/* 3 Dot Icon */}
                          <FaEllipsisH
                            className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                            onClick={() =>
                              setShowOptions((prev) => (prev === task._id ? null : task._id))
                            }
                          />

                          {/* 3 dot a click korle open*/}
                          {showOptions === task._id && (
                            <div
                              className="absolute top-8 right-2 bg-gray-800 shadow-lg rounded-md p-2 z-50 task-options"
                            >
                              <button
                                className="block w-full text-left px-3 py-1 text-white hover:bg-gray-600"
                                onClick={() => handleOpenUpdateModal(task)}
                              >
                                Update
                              </button>
                              <button
                                className="block w-full text-left px-3 py-1 text-red-400 hover:bg-gray-600"
                                onClick={() => handleDelete(task._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* ✅ Update Modal */}
      {isUpdateModalOpen && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-5 rounded-lg w-96 task-modal">
            <h2 className="text-xl font-bold text-white mb-3">Update Task</h2>
            <input
              type="text"
              className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;



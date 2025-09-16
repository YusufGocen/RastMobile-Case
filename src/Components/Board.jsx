import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {SortableContext,verticalListSortingStrategy,} from "@dnd-kit/sortable";
import { FaTrash } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function Board() {

  // Örnek kolonlar
  const columns = [
    { id: "Backlog", title: "Backlog" },
    { id: "Todo", title: "To do" },
    { id: "inprogress", title: "In Progress" },
    { id: "Done", title: "Done" },
  ];

  // Örnek Taskler
  const [tasks, setTasks] = useState([
    { id: "t1", 
      title: "Markdown support",
      content: "Markdown shorthand converts to formatting", 
      column: "Backlog" },
  {
    id: "t2",
    title: "Mobile home screen",
    content: "Folders, tags, and notes lists are sorted by recent.",
    column: "Todo",
    color: "bg-red-500",
  },
  {
    id: "t3",
    title: "Image viewer",
    content:" Opens when clicking on the thumbnail in the list or on the image in the note",
    column: "inprogress",
  },
  {
    id: "t4",
    title: "Audio recording",
    content:" Interface for when recording a new audio note",
    column: "Done",
    },
  ]);

  //Task Ekleme
  const handleAddTask = (columnId) => {
    const newTask = {
      id: Date.now(),
      content: "New Task",
      column: columnId,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  //Task Silme
  const handleDelete = (id) => setTasks(tasks.filter((task) => task.id !== id));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newColumn = over.id;
    

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task
      )
    );
    
  }
  return (
    
    <DndContext onDragEnd={handleDragEnd}>
        <div  style={{ backgroundColor: "#0d1117" }}>
          <h1 className="flex justify-center text-center text-white pt-20 text-6xl">Kanban Board</h1>
        </div>
      <div
        className="flex flex-col md:flex-row justify-center items-start gap-4 p-6  min-h-screen max-w-full "
        style={{ backgroundColor: "#0d1117" }}
      >
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.column === column.id);

          return (
            
            <div key={column.id} className="flex-1 mt-50 rounded-lg w-full md:w-1/4" style={{ backgroundColor: "#161c22" }}>
              <h3 className="text-3xl mt-5 font-semibold border-b-5 border-[#0d1117] p-5 text-white flex justify-center mb-5">
                {column.title}
              </h3>

              <Droppable id={column.id}>
                <SortableContext items={columnTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-col  justify-between h-[40vh] w-100  rounded-lg p-3 text-white">    
                      <div className="flex-1 flex flex-col overflow-y-auto">
                        {columnTasks.map((task) => (
                          <Draggable key={task.id} id={task.id}>
                            <div
                              className="p-2 mt-2 bg-white rounded-lg shadow text-sm text-white h-30 flex items-center justify-between"
                              style={{ backgroundColor: "#0d1117" }}
                            >
                              <div className="flex flex-col gap-2 p-3 rounded shadow">
                                <h3 className="flex font-bold">{task.title}</h3>
                                <p className="text-sm text-gray-300">{task.content}</p>
                              </div>
                              <div
                                onClick={(e) => handleDelete(task.id)}
                                className="text-white hover:text-red-900"
                              >
                                <FaTrash className="w-4 h-4 ml-1" />
                              </div>
                            </div>
                          </Draggable>
                        ))}
                      </div>

                    <div className="flex justify-center mt-2">
                      <CiCirclePlus
                        className="w-6 h-6 cursor-pointer text-white hover:text-blue-300"
                        onClick={() => handleAddTask(column.id)}
                      />
                    </div>
                  </div>
                </SortableContext>
              </Droppable>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}
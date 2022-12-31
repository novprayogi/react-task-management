import React from "react";
import { useSelector } from "react-redux";
import useGetTasks from "../hooks/useGetTasks";
import useCompare from "../hooks/useCompare";
import LoadingSkeleton from "../component/LoadingSkeleton";
import CardTask from "../component/CardTask";

const MyTask = () => {
  const auth = useSelector((state) => state.user);
  const { tasks } = useGetTasks();
  const { isInWork, isCompleted, isDueDate } = useCompare();

  // ambil data dari task sendiri
  const myTasks = tasks.filter((task) => task.users.find((user) => user.id === auth.userId));

  // data yg masih proses dari (my task in work)
  const tasksAtWork = myTasks.filter((task) => isInWork(task));

  // data yg selesai dari (my completed task)
  const taskCompleted = myTasks.filter((task) => isCompleted(task));

  // data yg lewat waktu dari (my due date task)
  const taskDueDate = myTasks.filter((task) => isDueDate(task));

  // console.log(!tasksAtWork === true);
  return (
    <div className="flex gap-4">
      {/* Taks */}
      <div className="basis-4/12 ">
        <header className="uppercase border-blue-500 border-b-4 py-3 font-bold">
          Tasks In Work
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">{tasksAtWork.length}</span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {tasksAtWork.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
          {tasksAtWork.length === 0 && taskDueDate.length === 0 && taskCompleted.length === 0 && <LoadingSkeleton />}
        </div>
      </div>
      {/* Completed Tasks */}
      <div className="basis-4/12 ">
        <header className="uppercase border-green-500 border-b-4 py-3 font-bold">
          Completed Tasks
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">{taskCompleted.length}</span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {taskCompleted.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
          {tasksAtWork.length === 0 && taskDueDate.length === 0 && taskCompleted.length === 0 && <LoadingSkeleton />}
        </div>
      </div>
      {/* Due Date */}
      <div className="basis-4/12 ">
        <header className="uppercase border-red-500 border-b-4 py-3 font-bold">
          Due Date
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">{taskDueDate.length}</span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {taskDueDate.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
          {tasksAtWork.length === 0 && taskDueDate.length === 0 && taskCompleted.length === 0 && <LoadingSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default MyTask;

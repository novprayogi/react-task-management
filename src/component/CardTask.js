import { CalendarIcon, ChatBubbleBottomCenterTextIcon, CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCompare from "../hooks/useCompare";
import LabelCategory from "./LabelCategory";

const CardTask = ({ task }) => {
  const { isInWork, isCompleted, isDueDate } = useCompare();
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`detail/${task.id}`);
  };
  return (
    <div className="border-[1px] rounded-md">
      <div onClick={navigateToDetail} className="p-4 cursor-pointer">
        <h1 className="font-medium text-lg capitalize mb-2">{task.title}</h1>
        <p className="text-sm text-gray-500 text-justify">{task.description}</p>
        <div className="flex justify-between pt-5 items-center">
          <LabelCategory title={task.categories} />
          <div className="flex rounded-md">
            {task.users.map((user) => (
              <img key={user.id} src={user.photoURL} alt="avatar-user" className="avatar ml-[-.5rem]" />
            ))}
            {task.users.length < 4 || <div className="w-8 text-white rounded-full border-2 bg-gray-400 border-white ml-[-.5rem] grid place-items-center text-xs">3+</div>}
          </div>
        </div>
      </div>
      <footer className="flex px-4 justify-between py-3 border-t-[1px]">
        <div className="flex items-start">
          <ChatBubbleBottomCenterTextIcon width="20" className="text-gray-400" />
          <span className="block text-sm mt-[-3px] ml-1 text-gray-400">{task.comments.length}</span>
        </div>
        <div className="flex items-start">
          {isInWork(task) ? (
            <div className="flex items-center">
              <CalendarIcon width="20" className="text-gray-400" />
              <span className="block text-sm ml-1 text-gray-400">{task.duedate}</span>
            </div>
          ) : isCompleted(task) ? (
            <div className="flex items-center">
              <CheckIcon width="20" className="text-green-400" />
              <span className="block text-sm ml-1 text-green-400">Completed</span>
            </div>
          ) : isDueDate(task) ? (
            <div className="flex items-center">
              <ExclamationTriangleIcon width="20" className="text-red-400" />
              <span className="block text-sm ml-1 text-red-400">Due Date</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </footer>
    </div>
  );
};

export default CardTask;
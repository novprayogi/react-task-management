import { CalendarIcon, CheckIcon, PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSkeleton from "../component/LoadingSkeleton";
import useGetTaskById from "../hooks/useGetTaskById";
import useCompare from "../hooks/useCompare";
import { useSelector } from "react-redux";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const DetailTask = () => {
  const auth = useSelector((state) => state.user);
  // const { state: id } = useLocation();
  const { id } = useParams();
  // console.log(id);
  const { task } = useGetTaskById(id);
  const { isInWork, isCompleted, isDueDate } = useCompare();
  const isMyTask = task?.users?.find((user) => user.id === auth.userId);
  const navigate = useNavigate();
  const [comment, setComment] = useState({
    id: auth.userId,
    displayName: auth.displayName,
    photoURL: auth.photoURL,
    body: "",
  });

  const handlerComment = (e) => {
    setComment({ ...comment, body: e.target.value });
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment.body.trim()) {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, {
        comments: [...task?.comments, comment],
      });

      setComment({ ...comment, body: "" });
    }
  };

  const markAsCompleted = async () => {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, {
      completed: true,
    });
  };

  const deleteTask = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are You Sure to delete ?") === true) {
      await deleteDoc(doc(db, "tasks", id));
      navigate("/");
    }
  };
  return (
    <>
      {task?.length === 0 && <LoadingSkeleton />}
      {task?.length !== 0 && (
        <div className="flex">
          <div className="basis-8/12">
            <div className="border-[1px] rounded-md p-4">
              <h1 className="text-xl font-medium mb-3">{task?.title}</h1>
              <div className="text-gray-500 flex gap-2 mb-3 items-center">
                <CalendarIcon width="20" />
                <span>{new Date(task?.duedate).toDateString()}</span>
                {isDueDate(task) && <label className="bg-red-100 px-3 py-1 rounded-full font-medium text-red-500 text-sm">Due Date</label>}
              </div>
              <p className="text-justify text-gray-700 mb-5">{task?.description}</p>
              {isMyTask && (
                <div className="flex gap-3">
                  {isInWork(task) && (
                    <button onClick={markAsCompleted} className="bg-green-600 hover:bg-green-700 btn">
                      Mark As Completed
                    </button>
                  )}
                  {isCompleted(task) && (
                    <div className="flex items-center">
                      <CheckIcon width="25" className="text-green-400" />
                      <span className="block ml-1 text-green-400">Completed</span>
                    </div>
                  )}
                  <button onClick={deleteTask} className="bg-red-600 hover:bg-red-700 btn">
                    <TrashIcon width="20" />
                  </button>
                </div>
              )}
            </div>
            {/* Comment */}
            <div className="p-4 mt-4 border-[1px] rounded-md">
              <h1 className="text-xl font-medium mb-3">Comments</h1>
              <div className="mb-4">
                {task &&
                  task?.comments?.map((comment, i) => {
                    return (
                      <div key={i} className="mb-3 w-fit flex gap-1">
                        <img src={comment.photoURL} alt="avatar-user" className="avatar mr-1 self-start" />
                        <div className="bg-gray-100 p-1 px-4 rounded-lg">
                          <h1 className="font-medium">{comment.displayName}</h1>
                          <p className="text-sm">{comment.body}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {isMyTask && (
                <form className="flex gap-2" onSubmit={submitComment}>
                  <textarea type="text" className="basis-10/12 outline-none border-[1px] rounded-lg p-2" onChange={handlerComment} value={comment.body} />
                  <button type="submit" className="btn self-start bg-blue-700 hover:bg-blue-800">
                    <PaperAirplaneIcon width="20" />
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="basis-4/12 px-3">
            <div className="border-[1px] rounded-md p-3">
              <h1 className="text-xl font-medium mb-3">Users</h1>
              <div>
                {task &&
                  task?.users?.map((user) => {
                    return (
                      <div key={user.id} className="text-sm py-1 text-gray-500 flex items-center">
                        <img src={user.photoURL} alt="avatar-user" className="avatar mr-2" />
                        <h1>{user.displayName}</h1>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailTask;

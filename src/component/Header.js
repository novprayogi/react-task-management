import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useGetTasks from "../hooks/useGetTasks";

const Header = () => {
  const auth = useSelector((state) => state.user);
  // const isLoading = true;
  const [search, setSearch] = useState("");
  const { tasks } = useGetTasks();
  const navigate = useNavigate();
  const handlerNavigate = (id) => {
    navigate(`/detail/${id}`);
    setSearch("");
  };

  return (
    <div className="h-12 flex justify-between relative items-center px-5 shadow-sm">
      <div className={`container-searchbar ${!search && "hidden"} ${tasks.length === 0 && "w-[15rem] p-10 flex justify-center"}`}>
        {tasks.length !== 0 ? (
          tasks
            .filter((task) => task.title.toLowerCase().includes(search))
            .map((task) => (
              <div onClick={() => handlerNavigate(task.id)} key={task.id} className="result-search cursor-pointer">
                <p className="font-medium">{task.title}</p>
                <p>{task.description.substr(0, 60)}</p>
              </div>
            ))
        ) : (
          <Spinner />
        )}
      </div>
      <div className="flex items-center gap-2 border-[1px] rounded-full py-1 px-2">
        <MagnifyingGlassIcon width="20" className="text-blue-700" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="outline-none" placeholder="Search..." />
      </div>
      <div className="flex items-center gap-2">
        {/* <img src="http://pm1.narvii.com/6290/9daddc43d903f1fc591697dd11edb894e85b35f7_00.jpg" alt="avatar" className="w-8 rounded-full" /> */}
        <img src={auth.photoURL} alt="avatar" className="w-8 rounded-full" />
        <h1 className="text-sm font-medium">{auth.displayName}</h1>
      </div>
    </div>
  );
};

export default Header;

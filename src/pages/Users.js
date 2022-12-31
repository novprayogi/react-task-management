import React from "react";
import useGetTasks from "../hooks/useGetTasks";
import useGetUsers from "../hooks/useGetUsers";
import LoadingSkeleton from "../component/LoadingSkeleton";

const Users = () => {
  const { tasks } = useGetTasks();
  const { users } = useGetUsers();

  return (
    <div className="overflow-x-auto relative">
      {users.length === 0 && <LoadingSkeleton />}
      {users.length !== 0 && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Task
              </th>
              <th scope="col" className="py-3 px-6">
                Avatar
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const myTask = tasks.filter((task) => task.users.find((u) => u.id === user.id));
              console.log(user);
              return (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.displayName}
                  </th>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{myTask.length}</td>
                  <td className="py-4 px-6">
                    <img src={user.photoURL} alt="avatar-user" className="avatar" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;

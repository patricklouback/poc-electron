import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const [directory, setDirectory] = useState<string>(
    localStorage.getItem("selectedDirectory") || "",
  );
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (directory) {
      loadUsers(directory);
    }
  }, [directory]);

  const selectDirectory = async () => {
    const selectedDir = await window.electron.ipcRenderer.invoke(
      "select-directory",
    );
    if (selectedDir) {
      setDirectory(selectedDir);
      localStorage.setItem("selectedDirectory", selectedDir);
      loadUsers(selectedDir);
    }
  };

  const loadUsers = async (dir: string) => {
    const loadedUsers = await window.electron.ipcRenderer.invoke(
      "read-users",
      dir,
    );
    setUsers(loadedUsers);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="h-full w-full p-8">
        <div className="h-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              User Manager
            </h1>
            <button
              onClick={() => navigate("/add-user")}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add New User
            </button>
          </div>

          <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
            <button
              onClick={selectDirectory}
              className="bg-white hover:bg-indigo-50 text-indigo-600 font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 border border-indigo-200 shadow-sm hover:shadow-md"
            >
              Select Directory
            </button>
            {directory && (
              <p className="mt-3 text-indigo-600">
                Selected directory:{" "}
                <span className="font-mono bg-indigo-100 px-2 py-1 rounded text-sm">
                  {directory}
                </span>
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
              <h2 className="text-xl font-semibold text-white">Users List</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-indigo-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        No users found. Please select a directory and add some
                        users.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

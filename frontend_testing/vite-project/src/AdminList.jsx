import React, { useEffect, useState } from "react";
import axios from "axios";
// import ImageUpload from "./ImageUpload";

export default function AdminList({ setSelectedId }) {
    const [admins, setAdmins] = useState([]);

    // Fetch admins list
    useEffect(() => {
        axios
            .get("http://localhost:5000/admin")
            .then((res) => {
                setAdmins(res.data.data)
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Admins List</h2>

            {/* Table */}
            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                                Password
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins?.map((admin) => (
                            <tr key={admin._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {admin.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {admin.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {admin.password}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => setSelectedId(admin._id)}
                                        className="px-4 py-2 text-sm font-semibold text-black bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Show ImageUpload component when an admin is selected */}
            {/* {selectedId && (
        <div className="mt-6">
          <ImageUpload adminId={selectedId} />
        </div>
      )} */}
        </div>
    );
}

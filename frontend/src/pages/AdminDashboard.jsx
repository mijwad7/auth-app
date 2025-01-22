import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/adminSlice";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);
    const [query, setQuery] = useState("");

    useEffect(() => {
        dispatch(fetchUsers(query));
    }, [dispatch, query]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <input 
                type="text" 
                placeholder="Search users..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                    {/* Add Edit functionality here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminDashboard;
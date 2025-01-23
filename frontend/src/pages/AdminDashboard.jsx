import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, editUser } from "../redux/adminSlice";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.admin);
    const [query, setQuery] = useState("");

    const [editingUser, setEditingUser] = useState(null);
    const [updatedUsername, setUpdatedUsername] = useState("");

    useEffect(() => {
        dispatch(fetchUsers(query));
    }, [dispatch, query]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id));
        }
    };


    const handleEdit = (user) => {
        if (!user || !user.id) {
            console.error("Error: Invalid user object!", user);
            return;
        }
        
        setEditingUser(user);
        setUpdatedUsername(user.username);
    };

    const handleSave = () => {
        if (!editingUser) {
            console.error("Error: No user selected for editing.");
            return;
        }
        
        const userId = editingUser.id;  // Ensure userId is retrieved properly
        if (!userId) {
            console.error("Error: userId is undefined!", editingUser);
            return;
        }
    
        const userData = { username: updatedUsername };
        dispatch(editUser({ userId, userData }));
        setEditingUser(null);
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
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit User Modal */}
            {editingUser && (
                <div className="modal">
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        value={updatedUsername}
                        onChange={(e) => setUpdatedUsername(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
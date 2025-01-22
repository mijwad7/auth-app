import React from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api";
import { useState } from "react";
import { loginSuccess } from "../redux/authSlice"; 

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile){
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("profile_image", selectedFile);

    try {
      const token = localStorage.getItem("access_token");
      const response = await api.put(`/api/users/${user.id}/upload-profile/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(loginSuccess({user: response.data, token}));
      alert("Profile image updated successfully");
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Error updating profile image. Please try again.");
    }
  }
  // D:\Work\React\auth-app\frontend\src\pages\Profile.jsx
  // D:\Work\React\auth-app\backend\media\profile_images\istockphoto-1300845620-612x612.jpg

  const profileImageUrl = user.profile_image ? `http://127.0.0.1:8000/${user.profile_image}` : "default_image.jpg";



  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {/* Display Profile Image */}
      <div>
        <h3>Profile Image:</h3>
        {user.profile_image ? (
          <img src={profileImageUrl} alt="Profile" width="150" />
        ) : (
          <p>No profile image uploaded.</p>
        )}
      </div>

      {/* File Upload Input */}
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Profile;

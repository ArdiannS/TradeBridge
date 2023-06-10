import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const EditUserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get("/user/profile");
        const userData = userResponse.data.user[0];

        setUser({
          username: userData.username,
          email: userData.email,
          birthday: userData.birthday,
          userProfilePicture:userData.userProfilePicture
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('email', user.email);
      formData.append('birthday', user.birthday);
      formData.append('profilePic', event.target.profilePic.files[0]);
  
      await axios.put("/user/profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update user profile");
    }
  };
  
  const [profilePic, setProfilePic] = useState(user.userProfilePicture || "");
  // console.log(user.userProfilePicture);
  
    const handleChange = (event) => {
      const { name, value, files } = event.target;
      // console.log(files);

      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setProfilePic(reader.result);
        };
    
        reader.readAsDataURL(file);
      }
      else {
        setProfilePic(user.userProfilePicture || ""); 
      }
    
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
  };

 

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        enctype="multipart/form-data"
        className="max-w-md p-8 bg-white rounded-lg shadow-lg w-full"
      >
        <h2 className="text-2xl mb-6 text-center font-semibold text-gray-800">
          Edit My Info
        </h2>


        <label className="block mb-4">
          <span className="text-gray-700 text-lg font-medium">Username:</span>
          <input
            type="text"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 text-lg font-medium">Email:</span>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 text-lg font-medium">Birthday:</span>
          <input
            type="date"
            name="birthday"
            value={user.birthday || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-4">
        <span className="text-gray-700 text-lg font-medium">User Profile Picture:</span>
        <input
          type="file"
          name="profilePic"
          // value={profilePic}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </label>

      {profilePic && (
        <img src={profilePic} alt="User Profile" className="profile-pic" />
      )}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUserProfile;

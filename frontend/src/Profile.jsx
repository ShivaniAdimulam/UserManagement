import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file for styling

function Profile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Get the authToken from localStorage
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // Fetch user profile data using the authToken
      axios.get('http://localhost:4000/admin/getAdminProfile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const userProfileData = response.data.data;
        setUserProfile(userProfileData);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, []);

  return (
    <div className="profile-box">
      <h3>User Profile</h3>
      {userProfile ? (
        <div className="profile-details">
          <p><i className="bi bi-person"></i> First Name: {userProfile.firstName}</p>
          <p><i className="bi bi-person"></i> Last Name: {userProfile.lastName}</p>
          <p><i className="bi bi-envelope"></i> Email: {userProfile.email}</p>
          <p><i className="bi bi-phone"></i> Phone Number: {userProfile.phoneNumber}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;

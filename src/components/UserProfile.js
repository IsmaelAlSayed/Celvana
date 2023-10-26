import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { updateProfile, updatePassword } from 'firebase/auth';
import AuthDetails from './AuthDetails';

function UserProfile() {
  const user = useAuth();
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (user) {
      setNewName(user.displayName || ''); // Initialize the input with the user's current name
      setPhoneNumber(user.phoneNumber || ''); // Display the phone number if available
    }
  }, [user]);

  const handleUpdateName = () => {
    if (user) {
      updateProfile(user, { displayName: newName })
        .then(() => {
          console.log('Name updated successfully');
        })
        .catch((error) => {
          console.error('Error updating name', error);
        });
    }
  };

  const handleUpdatePassword = () => {
    if (user) {
      updatePassword(user, newPassword)
        .then(() => {
          console.log('Password updated successfully');
        })
        .catch((error) => {
          console.error('Error updating password', error);
        });
    }
  };

  return (
    <div>
      <h2>User Profile Settings</h2>

      <label>Name: <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /></label>
      <button onClick={handleUpdateName}>Update Name</button>

      <label>Password: <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></label>
      <button onClick={handleUpdatePassword}>Update Password</button>

      {phoneNumber && <p>Phone Number: {phoneNumber}</p>}
      <AuthDetails />
    </div>
  );
}

export default UserProfile;

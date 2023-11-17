// UserProfile.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import {  updatePassword } from 'firebase/auth';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import AuthDetails from './AuthDetails';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    address: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUserData(userData);
            setEditedUserData(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
          });
        } else {
          console.log('No such document for UID:', user.uid);
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    if (user) {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      if (storedUserData) {
        setUserData(storedUserData);
        setEditedUserData(storedUserData);
      } else {
        fetchUserData();
      }
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUserData(userData);
    setError('');
  };

  const handleSaveEdit = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, editedUserData);

      setUserData(editedUserData);
      localStorage.setItem('userData', JSON.stringify(editedUserData));

      setIsEditing(false);
      setError('');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      // Sign in to verify the old password
      const credential = await signInWithEmailAndPassword(auth, user.email, oldPassword);

      // Check if new password and confirmation match
      if (newPassword !== confirmNewPassword) {
        setError('New password and confirmation do not match.');
        return;
      }

      // Use updatePassword from firebase/auth
      await updatePassword(credential.user, newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setError('');
      console.log('Password updated successfully!');
    } catch (error) {
      setError('Your old password is not correct.');
      console.error('Error updating password:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError('');
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setError('');
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    setError('');
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {userData ? (
        <div>
          {isEditing ? (
            <div>
              <label className="form-label">
                First Name:
                <input
                  className="form-input"
                  type="text"
                  name="firstName"
                  value={editedUserData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label className="form-label">
                Last Name:
                <input
                  className="form-input"
                  type="text"
                  name="lastName"
                  value={editedUserData.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label className="form-label">
                Email:
                <input
                  className="form-input"
                  type="text"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label className="form-label">
                Phone Number:
                <input
                  className="form-input"
                  type="text"
                  name="phoneNumber"
                  value={editedUserData.phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label className="form-label">
                City:
                <input
                  className="form-input"
                  type="text"
                  name="city"
                  value={editedUserData.city}
                  onChange={handleInputChange}
                />
              </label>
              <label className="form-label">
                Address:
                <input
                  className="form-input"
                  type="text"
                  name="Address"
                  value={editedUserData.address}
                  onChange={handleInputChange}
                />
              </label>
              <div className="button-container">
                <button className="button" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="button button-cancel" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="user-data-container">
              <p className="user-data-item">First Name: {userData.firstName}</p>
              <p className="user-data-item">Last Name: {userData.lastName}</p>
              <p className="user-data-item">Email: {userData.email}</p>
              <p className="user-data-item">Phone Number: {userData.phoneNumber}</p>
              <p className="user-data-item">city: {userData.city}</p>
              <p className="user-data-item">Address: {userData.address}</p>
              <button className="button" onClick={handleEditClick}>
                Edit
              </button>
            </div>
          )}
          {/* Change Password Section */}
          <div className="change-password-container">
            <h3>Change Password</h3>
            {error && <p className="error-message">{error}</p>}
            <label className="form-label">Old Password:</label>
            <input
              className="form-input"
              type="password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
            <label className="form-label">New Password:</label>
            <input
              className="form-input"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <label className="form-label">Confirm New Password:</label>
            <input
              className="form-input"
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
            <div className="button-container">
              <button className="button" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
            <AuthDetails />
    </div>
  );
};

export default UserProfile;

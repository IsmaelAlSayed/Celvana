import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  
  const signUp = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is already in use
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // If user creation is successful, proceed to Firestore data storage
      const db = getFirestore();
      const usersCollection = collection(db, 'users');

      // Use the user's UID as the document ID
      const userDocRef = doc(usersCollection, userCredential.user.uid);

      // Create a document in the 'users' collection with user information
      await setDoc(userDocRef, {
        uid: userCredential.user.uid, // Add the uid field
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: '',
        address: '',
      });

      console.log("User and additional information saved successfully!");
      navigate('/signin');
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("Email is already in use. Please sign in or use a different email.");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

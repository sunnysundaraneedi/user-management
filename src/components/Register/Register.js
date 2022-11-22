import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import "./Register.css";
import { db } from "../../Firebase/firebase";
import Loader from "../../UI/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    experience: "",
    designation: "",
    manager: "",
    branch: "",
    state: "",
    zip: "",
  });
  const changeHandler = (event) => {
    setInputFields((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        ...inputFields,
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log("Something went wrong : ", error);
    }
  };
  return (
    <div>
      {isLoading && <Loader />}
      <form onSubmit={submitHandler} className="register-form">
        <h3>Register</h3>

        <div className="container">
          <div className="input-container">
            <input
              type="text"
              name="first_name"
              value={inputFields.first_name}
              onChange={changeHandler}
              placeholder="Enter Your First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              value={inputFields.last_name}
              onChange={changeHandler}
              placeholder="Enter Your Last Name"
              required
            />
            <input
              type="text"
              name="email"
              value={inputFields.email}
              onChange={changeHandler}
              placeholder="Enter Your Email Address"
              required
            />
            <input
              type="text"
              name="experience"
              value={inputFields.experience}
              onChange={changeHandler}
              placeholder="Enter Your Experience in Years"
              required
            />
            <input
              type="text"
              name="designation"
              value={inputFields.designation}
              onChange={changeHandler}
              placeholder="Enter Your Designation(Manager/Associate/....)"
              required
            />
            <input
              type="text"
              name="manager"
              value={inputFields.manager}
              onChange={changeHandler}
              placeholder="Enter Your Manager Name"
              required
            />
            <input
              type="text"
              name="branch"
              value={inputFields.branch}
              onChange={changeHandler}
              placeholder="Enter Your Branch Name"
              required
            />
            <input
              type="text"
              name="state"
              value={inputFields.state}
              onChange={changeHandler}
              placeholder="Enter Your State"
              required
            />
            <input
              type="text"
              name="zip"
              value={inputFields.zip}
              onChange={changeHandler}
              placeholder="Enter Your Zip Code"
              required
            />
          </div>
          <button type="submit">Register</button>
          <Link to="/" className="login-text">
            Already have an account? Login Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

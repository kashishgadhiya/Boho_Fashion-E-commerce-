


import React, { useState } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: ""
  });

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {
      username: "",
      password: "",
      email: ""
    };

    if (state === "Signup") {
      if (formdata.username === "") {
        errors.username = "Username is required";
        valid = false;
      }
      if (formdata.email === "" || !validateEmail(formdata.email)) {
        errors.email = formdata.email === "" ? "Email is required" : "Invalid email format";
        valid = false;
      }
      if (formdata.password === "" || !validatePassword(formdata.password)) {
        errors.password = formdata.password === "" ? "Password is required" : "Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, and one digit";
        valid = false;
      }
    } else {
      if (formdata.email === "") {
        errors.email = "Email is required";
        valid = false;
      }
      if (formdata.password === "") {
        errors.password = "Password is required";
        valid = false;
      }
    }

    setErrors(errors);
    return valid;
  };

  const changeHandler = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    // Clear error messages when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const loginHandler = async () => {
    if (!validateForm()) return;

    console.log("Login Function", formdata);
    let responseData;
    await fetch("https://boho-fashion-e-commerce.onrender.com/login", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);

      // Check if the user is admin
      if (
        formdata.email === "test2605@gmail.com" &&
        formdata.password === "*********"
      ) {
        window.location.replace("https://boho-fashion-admin.vercel.app/");
      } else {
        window.location.replace("/");
      }
    } else {
      alert(responseData.errors);
    }
  };

  const signupHandler = async () => {
    if (!validateForm()) return;

    console.log("Signup Function", formdata);
    let responseData;
    await fetch("https://boho-fashion-e-commerce.onrender.com/signup", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      alert("You have successfully signed up");
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-7 min-h-screen">
        <h1 className="text-3xl font-semibold text-center" style={{ color: '#a00220' }}>{state}</h1>
        <div className="flex flex-col mt-10">
          {state === "Signup" && (
            <>
              <input
                type="text"
                name="username"
                value={formdata.username}
                onChange={changeHandler}
                placeholder="Your Name"
                className="p-3 my-3"
                style={{ border: "1px solid gray" }}
              />
              {errors.username && <p className="text-yellow-500 text-sm">{errors.username}</p>}
            </>
          )}
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={changeHandler}
            placeholder="Your Email Address"
            className="p-3 my-3"
            style={{ border: "1px solid gray" }}
          />
          {errors.email && <p className={`text-${errors.email === "Invalid email format" ? "red-500" : "yellow-500"} text-sm`}>{errors.email}</p>}
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={changeHandler}
            placeholder="Your Password"
            className="p-3 my-3"
            style={{ border: "1px solid gray" }}
          />
          {errors.password && <p className={`text-${errors.password === "Password is required" ? "yellow-500" : "red-500"} text-sm`}>{errors.password}</p>}
        </div>
        <button className="w-full py-3 text-lg text-white" style={{ backgroundColor: '#a00220' }} onClick={() => { state === "Login" ? loginHandler() : signupHandler() }}>Continue</button>
        {state === "Signup" && <p className="py-3">
          Already have an account? <span className="font-semibold cursor-pointer" style={{ color: '#a00220' }} onClick={() => { setState("Login") }}>Login here</span>
        </p>}
        {state === "Login" && <p className="py-3">
          Create an account? <span className="font-semibold cursor-pointer" style={{ color: '#a00220' }} onClick={() => { setState("Signup") }}>Click here</span>
        </p>}
      </div>
    </>
  );
};

export default LoginSignup;


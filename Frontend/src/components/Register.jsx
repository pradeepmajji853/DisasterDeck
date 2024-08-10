import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();

      setMessage("Registration successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("There was an error!", error);
      setError("form", { type: "manual", message: "An error occurred during registration: " + error.message });
    }
  };

  return (
    <div className="Register">
      <div className="RLcard">
        <h1>Register</h1>
        <h3>
          Already have an account? <Link to="/login">Login!</Link>
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="registerform">
            <li>
              <label htmlFor="firstName" className="labels">First Name:</label>
              <input
                className={`inputel ${errors.firstName ? "error-border" : ""}`}
                placeholder="First Name"
                type="text"
                {...register("firstName", {
                  required: "This field is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </li>
            <li>
              <label htmlFor="lastName" className="labels">Last Name:</label>
              <input
                className={`inputel ${errors.lastName ? "error-border" : ""}`}
                placeholder="Last Name"
                type="text"
                {...register("lastName", {
                  required: "This field is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                })}
              />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </li>
            <li>
              <label htmlFor="email" className="labels">Email:</label>
              <input
                className={`inputel ${errors.email ? "error-border" : ""}`}
                placeholder="Email"
                type="text"
                {...register("email", {
                  required: "This field is required",
                  minLength: { value: 5, message: "Minimum length is 5" },
                })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </li>
            <li>
              <label htmlFor="password" className="labels">Password:</label>
              <input
                className={`inputel ${errors.password ? "error-border" : ""}`}
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: { value: 5, message: "Minimum length is 5" },
                })}
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </li>
            <li>
              <input
                disabled={isSubmitting}
                type="submit"
                value="Register to Campus Cash"
                className="inputSub"
              />
            </li>
            {isSubmitting && <p>Loading...</p>}
            {errors.form && <p className="error-text">{errors.form.message}</p>}
            {message && <p className="success-text">{message}</p>}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Register;

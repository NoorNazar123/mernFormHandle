import { useState } from "react";
import Input from "./Input"; // Import the reusable Input component

const LoginUser = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login Data: ", loginData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <Input
          label="Username"
          type="text"
          placeholder="Enter your username"
          value={loginData.username}
          onChange={handleChange}
          name="username"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleChange}
          name="password"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>

        {/* Forgot Password Link */}
        <p className="mt-4 text-center text-gray-600">
          Forgot your password?{" "}
          <a href="/reset-password" className="text-blue-500 hover:underline">
            Reset it here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginUser;

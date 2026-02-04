import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({ email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);
      handleClearForm();
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-3xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} onReset={handleClearForm}>

            <div className="form-control mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>

            <div className="flex gap-3">
              <button type="reset" className="btn btn-outline w-1/2">
                Clear
              </button>

              <button type="submit" className="btn btn-primary w-1/2">
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;

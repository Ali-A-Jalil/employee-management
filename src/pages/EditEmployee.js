import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateEmployee, fetchEmployees } from "../features/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  // Fetch employee data if not already loaded
  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchEmployees());
    }
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        age: employee.age,
      });
    }
  }, [dispatch, employees, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age) {
      alert("All fields are required!");
      return;
    }
    // Dispatch updateEmployee action
    dispatch(updateEmployee({ id: parseInt(id), ...formData }))
      .unwrap()
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        alert("Failed to update employee. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Employee</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded mt-1"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// جلب الموظفين
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    try {
      const response = await axios.get(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataSel"
      );

      if (Array.isArray(response.data)) {
        return response.data;
      }
      console.error("API response is not an array:", response.data);
      return [];
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("Failed to fetch employees.");
    }
  }
);

// إضافة موظف جديد
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee) => {
    try {
      const response = await axios.post(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataIns",
        employee
      );
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw new Error("Failed to add employee.");
    }
  }
);

// تحديث بيانات موظف
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee) => {
    try {
      const response = await axios.post(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd",
        employee
      );
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw new Error("Failed to update employee.");
    }
  }
);

// حذف موظف
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id) => {
    try {
      await axios.post(
        "https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataDel",
        { id }
      );
      return id; // إعادة الـ ID لتحديث الحالة
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw new Error("Failed to delete employee.");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: { employees: [], status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // جلب الموظفين
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // إضافة موظف جديد
      .addCase(addEmployee.fulfilled, (state, action) => {
        if (action.payload && typeof action.payload === "object") {
          state.employees = [...state.employees, action.payload];
        } else {
          console.error("Invalid response for added employee:", action.payload);
        }
      })
      .addCase(addEmployee.rejected, (state, action) => {
        console.error("Failed to add employee:", action.error.message);
        state.error = action.error.message;
      })

      // تحديث بيانات موظف
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        console.error("Failed to update employee:", action.error.message);
        state.error = action.error.message;
      })

      // حذف موظف
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        console.error("Failed to delete employee:", action.error.message);
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;

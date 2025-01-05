import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";
import { motion } from "framer-motion";
import { fetchEmployees, deleteEmployee } from "../features/employeeSlice";
import Filters from "../components/Filters/Filters";
import Pagination from "../components/Pagination/Pagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  // Fetch employees data
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Update filtered data when employees change
  useEffect(() => {
    setFilteredData(employees);
  }, [employees]);

  // Handle search functionality
  const handleSearch = useCallback(
    (term) => {
      if (term) {
        setFilteredData(
          employees.filter((emp) =>
            emp.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      } else {
        setFilteredData(employees);
      }
    },
    [employees]
  );

  // Handle filter functionality
  const handleFilter = useCallback(
    (column) => {
      const sortedData = [...filteredData].sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
      setFilteredData(sortedData);
    },
    [filteredData]
  );

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => <ActionButtons id={row.original.id} />,
      },
    ],
    []
  );

  const data = useMemo(() => paginatedData, [paginatedData]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Employee Dashboard
        </h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          + Add Employee
        </Link>
      </header>

      {/* Filters */}
      <Filters onSearch={handleSearch} onFilter={handleFilter} />

      {/* Table Container */}
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        {filteredData.length > 0 ? (
          <table
            role="table"
            aria-label="Employee Data Table"
            {...getTableProps()}
            className="w-full table-auto border-collapse"
          >
            <thead className="bg-blue-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="border-b-2 border-blue-300 px-4 py-2 text-left text-blue-700 font-semibold"
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <motion.tbody
              {...getTableBodyProps()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {data.map((row) => {
                prepareRow(row);
                return (
                  <motion.tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-100 transition duration-150"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="border-t border-gray-300 px-4 py-2 text-gray-800"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No employees found.</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / pageSize)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const ActionButtons = React.memo(({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deleteEmployee(id));
  }, [dispatch, id]);

  return (
    <div className="flex space-x-2">
      <Link
        to={`/edit/${id}`}
        className="text-blue-500 hover:text-blue-700 transition duration-200"
      >
        <FaEdit />
      </Link>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 transition duration-200"
      >
        <FaTrash />
      </button>
    </div>
  );
});

export default Dashboard;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { removeEmployee, fetchEmployees } from '../redux/employeeSlice';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const employees = useSelector((state) => state.employees.list);

  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (id) => {
    nagivate(`/employee/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(removeEmployee(id));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  const filteredData = employees.filter(
    (item) =>
      item.id.toString().includes(searchQuery) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Box display="flex" justifyContent="center" >
        <TextField id="standard-basic" label="Search By Id and Tiltle" variant="standard" onChange={handleSearchChange} />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedItems.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.title}</TableCell>
                <TableCell>{employee.body}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(employee.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" margin={5}>
          <Button variant="contained" onClick={handleClickPrev} disabled={currentPage === 1} style={{ marginRight: "10px" }}>
            Previous
          </Button>
          <Button variant="contained" onClick={handleClickNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Box>
      </TableContainer>
    </>
  );
};

export default EmployeeTable;
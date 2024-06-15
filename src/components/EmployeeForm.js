import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TextField, Button, Box } from '@mui/material';
import { updateEmployee } from '../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ employee, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      title: employee?.title || '',
      body: employee?.body || '',
    },
    onSubmit: (values) => {
      dispatch(updateEmployee({ id: employee.id, data: values }));
      navigate('/')
    },
  });
  console.log("employee->", employee)
  return (
    <form onSubmit={formik.handleSubmit} >
      <TextField
        label="Title"
        fullWidth
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        style={{ margin: "15px" }}
      />
      <TextField
        label="Body"
        name="body"
        multiline
        maxRows={4}
        fullWidth
        style={{ margin: "15px" }}
        value={formik.values.body}
        onChange={formik.handleChange}
      />
      <Box display="flex" justifyContent="center">
        <Button variant='contained' type="submit">Update</Button>
      </Box>
    </form>
  );
};

export default EmployeeForm;
import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from '../redux/employeeSlice';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { fetchEmployees } from '../redux/employeeSlice';
import * as Yup from 'yup';


// Validation schema
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),

});

// Modal style
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EmployeeList = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const employees = useSelector((state) => state.employees.list);

    React.useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <h1>Post List</h1>
            <div>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Create Post
                    </Button>
                </Box>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" marginBottom={2}>
                            Create Post
                        </Typography>
                        <Formik
                            initialValues={{
                                body: '',
                                title: '',
                                userId: '1',
                                id: employees.length,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                dispatch(createEmployee(values))
                                setTimeout(() => {
                                    console.log(values);
                                    setSubmitting(false);
                                    handleClose();
                                }, 400);
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        margin="normal"
                                        error={touched.title && !!errors.title}
                                        helperText={touched.title && errors.title}
                                    />
                                    <Field
                                        as={TextField}
                                        name="body"
                                        label="Body"
                                        fullWidth
                                        margin="normal"
                                        error={touched.body && !!errors.body}
                                        helperText={touched.body && errors.body}
                                    />
                                    <Box mt={2}>
                                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                                            Submit
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Modal>
            </div>
            <EmployeeTable />
        </div>
    );
};

export default EmployeeList;
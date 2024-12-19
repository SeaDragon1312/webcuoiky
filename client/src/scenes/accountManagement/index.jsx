import React, { useState } from "react";
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Grid from '@mui/material/Unstable_Grid2';
import { tokens } from "../../theme";

const initialValues = {
    username: "",
    email: "",
    role: ""
};

const validationSchema = yup.object({
    username: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    role: yup.string().required("Required")
});

const initialAccounts = [
    { id: 1, username: "user1", email: "user1@example.com", role: "admin" },
    { id: 2, username: "user2", email: "user2@example.com", role: "user" },
    { id: 3, username: "user3", email: "user3@example.com", role: "user" },
    { id: 4, username: "user4", email: "user4@example.com", role: "user" },
    { id: 5, username: "user5", email: "user5@example.com", role: "user" },
    { id: 6, username: "user6", email: "user6@example.com", role: "user" },
    { id: 7, username: "user7", email: "user7@example.com", role: "user" },
    { id: 8, username: "user8", email: "user8@example.com", role: "user" },
    { id: 9, username: "user9", email: "user9@example.com", role: "user" },
    { id: 10, username: "user10", email: "user10@example.com", role: "user" }
];

const AccountManagement = () => {
    const theme = useTheme();
       const colors = tokens(theme.palette.mode);
       const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState(initialAccounts);
    // const [open, setOpen] = useState(false);
    const [editAccount, setEditAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditAccount(null);
    };

    const handleConfirmOpen = (account) => {
        setDeleteAccount(account);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
        setDeleteAccount(null);
    };

    const handleFormSubmit = (values) => {
        if (editAccount) {
            setAccounts(accounts.map(acc => acc.id === editAccount.id ? { ...acc, ...values } : acc));
            toast.success("Cập nhật tài khoản thành công");
        } else {
            setAccounts([...accounts, { id: accounts.length + 1, ...values }]);
            toast.success("Thêm tài khoản thành công");
        }
        handleClose();
    };

    const handleEdit = (account) => {
        setEditAccount(account);
        handleOpen();
    };

    const handleDelete = () => {
        setAccounts(accounts.filter(acc => acc.id !== deleteAccount.id));
        toast.success("Xóa tài khoản thành công");
        handleConfirmClose();
    };

    return (
        <Box m="20px">
            <Header title="Quản lý tài khoản" subtitle="Quản lý danh sách các tài khoản của trung tâm" />

            {/* Static */}
        <Grid container spacing={2} >
            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}>
                <StatBox
                    stat="12,362"
                    title="Tháng 3"
                    subtitle="Xe đăng kiểm mới"
                    progress="0.14"
                    increase="+14%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
                >
                <StatBox
                    stat="27,362"
                    title="Quý 1"
                    subtitle="Xe đăng kiểm mới"
                    progress="0.35"
                    increase="+35%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
                >
                <StatBox
                    stat="27,362"
                    title="Năm 2023"
                    subtitle="Xe đăng kiểm mới"
                    progress="0.35"
                    increase="+35%"
                />
                </Box>
            </Grid>

            <Grid xs={6} md={3}>
                <Box
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: 140}}
                >
                <StatBox
                    stat="1,362"
                    title="Thống kê"
                    subtitle="Xe sắp hết hạn đăng kiểm"
                    progress="0.05"
                    increase="5%"
                />
                </Box>
            </Grid>  
        </Grid>
            <Button variant="contained" color="primary" onClick={handleOpen}>Thêm tài khoản</Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên tài khoản</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.id}</TableCell>
                                <TableCell>{account.username}</TableCell>
                                <TableCell>{account.email}</TableCell>
                                <TableCell>{account.role}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEdit(account)}
                                        sx={{ mr: 1 }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{ backgroundColor: 'red', color: 'white' }}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleConfirmOpen(account)}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editAccount ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={editAccount || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="username"
                                    label="Tên tài khoản"
                                    fullWidth
                                    margin="normal"
                                    error={touched.username && !!errors.username}
                                    helperText={touched.username && errors.username}
                                />
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    error={touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                                <Field
                                    as={TextField}
                                    name="role"
                                    label="Vai trò"
                                    fullWidth
                                    margin="normal"
                                    error={touched.role && !!errors.role}
                                    helperText={touched.role && errors.role}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">Hủy</Button>
                                    <Button type="submit" color="primary">{editAccount ? "Cập nhật" : "Thêm"}</Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa tài khoản này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="secondary">Hủy</Button>
                    <Button onClick={handleDelete} sx={{ backgroundColor: 'red', color: 'white' }}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AccountManagement;
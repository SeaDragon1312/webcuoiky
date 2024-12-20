import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarDensitySelector, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const initialValues = {
    username: "",
    email: "",
    phone: "",
    fullname: "",
    password: ""
};

const validationSchema = yup.object({
    username: yup.string().required("Required"),
    email: yup.string().email("Invalid email format").required("Required"),
    phone: yup.string().required("Required"),
    fullname: yup.string().required("Required"),
    password: yup.string().required("Required")
});

const AccountManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editAccount, setEditAccount] = useState(null);
    const [deleteAccount, setDeleteAccount] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/user");
            const data = await response.json();
            if (response.ok) {
                setAccounts(data);
            } else {
                toast.error(data);
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

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

    const handleFormSubmit = async (values) => {
        try {
            const response = editAccount
                ? await fetch(`http://localhost:3001/api/user/${editAccount.id}`, {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                  })
                : await fetch("http://localhost:3001/api/auth/signup", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                  });

            const data = await response.json();

            if (response.ok) {
                fetchAccounts();
                toast.success(editAccount ? "Cập nhật tài khoản thành công" : "Thêm tài khoản thành công");
                handleClose();
            } else {
                toast.error(data);
            }
        } catch (error) {
            console.error("Error saving account:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleEdit = (account) => {
        setEditAccount(account);
        handleOpen();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${deleteAccount.id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                fetchAccounts();
                toast.success("Xóa tài khoản thành công");
                handleConfirmClose();
            } else {
                toast.error(data);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "username", headerName: "Tên tài khoản", flex: 2 },
        { field: "fullname", headerName: "Họ và tên", flex: 2 },
        { field: "email", headerName: "Email", flex: 3 },
        { field: "phone", headerName: "Số điện thoại", flex: 2 },
        {
            field: "actions",
            headerName: "Hành động",
            flex: 2,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(params.row)}
                        sx={{ mr: 1 }}
                    >
                        Sửa
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleConfirmOpen(params.row)}
                    >
                        Xóa
                    </Button>
                </strong>
            ),
        },
    ];

    const CustomToolbar = () => (
        <GridToolbarContainer sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
            <GridToolbarColumnsButton sx={{ color: colors.grey[100] }} />
            <GridToolbarDensitySelector sx={{ color: colors.grey[100] }} />
            <GridToolbarExport sx={{ color: colors.grey[100] }} />
        </GridToolbarContainer>
    );

    return (
        <Box m="20px">
            <Header title="Quản lý tài khoản" subtitle="Danh sách tài khoản" />
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>Thêm tài khoản</Button>
            <Box
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={accounts}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10, 50, 100]}
                    pagination
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </Box>

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
                                    name="phone"
                                    label="Số điện thoại"
                                    fullWidth
                                    margin="normal"
                                    error={touched.phone && !!errors.phone}
                                    helperText={touched.phone && errors.phone}
                                />
                                <Field
                                    as={TextField}
                                    name="fullname"
                                    label="Họ và tên"
                                    fullWidth
                                    margin="normal"
                                    error={touched.fullname && !!errors.fullname}
                                    helperText={touched.fullname && errors.fullname}
                                />
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    error={touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">Hủy</Button>
                                    <Button type="submit" sx={{ backgroundColor: 'green', color: 'white' }}>{editAccount ? "Cập nhật" : "Thêm"}</Button>
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
                    <Button onClick={handleDelete} color="primary">Xóa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AccountManagement;
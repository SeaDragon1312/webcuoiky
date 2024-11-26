import { Typography, Box, useTheme, Container } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

function Statistics() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [time, setTime] = useState();

    function handleChange(event) {}

    return (
        <Box>
            {/* Thống kê tổng quát */}
            <Box m="20px" sx={{ paddingBottom: 4 }}>
                <Header title="Thống kê" subtitle="Số liệu đăng kiểm" />

                <Box
                    sx={{
                        display: "flex",
                        // flexDirection: "row",

                        placeContent: "space-between",
                    }}
                >
                    <Select
                        sx={{ width: "30%" }}
                        id="time"
                        value={time}
                        defaultValue={0}
                        onChange={handleChange}
                        label="Time"
                    >
                        <MenuItem value={0}>All time</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                    <Select
                        sx={{ width: "30%" }}
                        id="place"
                        value={time}
                        defaultValue={0}
                        onChange={handleChange}
                        label="Trung tâm"
                    >
                        <MenuItem disabled value="">
                            <em>Trung tâm: </em>
                        </MenuItem>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                    <Select
                        sx={{ width: "30%" }}
                        id="line"
                        value={time}
                        defaultValue={0}
                        onChange={handleChange}
                        label="Dây chuyền"
                    >
                        <MenuItem disabled value="">
                            <em>Dây chuyền: </em>
                        </MenuItem>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>
                </Box>

                <Box height="75vh" paddingTop={5}>
                    <Typography variant="h4" color={colors.greenAccent[400]}>
                        Lượng xe đăng kiểm trong 10 tháng gần nhất và dự báo
                        tháng sắp tới
                    </Typography>
                    <LineChart />
                </Box>
            </Box>
            {/* Dự báo số liệu */}
            <Box m="20px">
                <Header
                    title="Dự báo số liệu"
                    subtitle="Dự báo số lượng xe đăng kiểm trong tháng tới "
                />

                <Box height="75vh" paddingTop={5}>
                    <Typography variant="h4" color={colors.greenAccent[400]}>
                        Lượng xe đăng kiểm trong 10 tháng gần nhất và dự báo
                        tháng sắp tới
                    </Typography>
                    <LineChart />
                </Box>
            </Box>
        </Box>
    );
}

export default Statistics;

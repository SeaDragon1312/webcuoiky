import { useState } from "react";
import { Typography, Box, MenuItem, Select, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { mockRegistry } from "../../data/mockData";
import { tokens } from "../../theme";
const Line = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [time, setTime] = useState();
    const [center, setCenter] = useState("all");
    return (
        <Box m="20px">
            <Header
                title="Dự báo số liệu"
                subtitle="Dự báo số lượng xe đăng kiểm trong tháng tới "
            />

            <Box
                sx={{
                    display: "flex",
                    // flexDirection: "row",
                    paddingBottom: 2,
                    placeContent: "space-between",
                }}
            >
                <Select
                    sx={{ flex: 1, marginX: 2 }}
                    id="time"
                    value={time}
                    defaultValue={0}
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                    label="Time"
                >
                    <MenuItem disabled value={-1}>
                        <em>Khoảng thời gian: </em>
                    </MenuItem>
                    <MenuItem value={0}>Thời gian: All time</MenuItem>
                    <MenuItem value={1}>Quý I</MenuItem>
                    <MenuItem value={2}>Quý II</MenuItem>
                    <MenuItem value={3}>Quý III</MenuItem>
                    <MenuItem value={4}>Quý IV</MenuItem>
                </Select>
                <Select
                    sx={{ flex: 1, marginX: 2 }}
                    id="center"
                    value={center}
                    defaultValue={"all"}
                    onChange={(e) => {
                        setCenter(e.target.value);
                    }}
                    label="Trung tâm"
                    InputLabelProps={{
                        sx: { color: colors.grey[800] },
                    }}
                >
                    <MenuItem disabled value="">
                        <em>Trung tâm: </em>
                    </MenuItem>
                    <MenuItem value={"all"}>Trung tâm: All</MenuItem>
                    {mockRegistry.map((item) => (
                        <MenuItem key={item.center} value={item.center}>
                            {item.center}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Box height="75vh" paddingTop={2}>
                <Typography variant="h4" color={colors.greenAccent[400]}>
                    Lượng xe đăng kiểm trong 10 tháng gần nhất và dự báo tháng
                    sắp tới
                </Typography>
                <LineChart />
            </Box>
        </Box>
    );
};

export default Line;

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Users from './Users';
import useUserListener from '../../../helpers/usersListener';
import Jobs from './Jobs';
import DepartmentSettings from './DepartmentSettings';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function Dashboard() {
    const [value, setValue] = React.useState(0);
    useUserListener()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box id="CONTAINER" sx={{ width: '90%', marginTop: 2, borderRadius: '10px', bgcolor: 'rgb(27, 102, 15, 0.6)' }} component={'span'}>
            <Box id="TABS_CONTAINER" sx={{ borderBottom: 1, borderTopRightRadius: '10px', borderTopLeftRadius: '10px', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Tabs value={value} centered onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Users" sx={{ width: '20%', }} {...a11yProps(0)} />
                    <Tab label="Jobs" sx={{ width: '20%' }} {...a11yProps(1)} />
                    <Tab label="Schedule Settings" sx={{ width: '20%' }} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel id="USERS_TAB" value={value} index={0}>
                <Users />
            </CustomTabPanel>
            <CustomTabPanel id="JOBS_TAB" value={value} index={1}>
                <Jobs />
            </CustomTabPanel>
            <CustomTabPanel id="SCHEDULE_SETTINGS" value={value} index={2}>
                <DepartmentSettings />
            </CustomTabPanel>
        </Box>
    );
}
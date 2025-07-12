import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Chip,
  Pagination,
} from '@mui/material';

import {
  People,
  Event,
  Edit,
  Delete,
  Person,
} from '@mui/icons-material';

import usePatients from './hooks/getPatient';

const drawerWidth = 260;
const pageSize = 15;

export default function PatientsPage() {
  const { data: patients = [], isLoading, error } = usePatients();
  const [filterText, setFilterText] = React.useState('');
  const [page, setPage] = React.useState(1);

  // Filter patients by search text
  const filteredPatients = patients.filter((p) =>
    p.fullName?.toLowerCase().includes(filterText.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / pageSize);
  const paginatedPatients = filteredPatients.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">Patients</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {[{ text: 'Dashboard', icon: <Event /> }, { text: 'Patients', icon: <People /> }].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ maxWidth: '1400px', mx: 'auto', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">Registered Patients</Typography>
            <Button variant="contained">+ Add Patient</Button>
          </Box>

          <TextField
            label="Search Patients"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, bgcolor: '#fff' }}
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setPage(1); // Reset to first page on search
            }}
          />

          {isLoading ? (
            <Typography>Loading patients...</Typography>
          ) : error ? (
            <Typography color="error">Error loading patients: {error.message}</Typography>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: '#fafafa' }}>
                    <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>DOB</TableCell>
                      <TableCell>Medical History</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedPatients.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person fontSize="small" />
                            {p.fullName}
                          </Box>
                        </TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>{p.phoneNumber}</TableCell>
                        <TableCell>{p.dateOfBirth}</TableCell>
                        <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
  <Chip
    label={p.medicalHistory || 'N/A'}
    size="small"
    sx={{ bgcolor: '#e0f7fa', borderRadius: '8px', whiteSpace: 'normal' }}
  />
</TableCell>
                        <TableCell align="right">
                          <IconButton sx={{ color: '#64b5f6' }}>
                            <Edit />
                          </IconButton>
                          <IconButton sx={{ color: '#ef9a9a' }}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedPatients.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No patients found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

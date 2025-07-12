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
  Grid,
  Card,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Chip,
} from '@mui/material';

import {
  People,
  Event,
  Person,
  Edit,
  Delete,
  CheckCircleOutline,
  Cancel,
  MonetizationOn,
  HourglassBottom,
} from '@mui/icons-material';

const drawerWidth = 260;

export default function DashboardLayout() {
  const [appointments, setAppointments] = React.useState([
    { id: 1, patient: 'John Doe', time: '10:00 AM', treatment: 'Root Canal', payment: 'Paid', status: 'Active' },
    { id: 2, patient: 'Jane Smith', time: '11:30 AM', treatment: 'Cleaning', payment: 'Pending', status: 'Active' },
    { id: 3, patient: 'Sarah Lee', time: '2:00 PM', treatment: 'Filling', payment: 'Paid', status: 'Active' },
  ]);

  const [cancelled, setCancelled] = React.useState([]);
  const [filter, setFilter] = React.useState('Active');

  const [editOpen, setEditOpen] = React.useState(false);
  const [currentEdit, setCurrentEdit] = React.useState(null);

  // New patient modal
  const [addPatientOpen, setAddPatientOpen] = React.useState(false);
  const [newPatient, setNewPatient] = React.useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
  });

  const handleDelete = (id) => {
    const found = appointments.find((a) => a.id === id);
    if (found) {
      const updated = { ...found, status: 'Cancelled' };
      setCancelled((prev) => [...prev, updated]);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleEditOpen = (appt) => {
    setCurrentEdit(appt);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setCurrentEdit(null);
    setEditOpen(false);
  };

  const handleSaveEdit = () => {
    if (currentEdit.status === 'Cancelled') {
      setCancelled((prev) =>
        prev.map((a) => (a.id === currentEdit.id ? currentEdit : a))
      );
    } else {
      setAppointments((prev) =>
        prev.map((a) => (a.id === currentEdit.id ? currentEdit : a))
      );
    }
    handleEditClose();
  };

  const handleAddPatientOpen = () => {
    setAddPatientOpen(true);
  };

  const handleAddPatientClose = () => {
    setNewPatient({ name: '', age: '', gender: '', contact: '' });
    setAddPatientOpen(false);
  };

  const handleAddPatientSave = () => {
    // Here you could call an API to save patient data
    console.log('New patient added:', newPatient);
    handleAddPatientClose();
  };

  const displayed =
    filter === 'Cancelled'
      ? cancelled
      : filter === 'Paid'
      ? appointments.filter((a) => a.payment === 'Paid')
      : filter === 'Pending'
      ? appointments.filter((a) => a.payment === 'Pending')
      : appointments;

  const getStatusColor = (status) =>
    status === 'Cancelled' ? '#ffe0e0' : '#e0f7fa';

  const getPaymentColor = (payment) =>
    payment === 'Paid' ? '#e8f5e9' : '#fff8e1';

  const cardData = [
    {
      label: 'Active',
      count: appointments.length,
      color: '#e0f7fa',
      icon: <CheckCircleOutline sx={{ fontSize: 40, color: '#26a69a' }} />,
    },
    {
      label: 'Cancelled',
      count: cancelled.length,
      color: '#ffe0e0',
      icon: <Cancel sx={{ fontSize: 40, color: '#ef5350' }} />,
    },
    {
      label: 'Paid',
      count: appointments.filter((a) => a.payment === 'Paid').length,
      color: '#e8f5e9',
      icon: <MonetizationOn sx={{ fontSize: 40, color: '#66bb6a' }} />,
    },
    {
      label: 'Pending',
      count: appointments.filter((a) => a.payment === 'Pending').length,
      color: '#fff8e1',
      icon: <HourglassBottom sx={{ fontSize: 40, color: '#ffb74d' }} />,
    },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">My Dashboard</Typography>
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
          {[{ text: 'Register a new patient', icon: <People /> }, { text: 'Book Appointment', icon: <Event /> }].map(
            (item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
          )}
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
        <Box sx={{ maxWidth: '1200px', mx: 'auto', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">Welcome to the Dashboard!</Typography>
            <Button variant="contained" onClick={handleAddPatientOpen}>
              + Add New Patient
            </Button>
          </Box>

          <TextField
            label="Search Appointments"
            variant="outlined"
            fullWidth
            sx={{ mb: 3, bgcolor: '#fff' }}
          />

          <Grid
            container
            spacing={2}
            sx={{
              mb: 4,
              flexWrap: 'nowrap',
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {cardData.map((card) => (
              <Grid item key={card.label} sx={{ flex: '0 0 280px' }}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    bgcolor: card.color,
                    height: '90px',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    border: filter === card.label ? '2px solid #90caf9' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': { transform: 'translateY(-3px)' },
                  }}
                  onClick={() => setFilter(card.label)}
                >
                  {card.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {card.count}
                    </Typography>
                    <Typography variant="subtitle1">{card.label}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: '#fafafa' }}>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment</TableCell>
                  {filter !== 'Cancelled' && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayed.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person fontSize="small" />
                        {a.patient}
                      </Box>
                    </TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell>{a.treatment}</TableCell>
                    <TableCell>
                      <Chip
                        label={a.status}
                        sx={{ bgcolor: getStatusColor(a.status), fontWeight: 'bold', borderRadius: '16px' }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={a.payment}
                        sx={{ bgcolor: getPaymentColor(a.payment), fontWeight: 'bold', borderRadius: '16px' }}
                        size="small"
                      />
                    </TableCell>
                    {filter !== 'Cancelled' && (
                      <TableCell align="right">
                        <IconButton onClick={() => handleEditOpen(a)} sx={{ color: '#64b5f6' }}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(a.id)} sx={{ color: '#ef9a9a' }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Add New Patient Dialog */}
        <Dialog open={addPatientOpen} onClose={handleAddPatientClose}>
          <DialogTitle> Add New Patient</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <TextField
              label="Age"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
            <TextField
              label="Gender"
              value={newPatient.gender}
              onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
            />
            <TextField
              label="Contact"
              value={newPatient.contact}
              onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddPatientClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddPatientSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Appointment Dialog */}
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Appointment</DialogTitle>
          {currentEdit && (
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Patient"
                value={currentEdit.patient}
                onChange={(e) => setCurrentEdit({ ...currentEdit, patient: e.target.value })}
              />
              <TextField
                label="Time"
                value={currentEdit.time}
                onChange={(e) => setCurrentEdit({ ...currentEdit, time: e.target.value })}
              />
              <TextField
                label="Treatment"
                value={currentEdit.treatment}
                onChange={(e) => setCurrentEdit({ ...currentEdit, treatment: e.target.value })}
              />
              <TextField
                select
                label="Payment"
                value={currentEdit.payment}
                onChange={(e) => setCurrentEdit({ ...currentEdit, payment: e.target.value })}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </TextField>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

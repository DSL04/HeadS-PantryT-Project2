'use client'
import { useState, useEffect } from 'react';
import { fetchInventory, addOrUpdateItem, deleteItem } from './inventory-services/inventory-services.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/system';

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#98FB98', // Pale green
  color: '#fff',
  '&:hover': {
    backgroundColor: '#90EE90',
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E34234', // Vermilion red
  color: '#fff',
  '&:hover': {
    backgroundColor: '#CD5C5C',
  },
}));

const BlurBackground = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  maxWidth: '800px',
  margin: 'auto',
  marginTop: theme.spacing(5),
}));

export default function Home() {
  // State variables
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch inventory items on component mount
  useEffect(() => {
    const getInventory = async () => {
      const items = await fetchInventory();
      setInventory(items);
    };
    getInventory();
  }, []);

  const handleAddOrUpdate = async () => {
    const itemNameLower = itemName.trim().toLowerCase(); // Convert item name to lowercase
    await addOrUpdateItem(itemNameLower, itemQuantity);
    const items = await fetchInventory();
    setInventory(items);
    setOpen(false);
  };

  const handleDelete = async (itemName) => {
    await deleteItem(itemName);
    const items = await fetchInventory();
    setInventory(items);
  };

  // Filtered inventory based on search query
  const filteredInventory = inventory.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <BlurBackground>
        <TextField
          label="Search Items"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AddButton variant="outlined" onClick={() => setOpen(true)}>Add Item</AddButton>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add or Update Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new item or update an existing item's quantity, please enter the item name and quantity here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Item Name"
              type="text"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Quantity"
              type="number"
              fullWidth
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
            <Button onClick={handleAddOrUpdate} color="primary">Add/Update</Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <DeleteButton variant="contained" onClick={() => handleDelete(item.id)}>Delete</DeleteButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BlurBackground>
    </Container>
  );
}
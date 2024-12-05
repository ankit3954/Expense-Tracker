import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useTokenContext } from '../../contexts/AccessTokenContext';
import axios from 'axios';
import { ExpenseInterface, useExpenseContext } from '../../contexts/ExpenseContext';
import AddExpense from '../../components/Expense/AddExpense';
import UpdateExpense from '../../components/Expense/UpdateExpense';


const Home = () => {
  // Mock data for expenses
  // const [expenses, setExpenses] = useState([
  //   { id: 1, name: 'Grocery', amount: 50, date: '2024-12-01' },
  //   { id: 2, name: 'Rent', amount: 500, date: '2024-12-01' },
  //   { id: 3, name: 'Electricity Bill', amount: 70, date: '2024-12-01' },
  // ]);

  const {expenses, updateExpenses} = useExpenseContext()

  const {getToken, updateToken} = useTokenContext()

  const [openAddModal, setOpenAddModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<any>({
    name: '',
    amount: 0,
    category: '',
    description: '',
    date: ''

  })

  const fetchAllExpense = async() => {
    try {
        const accessToken = getToken();
        const response:any = await axios.get("http://localhost:3001/transaction/getFor", {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the token here
            },
          });
    
        updateExpenses(response.data.data.data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }

  }

  useEffect(() => {
    fetchAllExpense()
  }, [])


  const handleOpenAddModal = async() => {
    setOpenAddModal(true)
  }

  const handleCloseAddModal = () => {
    setOpenAddModal(false)
  }

  const handleOpenUpdateModal = async() => {
    setOpenUpdateModal(true)
  }

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false)
  }


  const handleAddExpense = () => {
    alert('Add expense functionality not implemented yet!');
  };

  const handleEditExpense = (id: string) => {
    // alert(`Edit expense with ID: ${id}`);

    const currentExpense = expenses.find((expense) => expense.id === id)
    setSelectedExpense(currentExpense)
    handleOpenUpdateModal()

    // console.log(selectedExpense)
  };

  const deleteExpense = async(id: string) => {
    try {
      const accessToken = getToken()
      const response = await axios.delete(`http://localhost:3001/transaction/delete/${id}`, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })

    } catch (error) {
      console.log(error)
    }
  }


  const handleDeleteExpense = (id: string) => {
    deleteExpense(id)
    fetchAllExpense()
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* First Part: Graph Placeholder */}
      <Box
        sx={{
          height: 300,
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Graph Placeholder: Expenses by Month
        </Typography>
      </Box>

      {/* Second Part: Expense List */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="h5">Expenses</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenAddModal}
          >
            Add Expense
          </Button>
        </Box>

        <List>
          {expenses && expenses.map((expense) => (
            <React.Fragment key={expense.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => handleEditExpense(expense.id)}
                      sx={{ marginRight: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      color="secondary"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={`${expense.name} - $${expense.amount}`}
                  secondary={`Date: ${expense.date}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <AddExpense 
        openModal={openAddModal} 
        handleOpenModal = {handleOpenAddModal} 
        handleCloseModal = {handleCloseAddModal}
        fetchAllExpense = {fetchAllExpense}
      />
      <UpdateExpense 
        openModal={openUpdateModal}
        handleCloseModal={handleCloseUpdateModal}
        handleOpenModal={handleOpenUpdateModal}
        fetchAllExpense={fetchAllExpense}
        selectedExpense={selectedExpense}
      />
    </Box>
  );
};

export default Home;

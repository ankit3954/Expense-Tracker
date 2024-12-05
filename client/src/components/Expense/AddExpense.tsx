import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    MenuItem,
} from '@mui/material';
import { useTokenContext } from '../../contexts/AccessTokenContext';
import axios from 'axios';


interface AddExpenseProps {
    openModal: boolean,
    handleOpenModal: () => void,
    handleCloseModal: () => void,
    fetchAllExpense: () => void
}

const AddExpense: React.FC<AddExpenseProps> = ({ openModal, handleCloseModal, handleOpenModal, fetchAllExpense }) => {

    const [newExpense, setNewExpense] = useState({
        name: '',
        amount: '',
        category: '',
        description: '',
        date: '',
    });

    const {getToken} = useTokenContext()
    const categories = ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Other'];

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(event.target)
        setNewExpense((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleAddExpense = async () => {
        try {
            const accessToken = getToken()
            const response = await axios.post("http://localhost:3001/transaction/add", newExpense,
                {
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            fetchAllExpense()
            handleCloseModal()
            setNewExpense({
                name: '',
                amount: '',
                category: '',
                description: '',
                date: '',
            })
            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Name"
                    name='name'
                    value={newExpense.name}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Amount"
                    name='amount'
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Category"
                    name='category'
                    select
                    value={newExpense.category}
                    onChange={(e) => handleInputChange(e)}
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    margin="dense"
                    label="Description"
                    name='description'
                    multiline
                    rows={3}
                    value={newExpense.description}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    name='date'
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={newExpense.date}
                    onChange={(e) => handleInputChange(e)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleAddExpense}>
                    Add Expense
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddExpense
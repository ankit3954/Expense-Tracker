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
import { ExpenseInterface } from '../../contexts/ExpenseContext';


interface UpdateExpenseProps {
    openModal: boolean,
    handleOpenModal: () => void,
    handleCloseModal: () => void,
    fetchAllExpense: () => void,
    selectedExpense: any
}

 const UpdateExpense: React.FC<UpdateExpenseProps> = ({ openModal, handleCloseModal, handleOpenModal, fetchAllExpense, selectedExpense }) => {

    console.log(selectedExpense)
    const [updatedExpense, setUpdatedExpense] = useState({
        name: selectedExpense.name,
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        description: selectedExpense.description,
        date: selectedExpense.date,
    });

    const {getToken} = useTokenContext()
    const categories = ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Other'];

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(event.target)
        setUpdatedExpense((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleUpdateExpense = async (id: string) => {
        try {
            const accessToken = getToken()
            const response = await axios.post(`http://localhost:3001/transaction/update/${id}`, updatedExpense,
                {
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            console.log(response)
            fetchAllExpense()
            handleCloseModal()
            setUpdatedExpense({
                name: '',
                amount: 0,
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
                    value={updatedExpense.name}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Amount"
                    name='amount'
                    type="number"
                    value={updatedExpense.amount}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Category"
                    name='category'
                    select
                    value={updatedExpense.category}
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
                    value={updatedExpense.description}
                    onChange={(e) => handleInputChange(e)}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    label="Date"
                    name='date'
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={updatedExpense.date}
                    onChange={(e) => handleInputChange(e)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => handleUpdateExpense(selectedExpense.id)}>
                    Update Expense
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateExpense

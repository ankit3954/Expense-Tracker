import { createContext, useContext, useState } from "react";

interface ExpenseContextType {
    updateExpenses: (expenses: []) => void;
    expenses: any[]
}


interface ExpenseProviderProps {
    children: React.ReactNode;
}

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

    const updateExpenses = (expenses: []) => setExpenses(expenses)

    return (
        <ExpenseContext.Provider value={{ updateExpenses, expenses }}>
            {children}
        </ExpenseContext.Provider>
    )
}


export const useExpenseContext = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error("useExpenseContext must be used within an ExpenseProvider");
    }
    return context;
};

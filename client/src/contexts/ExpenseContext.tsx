import { createContext, useContext, useState } from "react";

export interface ExpenseInterface {
    id: string,
    name: string,
    amount: number,
    description: string,
    category: string,
    date: string,
    userId: string,
    createdAt: string,
    updatedAt: string
}

interface ExpenseContextType {
    updateExpenses: (expenses: ExpenseInterface[]) => void;
    expenses: ExpenseInterface[]
}


interface ExpenseProviderProps {
    children: React.ReactNode;
}

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);

    const updateExpenses = (expenses: ExpenseInterface[]) => setExpenses(expenses)

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

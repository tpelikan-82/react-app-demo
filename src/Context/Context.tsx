import { useState, useEffect, createContext } from "react";
import { Employee } from '../types/Employee'; 

interface AppContextType {
  data: Employee[]; 
  isError: string|null;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType> ({
    data: [],
    isError: "",
    refreshData: async () => {}
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps ) => {
    const [data, setData] = useState<Employee[]>([]);
    const [isError, setIsError] = useState<string | null>("");


    const refreshData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/employees');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data: Employee[] = await response.json();
            if (data !== null && data.length > 0) {
                console.log("data: " + data[0].firstName + " " + data[0].lastName);        
            }       
            console.log("context init data:" + data)
            setData(data);
        } catch (error) {

            if (error instanceof Error) {
                setIsError(error.message);
            } else {
                setIsError('An unknown error occurred');
            }
        }
    };

    // initial load
    useEffect(() => {
        refreshData();
    }, []);

    const value = { data, isError, refreshData };

    return (
        <AppContext.Provider value={ value } >
            {children}
        </AppContext.Provider>

    );

};

export default AppContext;


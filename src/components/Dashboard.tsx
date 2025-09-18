import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button";


interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
}

function Dashboard() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { 
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/employees');

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data: Employee[] = await response.json();
                console.log("data: " + data[0].firstName + " " + data[0].lastName);               
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees data", error);
                 if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchEmployees();

    }, []);

    // Conditional rendering based on the component's state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (                                           
                                        <tr key={employee.employeeId}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td> 
                                            <td>
                                                <Button variant="outline-secondary">Update</Button>
                                                <Button variant="outline-danger">Delete</Button>
                                            </td>
                                        </tr>                                     
                            ))}
                        </tbody>
                    </Table>
                </Col>                
            </Row>            
        </Container>
        </>
    );
    
}

export default Dashboard;
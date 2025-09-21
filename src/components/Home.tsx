import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Context/Context";
import { Employee } from '../types/Employee'; 

function Home() {
      const { data, isError, refreshData } = useContext(AppContext)
      const [employees, setEmployees] = useState<Employee[]>([]);
      const [isDataFetched, setIsDataFetched] = useState<Boolean>(false);

      useEffect(() => {

            if (!isDataFetched) {
                  refreshData();
                  setIsDataFetched(true);
            }
      }, [refreshData, isDataFetched]); 

      useEffect(() => {
             console.log(data);
             if (data && data.length > 0) {

                  const fetchImageAndUpdateEmployees = async () => {
                        const updateEmployees = await Promise.all(
                              data.map(async (employee) => {
                                    try {
                                          const response = await fetch(`http://localhost:8080/api/employee/${employee.employeeId}/image`);
                                          console.log(response);
                                          const blobData = await response.blob();
                                          const imageUrl = URL.createObjectURL(blobData);
                                           return { ...employee, imageUrl };      
                                    } catch (error) {
                                          console.error(
                                                "Error fetching image for product ID:",
                                                employee.employeeId,
                                                error
                                          );
                                          return { ...employee, imageUrl: "placeholder-image-url" };
                                    }

                              })            
                        );
                        setEmployees(updateEmployees);      
                  };
                  fetchImageAndUpdateEmployees();
            }
      }, [data]);      

      if (isError) {
      return (
                  <h2 className="text-center" style={{ padding: "10rem" }}>
                  Something went wrong...
                  </h2>
            );
      }

      return (
            <>
            <div  className="grid">
                  { employees.length === 0 ? (
                        <h2
                              className="text-center"
                              style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              }}
                        >
                        No Employee exists
                        </h2>      
                  ) : (
                        employees.map((employee) => {
                              const { employeeId, firstName, lastName, imageUrl } = employee;

                              return (
                                    <div
                                    className="card mb-3"
                                    style={{
                                          width: "18rem",
                                          height: "24rem",
                                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                                          backgroundColor: "#fff",
                                          margin: "10px",
                                          display: "flex",
                                          flexDirection: "column",
                                    }}
                                    key={employeeId}
                                    >

                                          <Link
                                                to={`/employees/${employeeId}`}
                                                style={{ textDecoration: "none", color: "inherit" }}
                                          >
                                                <img
                                                src={imageUrl}
                                                alt={lastName}
                                                style={{
                                                width: "100%",
                                                height: "180px",
                                                objectFit: "cover",
                                                padding: "5px",
                                                margin: "0",
                                                }}
                                                />
                                                <div
                                                className="buttons"
                                                style={{
                                                position: "absolute",
                                                top: "25px",
                                                left: "220px",
                                                zIndex: "1",
                                                
                                                }}
                                                >
                                                <div className="buttons-liked">
                                                <i className="bi bi-heart"></i>
                                                </div>
                                                </div>

                                                 <div
                                                      className="card-body"
                                                      style={{
                                                      flexGrow: 1,
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      justifyContent: "space-between",
                                                      padding: "10px",
                                                      }}
                                                      >
                                                      <div>
                                                      <h5
                                                            className="card-title"
                                                            style={{ margin: "0 0 10px 0" }}
                                                      >
                                                            {firstName.toUpperCase()}
                                                      </h5>
                                                       <h5
                                                            className="card-title"
                                                            style={{ margin: "0 0 10px 0" }}
                                                      >
                                                            {lastName.toUpperCase()}
                                                      </h5>
                                                      </div>
                                                </div>
                                          </Link>                  

                                    </div>      
                                    )


                        })
                  )}
            </div>
            </>
      );

    
}

export default Home;
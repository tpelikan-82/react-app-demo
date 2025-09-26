import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import { Employee } from "../types/Employee"
import { useEmployee } from "./hooks/useEmployee";

function EmployeeDetail() {

    console.log('Employee');

    const { id } = useParams();
    const { data, isError, refreshData } = useContext(AppContext)
    // const [employeeData, setEmployeeData] = useState<Employee>();
    // const [imageUrl, setImageUrl] = useState<string>();
    const navigate = useNavigate();


    const result = useEmployee(id);

    if (!result) {
        return;
    }

    result.employeeData

    console.log('Employee id' + id);

    // useEffect(() => {
    //     const fetchEmployee = async () => {
    //         try {    
    //             const response = await fetch(`http://localhost:8080/api/employee/${id}`);    
    //             const data: Employee = await response.json();
    //             setEmployeeData(data);
           
    //             if (data.imageName) {
    //                 fetchImage();
    //             }
    //         } catch (error) {
    //              console.error("Error fetching emoloyee:", error);    
    //         }

    //     };

    //     const fetchImage = async () => {
    //         const response = await fetch(`http://localhost:8080/api/employee/${id}/image`);
    //         console.log(response);
    //         const blobData = await response.blob();
    //         const imageUrl = URL.createObjectURL(blobData);                
    //         setImageUrl(imageUrl);
    //     };


    //     fetchEmployee();

    // }, [id]);


    const deleteProduct = async () => {
    try {
       await fetch(`http://localhost:8080/api/employee/${id}`,  {
            method: 'DELETE' 
        });
      console.log("Product deleted successfully");
      alert("Product deleted successfully");
      await refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/employee/update/${id}`);
  };


    if (!result.employeeData) {
        return (
            <h2 className="text-center" style={{ padding: "10rem" }} >
                Loading ...
            </h2>
        );
    }

    return (
        <>

            <div className="containers" style={{ display: "flex" }}>
                <img
                className="left-column-img"
                src={result.imageUrl}
                alt={result.employeeData?.imageName}
                style={{ width: "50%", height: "auto" }}
                />

                <div className="right-column" style={{ width: "50%" }}>
                    <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
                        {result.employeeData?.firstName}
                    </h1>   
                    <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
                        {result.employeeData?.lastName}
                    </h1>   
                
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleEditClick}
                        style={{
                            padding: "1rem 2rem",
                            fontSize: "1rem",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        >
                        Update
                    </button>
                        {/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={deleteProduct}
                        style={{
                            padding: "1rem 2rem",
                            fontSize: "1rem",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        >
                        Delete
                    </button>
                </div>


            </div>

        </>
    );

}

export default EmployeeDetail;
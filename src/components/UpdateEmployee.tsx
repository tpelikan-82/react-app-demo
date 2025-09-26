import { useState } from "react";
import { useParams } from "react-router-dom";
import { Employee } from "../types/Employee";
import { useEmployee } from "./hooks/useEmployee";


const UpdateEmployee = () => {

    const { id } = useParams();
    // const [ employee, setEmployee ] = useState<Employee>();
    // const [ image, setImage ] = useState();
    const [ updateEmployee, setUpdateEmployee] = useState({
        id: null,
        firstName: "",
        lastName: "",

    });

    const result = useEmployee(id);
    const employeeData = result?.employeeData;
    const imageUrl =  result?.imageUrl;
    const imageFile = result?.imageFile;


    //  const converUrlToFile = async(blobData: Blob | undefined, fileName: string | undefined) => {

    //     if (!blobData || !fileName) {
    //         return;
    //     }

    //     const file = new File([blobData], fileName, { type: blobData.type });
    //     return file;
    // }

    // setImage(await converUrlToFile(employeeData?.imageData, employeeData?.imageName));


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateEmployee({
        ...updateEmployee,
        [name]: value,
        });
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("images", imageUrl)
        console.log("", updateEmployee)
        const updatedEmployee = new FormData();
        updatedEmployee.append("imageFile", imageFile);
        updatedEmployee.append(
            "employee",
            new Blob([JSON.stringify(updateEmployee)], { type: "application/json" })
        );

         console.log("formData : ", updatedEmployee);


        fetch(`http://localhost:8080/api/employee/${id}`, {
            method: 'PUT',
            body: updatedEmployee,
        }).then(response => {
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            return response.json();     
        }) .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

        alert("Employee was successfully updated");

    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // imageUrl = e.target.files[0];
    };

    return (
        <div className="update-product-container" >
            <div className="center-container"style={{marginTop:"7rem"}}>
                <h1>Update Product</h1>  

                 <form className="row g-3 pt-1" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">
                        <h6>First Name</h6>
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder={employeeData?.firstName}
                        value={updateEmployee.firstName}
                        onChange={handleChange}
                        name="firstName"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">
                        <h6>Last Name</h6>
                        </label>
                        <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder={employeeData?.lastName}
                        value={updateEmployee.lastName}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-8">
                        <label className="form-label">
                        <h6>Image</h6>
                        </label>
                        <img
                        src={imageUrl ? imageUrl : "Image unavailable"}
                        alt={employeeData?.imageName}
                        style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            padding: "5px",
                            margin: "0",
                        }}
                        />
                        <input
                        className="form-control"
                        type="file"
                        onChange={handleImageChange}
                        placeholder="Upload image"
                        name="imageUrl"
                        id="imageUrl"
                        />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );

};

export default UpdateEmployee;
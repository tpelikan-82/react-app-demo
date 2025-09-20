import React, { useState } from "react";

function AddEmployee() {

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: ''
        
    });

    const [image, setImage] = useState<File | null>(null); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setEmployee({ ...employee, [name]: value});
    };

    const handleImageChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
         if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
         }
    }

    const submitHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imageFile", image);
        formData.append(
            "employee",
            new Blob([JSON.stringify(employee)], { type: "application/json"}) 
        );

        console.log(formData);

        fetch('http://localhost:8080/api/employee', {
            method: 'POST',
            body: formData,
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
    }

    return (
        <div className="container">
            <div className="center-container">
                <form className="row g-3 pt-5" onSubmit={submitHandler}>
                    <div className="col-md-6">
                        <label className="form-label">
                            <h6>First Name</h6>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            onChange={handleInputChange}
                            value={employee.firstName}
                            name="firstName"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">
                            <h6>Last Name</h6>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={handleInputChange}
                            value={employee.lastName}
                            name="lastName"
                        />
                    </div>
                     <div className="col-md-4">
                        <label className="form-label">
                            <h6>Image</h6>
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            // onClick={submitHandler}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddEmployee;
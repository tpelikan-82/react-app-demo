import { useEffect, useState } from "react";
import { Employee } from "../../types/Employee";

export const useEmployee = (id: string | undefined) => {

    if (!id) {
        return;
    }

    const [employeeData, setEmployeeData] = useState<Employee>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageFile, setImageFile] = useState<File>();

    useEffect(() => {
            const fetchEmployee = async () => {
                try {    
                    const response = await fetch(`http://localhost:8080/api/employee/${id}`);    
                    const data: Employee = await response.json();
                    setEmployeeData(data);
               
                    if (data.imageName) {
                        const blobData = await fetchImage();
                        const imageFile = await converUrlToFile(blobData, data.imageName)
                        setImageFile(imageFile);   
                    }
                } catch (error) {
                     console.error("Error fetching emoloyee:", error);    
                }
    
            };
    
            const fetchImage = async () => {
                const response = await fetch(`http://localhost:8080/api/employee/${id}/image`);
                console.log(response);
                const blobData = await response.blob();
                const imageUrl = URL.createObjectURL(blobData);                 
                setImageUrl(imageUrl);
                return blobData;
            };
    
    
            fetchEmployee();
    
        }, [id]);

        const converUrlToFile = async(blobData: Blob, fileName: string | undefined) => {
            if (!fileName) {
                return;
            }                 
            const file = new File([blobData], fileName, { type: blobData.type });
            return file;
        }

    return { employeeData, imageUrl, imageFile };

};
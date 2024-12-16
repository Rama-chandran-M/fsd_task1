import React, {useState} from"react";
import {useForm} from "react-hook-form";
import axios from "axios";

const EmployeeForm=()=>{
    const{register, handleSubmit, formState:{errors}, reset} = useForm({
        mode:"onBlur"
    });
    const [message,setMessage] = useState("");
    const onSubmit = async(data) => {
        try {
            console.log("Form data submitted:", data);  // Debugging: log the submitted data
            
            const response = await axios.post("http://localhost:5000/api/employees/add", data);
              
            
            console.log("Response received:", response);  // Debugging: log the response received
            
            setMessage(response.data.message);
            reset();
            
        } catch (error) {
            // Debugging: log error if any occurs
            console.error("Error occurred during submission:", error);
            
            setMessage(error.response ? error.response.data.message : "Server Error");
        }
    };
    const renderInputField=(label,type,name,validationRules)=>{
        return(
            <div>
                <label>{label}</label>
                <input type={type} {...register(name,validationRules)}/>
                {errors[name] && <p>{
                errors[name].message}</p>}
            </div>
        )
    };
    return(
        <div>
            <div className="form-container">
                <h1>Employee Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {renderInputField("Name","text","empname",{required:"Name is Required"})}
                    {renderInputField("EmployeeId","text","empid",{required:"Employee Id is Required",maxLength:10})}
                    {renderInputField("Email","text","empmail",{required:"Email is Required"})}
                    {renderInputField("PhoneNumber","text","empphone",{
                        required:"Phone Number is Required",
                        pattern:/^[0-9]{10}$/,
                        message:"Phone number must be in 10 digits"
                    })}
                    <div>
                        <label>Select Department</label>
                        <select {...register("empdept",{required:"Department must be selected"})}>
                            <option value={"HR"}>HR</option>
                            <option value={"Developer"}>Developer</option>
                            <option value={"Tester"}>Tester</option>
                        </select>
                        {errors.empdept && <p>{errors.empdept.message}</p>}
                    </div>
                    <div>
                        <label>Date of Joining</label>
                        <input type="date" 
                            {...register("empjoiningdate",
                                {required:"Joining date is required",
                                validate:value=>new Date(value)<=new Date() || "Date cannot be in the future"
                        })}/>
                        {errors.empjoiningdate && <p>{errors.empjoiningdate.message}</p>}
                    </div>
                    {renderInputField("Role","text","emprole",{required:"Employee Role is Required"})}
                    <button type="submit">Submit</button>
                    <button type="button" onClick={()=>{reset()}}>Reset</button>
                </form>
            </div>

        </div>
    )
}
export default EmployeeForm;
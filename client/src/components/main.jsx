import ".././App.css";
import { useState } from "react";
import Axios from "axios";

import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Main() {


  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);


  const [nameErr, setNameErr] = useState();
  const [positionErr, setPositionErr] = useState(true);
  const [ageErr, setAgeErr] = useState(true);
  const [wageErr, setWageErr] = useState(true);
  const [countryErr, setCountryErr] = useState(true);

 
  //and also try including the a general error like "isValid" so 
  //that the className would acquire it and change the CSS

  const [isValid, setIsValid] = useState(true);

  
  const validateHandleSub = () => { 

     if (name === "") {
        setNameErr("name is required");
        setIsValid(false);
         return false;
     } 
     
     if (age <15 ) {
      setAgeErr("age must be greater than 14");
      setIsValid(false);
       return false;
    }

    if (position === "") {
      setPositionErr("position is required");
      setIsValid(false);
       return false;
    }

    if (country === "") {
      setCountryErr("country is required");
      setIsValid(false);
       return false;
    }

    if (wage <8) {
      setWageErr("minimum wage must be greater than 8");
      setIsValid(false);
       return false;
    }


     


    //toast('SUCCESSFULLY ADDED', {position: toast.POSITION.TOP_LEFT} )
    
      
      setIsValid(true);
      setNameErr("");
      setPositionErr("");
      setAgeErr("");
      setCountryErr("");
      setWageErr("");

      //maybe here?

      
      return true;
     

  }


  const handleSub = () => { 

      //setIsValid(validateHandleSub());

      if (validateHandleSub()){

        console.log("valid submission");
        addEmployee();

        successToast();

      }else{

        console.log("invalid submission");
        errorToast();

      }

 

  }







  const addEmployee = () => {
    Axios.post("http://localhost:5001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {

      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);


    });
  };

  const getEmployees = () => {

    messegeToast();



    Axios.get("http://localhost:5001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    successToast();
    Axios.put("http://localhost:5001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  }; 

  const deleteEmployee = (id) => {
    deleteSuccessToast();
    Axios.delete(`http://localhost:5001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };


  const successToast = () => {
    toast.success("successfully added", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const errorToast = () => {
    toast.error("invalid attempt !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;


  const messegeToast = () => {
    toast.info("scroll down to see the list", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const deleteSuccessToast = () => {
    toast.error("employee deleted", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  //add more toasts here.

  return (

    <div className="App">

    <>
      <ToastContainer/>
    </>


      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />


            
              <div className="errorMessege">
                <p> {nameErr}</p>
              </div>
            

        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {ageErr}</p>
              </div>

        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />


              <div className="errorMessege">
                <p> {countryErr}</p>
              </div>

        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {positionErr}</p>
              </div>


        <label>Wage :</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {wageErr}</p>
              </div>


         

        <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ handleSub  }>Add Employee</button>
        <button onClick={getEmployees}>Show Employees</button>
      </div>


      <div className="employees">

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3> Name: {val.name} </h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>


                <input
                  type="number"
                  placeholder="new wage"
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />


                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button className="deleteButton"
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div> 
  );
}

export default Main;

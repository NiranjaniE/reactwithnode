import React from 'react'  
import { Button, Card, CardBody,CardFooter, CardHeader, Col, Form, Input, InputGroup, Row, Table } from 'reactstrap';  
import axios from 'axios';  
import { useState, useEffect } from 'react'  
import { Link } from 'react-router-dom';  

import 'bootstrap/dist/css/bootstrap.min.css'; 

function Employee(props) {  
  const [data, setData] = useState([]);  
  useEffect(() => {  
    const GetData = async () => {  
      const result = await axios('http://localhost:8000/api/Employee');  
      setData(result.data);
      console.log(result.data);  
    };  
    GetData();  
  }, []);  
  const deleteEmployee = (Id) => {  
    //debugger;  
    axios.delete('http://localhost:8000/api/Employee/' +Id)  
      .then((result) => {  
        window.location.reload('/Employee');
      });  
  }; 
  const EditEmployee = (Id) => {
    //const [employee, setEmployee] = useState({ Id:'',Name: '', designation: '', age: '', place: '' }); 
    //debugger;
    axios.get('http://localhost:8000/api/Employee/' +Id)
        .then(res => {
            console.log(res.data);
            setEmployee({
                 Id:res.data[0].Id,
                 Name:res.data[0].Name,
                 designation:res.data[0].Designation,
                 age:res.data[0].Age,
                 place:res.data[0].Place
        });
        }, error => {
            console.log(error);
            
        });
}

// useEffect(() => {
//     EditEmployee();
// }, []);
//const [employee, setEmployee] = useState({ Id:0,Name: '', designation: '', age: '', place: '' }); 
  const InsertDoctor = (e) => { 
      //debugger;
     
  if(employee.Id == 0)
  {
    const apiUrl = "http://localhost:8000/api/Employee";  
     
      e.preventDefault();  
      //debugger;  
      const data = { Name : employee.Name, designation : employee.designation, age : employee.age, place : employee.place };  
      axios.post(apiUrl, data)  
        .then((result) => {  
          window.location.reload('/Employee');  
        });  
  }
  
  else{
      
        //debugger;
        e.preventDefault();  
        const data = {Id:employee.Id,Name : employee.Name, designation : employee.designation, age : employee.age, place : employee.place};  

        axios.put('http://localhost:8000/api/Employee/'+data.Id, data)  
          .then((result) => {  
            console.log(result)
            window.location.reload('/Employee');
          });  
       
  }
} 
         
const [employee, setEmployee] = useState({ Id:'',Name: '', designation: '', age: '', place: '' });  
  const onChange = (e) => {  
    e.persist();  
    //debugger;  
    setEmployee({...employee, [e.target.name]: e.target.value});  
  }  
    
  return (  
    <div className="animated fadeIn">  
      <Row>  
        <Col>  
          <Card> 
          <Form onSubmit={InsertDoctor}>  
                  <h1>Register</h1>  
                  <InputGroup className="mb-3">  
                  <Input type="text" readOnly="true" name="Id" id="Id" placeholder="Id" value={employee.Id} onChange={ onChange }  />  
                  </InputGroup>  
                   <InputGroup className="mb-3">  
  
                    <Input type="text" name="Name" id="Name" placeholder="Name" value={employee.Name} onChange={ onChange }  />  
                  </InputGroup>  
                   <InputGroup className="mb-3">  
  
                    <Input type="text" placeholder="designation" name="designation" id="designation" value={employee.designation} onChange={ onChange }/>  

                  </InputGroup>  
                  <InputGroup className="mb-3">  
                    <Input type="number" placeholder="age" name="age" id="age"  value={employee.age} onChange={ onChange }  />  

                  </InputGroup>  
                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="place" name="place" id="place" value={employee.place} onChange={ onChange }  />  
                  </InputGroup>  
                   
             <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>  
                  </Col>  
                  <Col xs="12" sm="6">  
                    <Button className="btn btn-info mb-1" block><span>Cancel</span></Button>  
                  </Col>  
                </Row>  
              </CardFooter>  
                </Form>   
            <CardHeader>  
              <i className="fa fa-align-justify"></i> Employee List  
              </CardHeader>  
            <CardBody>  
              <Table hover bordered striped responsive size="sm">  
                <thead>  
                  <tr>  
                    <th>Id</th>
                    <th>Name</th>  
                    <th>Designation</th>  
                    <th>Age</th>  
                    <th>Place</th>  
                    <th>Action</th>  
                  </tr>  
                </thead>  
                <tbody>  
                  {  
                    data.map((item, idx) => {  
                      return <tr>  
                          <td>{item.Id}</td>
                        <td>{item.Name}</td>  
                        <td>{item.Designation}</td>  
                        <td>{item.Age}</td>  
                        <td>{item.Place}</td>
                        <td>  
                          <div class="btn-group">  
                          <button className="btn btn-warning" onClick={() => { EditEmployee(item.Id) }}>Edit</button>    
 
                            <button className="btn btn-warning" onClick={() =>{ if (window.confirm('Are you sure you wish to delete this item?')) deleteEmployee(item.Id) }}>Delete</button>  

                          </div>  
                        </td>  
                      </tr>  
                    })}  
                </tbody>  
              </Table>  
            </CardBody>  
          </Card>  
        </Col>  
      </Row>  
    </div>  
  )  
}  
  
export default Employee  
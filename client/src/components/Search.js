import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Row, Col, Grid } from 'react-bootstrap';
import './one.css'

const Search = () => {

  const [usernameReg, setUsernameReg] = useState("");
  const [name, setName] = useState([]);
  useEffect(() =>{
    GetloginDetails();
  },[]);
  const history = useHistory();

  const changePage = async () =>{ 
    await fetch("/save", {
      method: "POST",
      body: JSON.stringify({serachTerm: usernameReg }),
      headers: {
      "Content-Type": "application/json"
    }
   });

    let path = `/results/`+ usernameReg ; 
    history.push(path);
  }


  const GetloginDetails = async () => {
    const res = await fetch("/loginStatus", {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
      }
    })
    setName(await res.json());

    // store returned user somehow
  }


  return (
    <div>
      <Card className="card-bks">
        <Card.Body>
         <Card.Title>Welcome to Book Search Application</Card.Title>
         <Card.Text>{name.email}</Card.Text>
         <Card.Text className="par-bks">
           Instructions: "/search" is where you search for books, "/" is where you Login/logout of your account
           and "/history" is where you find Search History of all users
         </Card.Text>
         <Row>
         <Col xs={8}>
        <input className='SearchInput' type='text' name='username'
        placeholder='Enter your username' value={usernameReg}
        onChange={e => setUsernameReg(e.target.value)} />
        </Col>
         <Col>
         <Button color="primary" className="px-4 goto" onClick={changePage}> Search</Button>
         </Col>
        </Row>
       </Card.Body>
      </Card>

    </div>
  );
};
  
export default Search;
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col, Grid } from 'react-bootstrap';
import './one.css'
import Image from 'react-bootstrap/Image'
import { useHistory } from "react-router-dom";

const Details = () => {

    const [detail, setDetail] = useState([]);

    let Params = useParams();
    let toFind = Params.bookid;
    console.log(toFind);
    
    useEffect(() =>{
        GetDetails();
    },[]);
    const history = useHistory();

  const changePage = () =>{ 
    let path = `/search`;
    history.push(path);
  }
    const GetDetails = async () => {
      const res = await fetch("/book/"+ toFind, {
          method: "GET",
          headers: {
          "Content-Type": "application/json"
        }
      })

      setDetail(await res.json());
      // store returned user somehow
    }
  return (
    <div>
       {
       /* <p>{detail.title}</p>
       <p>{detail.authors}</p>
       <p>{detail.publisher}</p>
       <p>{detail.publishedDate}</p>
       <p>{detail.averageRating}</p>
       <p>{detail.description}</p>
       <p>{detail.thumbnail}</p> */

       <Card className="card-bks-1">
       <Card.Body>

        <Row>
        <Col>
        <Image className="img-here" src={detail.thumbnail} rounded/>
        </Col>
        <Col xs={8}>
         <Card.Title>{detail.title}</Card.Title>
         <p className="pok"> published by: {detail.publisher}</p>
        <p className="pok">published on: {detail.publishedDate}</p>
        <p className="pok">Average Rating: {detail.averageRating}</p>
        <p className="pok">Written by: {detail.authors}</p>
         <Card.Text className="par-bks">{detail.description}</Card.Text>
        </Col>
       </Row>
       <Card.Title className="marg">Welcome to Book Search Application</Card.Title>
        <Card.Text className="par-bks-3">
          Instructions: "/search" is where you search for books, "/" is where you Login/logout of your account
          and "/history" is where you find Search History of all users
        </Card.Text>
        <Button color="primary" className="px-4 goto2" onClick={changePage}>Go Back Search</Button>
        <Card.Title></Card.Title>
      </Card.Body>
     </Card>
       }

    </div>
  );
};
  
export default Details;
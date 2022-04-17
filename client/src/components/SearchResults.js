import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { Row, Col, Grid } from 'react-bootstrap';
import './one.css'

const SearchResult = () => {

  const [name, setName] = useState([]);

  let Params = useParams();
  let toFind = Params.serachTerm;
  console.log(toFind);
  
  const GetSearchResult = async () => {
    const res = await fetch("/searchresult/"+ toFind, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
      }
    })
    setName(await res.json());
    // store returned user somehow
  }

  useEffect(() =>{
    GetSearchResult();
  },[]);

  return (
    <div>
      {name.map((data)=>{
        return (
          // <div key={data.id}>
          //  <a href={"/book/"+ data.id} >{data.title}</a>
          //  <p>{data.id}</p>
          // </div>
        <Card className="card-bks-1">
         <Row>
          <Col >
          <Image src={data.thumbnail} rounded/>
          </Col>
          <Col xs={8}>
          <ListGroup variant="flush">
          <ListGroup.Item ><a href={"/book/"+ data.id} className="li1" >{data.title}</a></ListGroup.Item>
          <ListGroup.Item>Author: {data.authors}</ListGroup.Item>
          <ListGroup.Item>Publisher: {data.publisher}</ListGroup.Item>
          <ListGroup.Item>Ratings: {data.averageRating}</ListGroup.Item>
          </ListGroup>
          </Col>
         </Row>
        </Card>
        )
      })}   
    </div>
  );
};
  
export default SearchResult;
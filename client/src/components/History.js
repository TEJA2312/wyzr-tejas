import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button";
import { Row, Col, Grid } from 'react-bootstrap';
import './one.css'

const History = () => {

  const [name, setName] = useState([]);
  let Params = useParams();
  let toFind = Params.useremail;
  console.log(toFind);

  const GetSearchResult = async () => {
    const res = await fetch("/history-list/" + toFind, {
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
        <Card className="card-bks-0">
        <p className="pok2" >{toFind}</p>  
        <p className="pok1" >{data.serach}</p>  
        <p className="pok2" >{data.timestamp}</p>  
        </Card>
        )
      })}   
    </div>
  );
};
  
export default History;
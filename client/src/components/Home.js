import { useState, useEffect } from 'react';
import {GoogleLogin} from 'react-google-login' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './one.css'
import { useHistory } from "react-router-dom";


const Home = () => {

  const [name, setName] = useState([]);
  useEffect(() =>{
    GetloginDetails();
  },[]);

  const history = useHistory();
  const changePage = () =>{ 
    let path = `/search` ; 
    history.push(path);
  }
  const changePage1 = () =>{ 
    let path = `/user-list` ; 
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


    const handleLogin = async googleData => {
        const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
            token: googleData.tokenId
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json();
        console.log(data);
        window.location.reload(true);
        // store returned user somehow
      }

  return (
    <div>
      <Card className="card-bks">
        <Card.Body>
         <Card.Title>Welcome to Book Search Application</Card.Title>
         <Card.Text>{name.email}</Card.Text>
         <GoogleLogin
        clientId="381765998868-rqtvihg3qi6hg2td6kq36uavqcamte92.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
        />
         <Card.Text className="par-bks">
           Instructions: "/search" is where you search for books, "/" is where you Login/logout of your account
           and "/history" is where you find Search History of all users
         </Card.Text>

        <Button color="primary" className="px-4 goto" onClick={changePage}>Go to Search</Button>
        <br></br>
        <Button color="primary" className="px-4 goto3" onClick={changePage1}>View User Data</Button>

       </Card.Body>
      </Card>
      
    </div>
  );
};
  
export default Home;
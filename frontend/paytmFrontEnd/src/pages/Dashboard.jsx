import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Heading } from "../components/Heading";
import { Users } from "../components/Users";
import { SubHeading } from "../components/SubHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Dashboard() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [balance, setBalance] = useState();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");


    useEffect(function() {
        try{
            axios.get('http://localhost:3000/api/v1/user/', {
                headers: {
                    Authorization: localStorage.getItem('token')
                } 
                }).then(response=> {
                    console.log(response.data);
                    setFirstName(response.data.firstName);

                })

            axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: localStorage.getItem('token')
                } 
                }).then(response=> {
                    console.log(response.data);
                    setBalance(response.data.balance.toFixed(2));

                })

        }

        catch(e) {
            console.log(e.response.data);
            navigate('/signup');
            
        }
            


    },[])

    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
            headers: {
                Authorization: localStorage.getItem('token')
            } 
            }).then(response=> {
                console.log(response.data);
                setUsers(response.data.users);

            })
    },[filter])
    return <div> 
        <Appbar name={firstName}></Appbar>
        
            <div className="pr-5 ml-10 mr-10 mt-5">
            <Balance amount={balance}></Balance>
                <Users users={users} setFilter={setFilter}></Users>

            </div>
       
       
        
        </div>
    
}
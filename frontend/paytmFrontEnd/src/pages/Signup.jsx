import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
const warningString = `Already have an account?`;
import axios from "axios";
import { useNavigate } from "react-router-dom";




export function Signup() {
    const navigate = useNavigate();


    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError]= useState("")



    return <div className="flex justify-center min-h-screen bg-cover items-center bg-neutral-500		">
    <div className="bg-white rounded-lg w-80 px-5	">
        <img className="" src="./cashChumslogo.png"></img>
        <div className="flex justify-center items-center">
            <Heading label='Create CashChums Account'></Heading>


        </div>
    <SubHeading label='Enter your information to create an account'></SubHeading>
    <br></br>
    <InputBox onChange={(e)=>{
        setFirstName(e.target.value);

    }} label='First Name' type='text' placeholder='John'></InputBox>
    <br></br>
    <InputBox onChange={(e)=>{
        setLastName(e.target.value);

    }} label='Last Name' type='text' placeholder='Doe'></InputBox>
    <br></br>
    <InputBox onChange={(e)=>{
        setError("")
        setEmail(e.target.value);

    }} label='Email' type='text' placeholder='johndoe@example.com'></InputBox>
    <br></br>
    <InputBox onChange={(e)=>{
        setPassword(e.target.value);

    }} label = 'Password' type='password' placeholder='Password'></InputBox>
    <br></br>

    
    <Button onPress={async function(){
        console.log({
            username: email,
            firstName,
            lastName,
            password,

        });
        console.log('hi');

        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username: email,
                firstName,
                lastName,
                password,
    
            })
           console.log(response.data);
            localStorage.setItem("token","Bearer " + response.data.token)
            navigate('/dashboard');



        }
        catch(e) {
            console.log(e.response.data);
            setError(e.response.data.message);

        }

       



    }} label='Sign up'></Button>
    <br></br>
    <div className="flex justify-center text-red-600">
        {error? error : ""}
    </div>
    <br></br>
    <div className="flex justify-center">

    <BottomWarning label={warningString} linkLabel='Login' to={'/signin'}></BottomWarning>


    </div>

    
    
    </div>
    
    
</div>
}
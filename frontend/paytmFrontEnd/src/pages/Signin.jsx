import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useState } from "react";
const warningString = `Don't have an account?`;

export function Signin() {
    const navigate = useNavigate();
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return <div className="flex justify-center min-h-screen bg-cover items-center bg-neutral-500		">
        <div className="bg-white rounded-lg w-80 px-5	">
        <img className="" src="./cashChumslogo.png"></img>
            <div className="flex justify-center items-center">
                <Heading label='Sign In'></Heading>


            </div>
        <SubHeading label='Enter your credentials to access your account'></SubHeading>
        <br></br>
        <InputBox onChange={(e)=> {
            setEmail(e.target.value);
        }} label='Email' type='text' placeholder='johndoe@example.com'></InputBox>
        <br></br>
        <InputBox onChange={(e)=> {
            setPassword(e.target.value);
        }} label='Password' type='password' placeholder='Password'></InputBox>
        <br></br>
        
        <Button onPress={async function(){
            try{
                const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                    username: email,
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
    

        }} label='Sign in'></Button>
        <br></br>
        <div className="flex justify-center text-red-600">
        {error? error : ""}
        </div>
        <br></br>
        <div className="flex justify-center">

        <BottomWarning label={warningString} linkLabel='Sign up' to={'/signup'}></BottomWarning>


        </div>

        
        
        </div>
        
        
    </div>
}
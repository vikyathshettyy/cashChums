import { useEffect, useState } from "react";
import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";





export function SendMoney({id}) {
    const navigate = useNavigate();
    const {toast} = useToast();


    const [user,setUser] = useState({firstName:''});
    const [amount,setAmount] = useState('');
    const [password,setPassword] = useState('');
    const [message, setMessage]  = useState('');
    const[error ,setError] = useState(false);
    
    

    useEffect(()=>{
        try{
            

            axios.get('http://localhost:3000/api/v1/user/id?id='+id, {
                headers: {
                    Authorization: localStorage.getItem('token')
                } 
                }).then(response=> {
                    
                    setUser(response.data);
                    

                }).catch(err => {
                    // Handle error
                    console.log(err);
                    navigate('/signin');
                });

        }
        catch(e) {
            console.log(e.response.data);
            navigate('/signin');
            
        }
        
    },[])
    return <div>
        <div className="flex justify-center min-h-screen bg-cover items-center bg-neutral-500		">
        <div className="bg-white rounded-lg w-80 px-5	">
            <div className="flex justify-center items-center">
            <img className="" src="./cashChumslogo.png"></img>
            


            </div>
            <div className="flex justify-center">
            <Heading label='Send Amount'></Heading>

            </div>

        
        <br></br>
        <div className="flex justify-start">
        <div className="rounded-full  h-6  w-6 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-sm">
                    {user.firstName.charAt(0)}    
                    
                </div>
            </div>
            <div className="pt-1.5 text-sm">
                {user.firstName} {user.lastName}
            </div>
            </div>
            <br></br>
        <InputBox onChange={(e)=> {
            setAmount(e.target.value);
        }} label='Amount (in Rs)' type='number' placeholder='Enter Amount'></InputBox>
        <br></br>
        <InputBox onChange={(e)=> {
            setPassword(e.target.value);
        }} label='Password' type='password' placeholder='Enter your password'></InputBox>
        <br></br>

        <Button onPress={  async function(){

            try{
                const response = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                "to": id,
                "amount": amount,
                "password": password.toString(),
            
                
                
            },{
                headers: {
                    Authorization: localStorage.getItem('token')
                } 
            })
                       
                console.log('tranferred');
                setError(false);
                setMessage(response.data.message);
                

            

            }
            catch(e) {
                console.log('error reaached');
                console.log(e.response.data);
                setMessage(e.response.data.message);
                setError(true);
                toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  })
            }
            
        }} label='Initiate Transfer'></Button>
        <br></br>
        <div className="flex justify-center text-red-600">
        {error? message : ""}
        </div>
        <div className="flex justify-center text-green-600">
        {!error? message : ""}
        </div>
        <br></br>

        



        </div>


</div>

    </div> 
        



}
import axios from "axios";
import { Link } from "react-router-dom"

export function Users({users, setFilter}) {
    return <div className="mt-5">
        <div className="text-bold ">
            Users
        </div>
        <input onChange={(e)=> {
            setFilter(e.target.value);
        }} className="shadow w-full text-sm px-2 mt-2" placeholder='Search users....'></input>

        {users.map(user=> <User id= {user._id} firstName={user.firstName} lastName={user.lastName}></User> )}
    </div>
}

function User({firstName,lastName, id}) {
    return <div className="mt-5 flex justify-between " >
        <div className="flex justify-start">
        <div className="rounded-full ml-5 h-6  w-6 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-sm">
                    {firstName.charAt(0)}    
                    
                </div>
            </div>
            <div className="pt-1.5 text-sm">
                {firstName} {lastName}
            </div>
            </div>
            <div>
            <button className=" bg-blue-950 hover:bg-blue-900 text-white text-sm font-medium py-2 px-4 border rounded mr-5">
                
                <Link to={'/send?id='+id}> Send Money</Link>
                </button>
            </div>

    </div>
}
import { Link } from "react-router-dom";

export function Appbar({appName,to, name}) {
    const initial = name.charAt(0).toUpperCase();
    return <div className="flex shadow pl-5 pr-5 pb-4 justify-between items-center">
        <img className="max-w-xs w-900 h-12 mt-5" src="./cashChumslogo.png"></img>
        <div className="flex justify-end  ">
            <div className="flex items-center">
                Hello, {name}

            </div>
            <div className="rounded-full ml-5 h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    <Link to={to}>{initial}</Link>
                    
                </div>
            </div>

        </div>

    </div>
} 
import { useSearchParams } from "react-router-dom";
import { SendMoney } from "../components/SendMoney";


export function Send() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    
    return <div>

        <SendMoney id={id}></SendMoney>
        
    </div>
}
import { Link } from "react-router-dom";

export function BottomWarning({label,linkLabel,to}) {
    return <div className="pb-5 text-sm">
        {label}
        <Link className='underline' to={to}>{linkLabel}</Link>
    </div>
}
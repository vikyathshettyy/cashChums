export function InputBox({label,placeholder,type, onChange}) {
    return <div>
        <label className="font-semibold	">
            {label}
        </label><br></br>
        <input onChange={onChange} type={type} className="px-3" placeholder={placeholder}></input>
    </div>
}
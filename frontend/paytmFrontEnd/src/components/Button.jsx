export function Button({label,onPress}) {
    return <button onClick={onPress} className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibol py-2 px-4 border rounded">
    {label}
  </button>
}
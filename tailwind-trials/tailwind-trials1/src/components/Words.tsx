
const words = ["Hello", "Hi", "Hey", "Salute"];


export default function Words() {

    return (
        <ul className="mt-10 bg-slate-100 px-5 py-4 rounded-xl shadow-md">
            {
                words.map(word => <li className="text-lg odd:text-green-500 even:text-cyan-500">{word}</li>)
            }
        </ul>
    )
}
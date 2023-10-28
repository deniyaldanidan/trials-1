


export default function MyDetails({ question, answer }: { question: string, answer: string }) {
    return (
        <details open={false} className="group w-80 bg-stone-100 border border-slate-200 px-5 py-3 rounded-lg shadow-sm open:shadow-lg open:border-slate-400">
            <summary className="text-lg text-slate-600 cursor-pointer group-open:border-b group-open:pb-3 group-open:border-slate-300 group-open:font-medium  ">{question}</summary>
            <div className="pt-3 px-2">{answer}</div>
        </details>
    )
}
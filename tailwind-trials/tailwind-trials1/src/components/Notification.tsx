


export default function Notification() {
    return (
        <div className="p-6 max-w-sm mx-auto rounded-xl shadow-lg flex items-center space-x-4 bg-orange-100 cursor-pointer ease-in-out duration-150 hover:bg-green-700 group">
            <div className="shrink-0">
                <img className="h-12 w-12" src="https://api.dicebear.com/7.x/pixel-art/svg" alt="avatar" />
            </div>
            <div>
                <div className="text-xl font-medium text-black duration-150 group-hover:text-white">ChitChat</div>
                <p className="text-slate-700 duration-150 group-hover:text-slate-200">You have a new message!</p>
            </div>
        </div>
    )
}
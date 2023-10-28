
const people = [
    {
        id: 1,
        name: "Adam West",
        title: "Web Developer",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=adam"
    },
    {
        id: 2,
        name: "John Travolta",
        title: "Android Developer",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=john"
    },
    {
        id: 1,
        name: "Selene Davis",
        title: "Web Designer",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=selene"
    }
]

export default function Peoples() {

    return (
        <ul className="bg-slate-50 my-14 w-96 shadow-lg rounded-2xl">
            {
                people.map(p => (
                    <li key={p.id} className="flex py-3 px-5 first:pt-4 last:pb-4 gap-x-3 border-b border-b-slate-300 last:border-b-0 group/item">
                        <img src={p.avatar} alt={p.name} className="w-10 h-auto" />
                        <div className="grow">
                            <div className="text-lg font-medium">{p.name}</div>
                            <div>{p.title}</div>
                        </div>
                        <div className="group/view self-center gap-x-1 bg-slate-300 px-3 py-1 rounded-md text-sm cursor-pointer hidden group-hover/item:flex">
                            <span>View</span>
                            <span className="block duration-500 group-hover/view:translate-x-1">{">"}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
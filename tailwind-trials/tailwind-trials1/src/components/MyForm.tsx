

export default function MyForm() {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <h2 className="head1">Login</h2>

            <input type="email" className="peer/inp2 my-input" required placeholder="Enter your email" />
            <p className="invisible peer-focus/inp2:visible peer-invalid/inp2:text-red-600 peer-valid/inp2:text-green-600">Enter a valid email please</p>

            <input type="text" className="peer/inp1 my-input mt-4" placeholder="Enter your secret number" />
            <p className="invisible peer-focus/inp1:visible">Enter your secret number</p>

            <button type="submit" className="my-btn mx-auto mt-6">Submit</button>
        </form>
    );
}
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className="flex justify-between items-center py-6 px-10 border-b">
            <Link to="/" className="text-2xl ">Open Data Explorer</Link>
            <Link className="border rounded p-2" to="/about">About</Link>
        </div>
    )

}

export default Navigation
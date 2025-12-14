import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return(
        <div className="flex flex-col gap-2">
            <h1>404 - Page Not Found</h1>
            <Link to="/" className="cursor-pointer">Go Home</Link>
        </div>
    )
}
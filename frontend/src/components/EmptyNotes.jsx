import { NotebookIcon, PlusIcon } from "lucide-react";
import {Link} from "react-router";

export default function EmptyNotes() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-base-200 rounded-2xl border border-dashed border-gray-300">
            <NotebookIcon className="h-16 w-16 text-gray-400 mb-4" />

            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Notes Yet
            </h2>
            <p className="text-gray-500 max-w-sm mb-6">
                Looks like you don’t have any notes. Start creating your first one to keep track of your thoughts.
            </p>

            <Link to={"/create"} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition">
                <PlusIcon className="h-5 w-5" />
                Create Note
            </Link>
        </div>
    );
}

import React from 'react';
import {PlusIcon} from "lucide-react";
import {Link} from "react-router";

const Navbar = () => {
    return (
        <header className="w-full bg-base-300 border-b shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-primary">ThinkBoard</h1>

                {/* Actions */}
                <nav className="flex items-center gap-3">
                    <Link
                        to="/create"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">New Note</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
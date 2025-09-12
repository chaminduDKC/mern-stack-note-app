// RateLimitAlert.jsx
import { ZapIcon } from "lucide-react";

export default function RateLimitAlert() {
    return (
        <div className="w-full max-w-lg mx-auto mt-6 p-4 flex items-center gap-3 rounded-xl bg-yellow-100 border border-yellow-300 shadow-sm">
            <ZapIcon className="h-6 w-6 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
                <p className="text-yellow-800 font-semibold">Rate Limit Reached</p>
                <p className="text-sm text-yellow-700">
                    You’ve hit the maximum request limit. Please wait a moment before trying again.
                </p>
            </div>
        </div>
    );
}

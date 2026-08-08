import type { InputProps } from "../types/celsia.types";

export const InputField = ({ label, placeholder, type, error, className, ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={ props.id } className="text-sm font-medium text-zinc-300">{label}:</label>
                <input
                    { ...props } 
                    className={`w-full rounded-lg border border-zinc-600 px-4 py-2.5 text-white placeholder:text-zinc-400 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition ${ className }`} 
                    type={ type } 
                    placeholder={ placeholder }
                    id={ props.id }
                />
                { error &&  (
                    <span className="text-sm text-red-600">
                        { error }
                    </span>
                )}
        </div>
    );
}
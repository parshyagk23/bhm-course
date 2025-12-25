import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const SortDropdown = ({ onChange }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Newest First");

    const options = ["Newest First", "Oldest First", "More Tags"];

    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
        onChange?.(option);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 font-bold px-4 py-2 border rounded-xl bg-white hover:bg-slate-50"
            >
                {selected}
                <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center justify-between"
                        >
                            {option}
                            {selected === option && <Check size={14} className="text-[#2D61A1]" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;

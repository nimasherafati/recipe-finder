import React from "react";

interface Props {
    searchTerm: string;
    onSearchChange: (value:string) => void;
    onSearchSubmit: () => void;
}

const SearchBar : React.FC<Props> = ({searchTerm,onSearchChange,onSearchSubmit}) => {
    return(
        <div>
            <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for meals ..."
            className="border p-2 rounded-l-md w-80"
            />
            <button
            onClick={onSearchSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >Search</button>
        </div>
    )
}

export default SearchBar;
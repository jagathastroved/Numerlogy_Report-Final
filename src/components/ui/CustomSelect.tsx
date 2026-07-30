import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[] | string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  searchable?: boolean;
  'aria-labelledby'?: string;
}

export default function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
  required,
  searchable,
  'aria-labelledby': ariaLabelledby
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format options to object
  const formattedOptions: Option[] = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const filteredOptions = formattedOptions.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const selectedOption = formattedOptions.find(opt => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        id={id}
        aria-labelledby={ariaLabelledby}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full text-left pl-3 pr-8 py-3 text-sm font-medium bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer disabled:opacity-50 transition-colors flex items-center justify-between ${className || ''}`}
      >
        <span className={`block truncate ${!selectedOption && placeholder ? 'text-gray-400' : 'text-gray-700'}`}>
          {selectedOption ? selectedOption.label : (placeholder || '\u00A0')}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-500">
          <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>

      {/* Mobile native select overlay (if not searchable) for better iOS/Android UX */}
      {!searchable && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="opacity-0 absolute inset-0 w-full h-full z-10 md:hidden cursor-pointer"
          disabled={disabled}
        >
          <option value="" disabled>{placeholder}</option>
          {formattedOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}

      {/* Hidden select for form submission / required validation */}
      {required && (
        <select value={value} onChange={() => { }} className={`opacity-0 absolute inset-0 w-full h-full -z-10 ${!searchable ? 'hidden md:block' : ''}`} required aria-hidden="true" tabIndex={-1}>
          <option value="" disabled>{placeholder}</option>
          {formattedOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative md:absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col max-h-60 overflow-hidden"
          >
            {searchable && (
              <div className="p-2 border-b border-gray-100 bg-white shrink-0">
                <input
                  type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <ul className="py-1 overflow-y-auto custom-scrollbar flex-1">
              {filteredOptions.length > 0 ? filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer transition-colors ${value === option.value
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-800'
                    }`}
                >
                  {option.label}
                </li>
              )) : (
                <li className="px-3 py-2 text-sm text-gray-500 text-center">No results found</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

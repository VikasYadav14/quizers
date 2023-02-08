import React, { use, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';

const Selector = () => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [allData, setAllData] = useState();

  useEffect(() => {
    fetch(`/api/getSubject`)
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  return (
    <div className="w-full lg:h-auto p-6">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-96 p-2">
        <div>
          <h1 className="text-lg text-gray-500 font-bold text-center m-5">
            Select Subject
          </h1>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-center border-2 px-4 py-2 text-sm font-medium text-white hover:text-violet-600 bg-violet-600 rounded-md hover:bg-white hover:border-violet-600 ${
            !selected && ''
          }`}
        >
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + '...'
              : selected
            : 'Select Subject'}
          <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
        </div>
        <ul
          className={`bg-white absolute  mt-2 overflow-y-auto ${
            open ? 'max-h-60' : 'max-h-0'
          } `}
        >
          <div className="flex items-center px-2 sticky top-0 bg-white">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter Subject name"
              className="placeholder:text-gray-700 p-2 outline-none"
            />
          </div>
          {allData?.map((sub) => (
            <li
              key={sub?.name}
              className={`p-2 text-sm hover:bg-violet-500 rounded-md w-96 hover:text-white
              ${
                sub?.name?.toLowerCase() === selected?.toLowerCase() &&
                'bg-violet-500 text-white'
              }
              ${
                sub?.name?.toLowerCase().startsWith(inputValue)
                  ? 'block'
                  : 'hidden'
              }`}
              onClick={() => {
                if (sub?.name?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(sub?.name);
                  setOpen(false);
                  setInputValue('');
                }
              }}
            >
              {sub?.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-auto lg:px-20">
        <div className="p-4">
          {allData?.map((sub) => {
            if (sub.name === selected) {
              return (
                <div key={sub?.name}>
                  <h2 className="text-center text-2xl font-medium mb-10">
                    {selected} Topics
                  </h2>
                  <div className="flex flex-col">
                  <div className="p-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 bg-white rounded-2xl">
                      {sub.topics.map((category, index) => {
                        return (
                          <Link
                          href={`/quiz/${category
                            .toLowerCase()
                            .replace(' ', '-')}`}
                            key={index} className='border-white border-2 rounded-2xl hover:border-violet-600 text-lg font-medium text-violet-400 hover:text-violet-600'
                          >
                            <li className="p-2">
                                {category}
                            </li>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Selector;

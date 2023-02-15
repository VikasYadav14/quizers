import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Practice() {
  const [allData, setAllData] = useState();
  const [selected, setSelected] = useState('गणित');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/getSubject`)
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="p-10">
        <div className="bg-violet-500 text-white p-4 rounded-md">
          <ul className="flex justify-around">
            {allData?.map((sub) => (
              <li className='m-2 cursor-pointer'
                key={sub.name}
                onClick={() => {
                  setSelected(sub?.name);
                }}
              >
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
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
                        <div className="p-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 bg-white rounded-2xl">
                          {sub.topics.map((category, index) => {
                            return (
                              <Link
                                href={`/practice/${category
                                  .toLowerCase()
                                  .replace(' ', '-')}`}
                                key={index}
                                className="border-white border-2 rounded-2xl hover:border-violet-600 text-lg font-medium text-gray-800 hover:text-violet-600"
                              >
                                <li className="p-2">{category}</li>
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
      </div>
    </div>
  );
}

export default Practice;

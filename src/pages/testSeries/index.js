import Link from 'next/link';

function TestSeries() {

  const exams = [
    {
      image:
        'https://th.bing.com/th/id/OIP.5UZYKKeLsleQES3PIpaBSAHaJ3?pid=ImgDet&rs=1',
      name: 'Agniveer',
      link: 'agniveer',
    },
    {
      image:
        'https://th.bing.com/th/id/OIP.wZ3l0-1c8DhHex2-5E7_RgAAAA?pid=ImgDet&rs=1',
      name: 'SSC',
      link: 'ssc',
    },
  ];

  return (
    <div>
      <div className="p-10">
        <div>
          <div className="w-full h-auto lg:px-20">
            <div className="p-4">
              <h2 className="text-center text-2xl font-medium mb-10">
                Select Your Exam
              </h2>
              <div className="flex flex-col">
                <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 bg-white rounded-2xl">
                  {exams.map((idx) => (
                    <Link
                      key={idx.name}
                      href={`/testSeries/${idx.link}`}
                      className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:text-violet-600"
                    >
                      <img
                        alt="Exam Logo"
                        src={idx.image}
                        width="100"
                        height="100"
                        className="h-56 w-full rounded-md object-cover"
                      />

                      <div className="mt-2">
                        <dl>
                          <div>
                            <dt className="sr-only">{idx.name}</dt>

                            <dd className="font-medium text-center">{idx.name}</dd>
                          </div>
                        </dl>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestSeries;

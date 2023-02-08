import NotFoundImg from '@/images/404.png';
import Image from 'next/image';

export default function Notfound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen lg:p-20 bg-gray-100 h-auto ">
      <div className="flex justify-center w-full flex-1">
        <div className="bg-white rounded-2xl shadow-2xl p-10 flex lg:w-2/3 ">
          <Image src={NotFoundImg} alt="/" />
        </div>
      </div>
    </section>
  );
}

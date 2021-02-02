import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-blue-300 to-green-400">
      <div className="bg-gradient-to-br from-white via-white to-blue-300  rounded-xl p-10 shadow-xl text-center opacity-70">
        <h1 className="text-6xl font-bold text-gray-800 opacity-50 border-b-2 border-gray-400 pb-4">
          404
        </h1>
        <div className="text-left">
          <h2 className="text-2xl font-medium pt-4 text-blue-800">
            oooops....
          </h2>
          <p className="text-sm pb-8">
            looks like this page dosen't exist
            <br />
            but dont't let that stop you.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-md p-2 font-medium bg-gray-800 text-white text-sm transition-colors focus:bg-blue-600 "
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
};

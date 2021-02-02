import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>oooops....</h2>
      <p>looks like this page dosen't exist</p>
      <p>but dont't let that stop you.</p>
      <Link to="/">GO HOME</Link>
    </div>
  );
};

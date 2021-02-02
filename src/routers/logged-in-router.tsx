import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserRole } from '../__generated__/globalTypes';
import { Podcasts } from '../pages/podcasts';
import { Podcast } from '../pages/podcast';
import { Page404 } from '../pages/404';

const ClientRouter = () => [
  <Route exact={true} key="podcasts" path="/" component={Podcasts} />,
  <Route exact={true} key="episodes" path="/podcast/:id" component={Podcast} />,
];
const HostRouter = () => [];

export const LoggedInRouter = () => {
  const { data, error, loading } = useUserInfo();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">loading...</span>
      </div>
    );
  }

  if (error?.message) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">
          {error.message}
        </span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        {data?.me.role === UserRole.Listener ? ClientRouter() : HostRouter()}
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
};

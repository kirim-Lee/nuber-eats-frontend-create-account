import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserRole } from '../__generated__/globalTypes';
import { Podcasts } from '../pages/podcasts';
import { Podcast } from '../pages/podcast';
import { Page404 } from '../pages/404';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';

const ClientRouter = () => [
  <Route exact={true} key="podcasts" path="/" component={Podcasts} />,
  <Route exact={true} key="episodes" path="/podcast/:id" component={Podcast} />,
];
const HostRouter = () => [];

export const LoggedInRouter = () => {
  const { data, error, loading } = useUserInfo();

  if (loading) {
    return <Loading />;
  }

  if (error?.message) {
    return <ErrorMessage message={error.message} />;
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

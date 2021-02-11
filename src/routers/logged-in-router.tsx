import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { UserRole } from '../__generated__/globalTypes';
import { Podcasts } from '../pages/podcasts';
import { Podcast } from '../pages/podcast';
import { MyPodcasts } from '../pages/my-podcasts';
import { MyPodcast } from '../pages/my-podcast';
import { CreatePodcast } from '../pages/create-podcast';
import { Page404 } from '../pages/404';
import { ErrorMessage } from '../components/error';
import { Loading } from '../components/loading';
import { React } from '@ungap/global-this';
import { CreateEpisode } from '../pages/create-episode';
import { EditEpisode } from '../pages/edit-episode';
import { EditPodcast } from '../pages/edit-podcast';
import { UserHeader } from '../components/user-header';

interface IRoute {
  path: string;
  component: React.ComponentType;
}

const ClientRouter: IRoute[] = [
  { path: '/', component: Podcasts },
  { path: '/podcast/:id', component: Podcast },
];

const HostRouter: IRoute[] = [
  { path: '/', component: MyPodcasts },
  { path: '/create-podcast', component: CreatePodcast },
  { path: '/podcast/:id', component: MyPodcast },
  { path: '/podcast/:id/edit', component: EditPodcast },
  { path: '/podcast/:id/create-episode', component: CreateEpisode },
  {
    path: '/podcast/:podcastId/episode/:episodeId/edit',
    component: EditEpisode,
  },
];

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
      {data?.me.role === UserRole.Listener && <UserHeader />}
      <Switch>
        {(data?.me.role === UserRole.Listener ? ClientRouter : HostRouter).map(
          (router) => (
            <Route
              exact={true}
              key={router.path}
              path={router.path}
              component={router.component}
            />
          )
        )}
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  );
};

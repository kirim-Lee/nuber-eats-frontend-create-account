import { getTimeAgo } from '../util';
import { WholePodcastPart } from '../__generated__/WholePodcastPart';
import { MyPodcastQuery_myPodcast_podcast } from '../__generated__/MyPodcastQuery';
import { Stars } from './start';
import { React } from '@ungap/global-this';
import { EditPodcast } from './edit-podcast';
import { Category } from '../__generated__/globalTypes';

interface IPodcast {
  title: string;
  description: string;
  category: Category;
  updatedAt: string;
  rating?: number;
  coverImg?: string;
  id: number;
}
interface IProps {
  podcast: IPodcast;
  edit?: boolean;
}
export const MyPodcastBox: React.FC<IProps> = ({ podcast, edit }) => {
  return (
    <div>
      <div className="flex justify-between items-start mt-3">
        <div className="mr-4">
          <h3 className="text-md">{podcast.title}</h3>
          <p className="text-xs font-light">{podcast.description}</p>
          <p className="opacity-70 text-xs pt-1">
            <span className="text-indigo-500">{podcast.category}</span> &middot;{' '}
            {getTimeAgo(podcast.updatedAt)}
          </p>
          <Stars rating={podcast?.rating} />
        </div>
        <p
          className="bg-center p-10 bg-cover rounded-md"
          style={{ backgroundImage: `url(${podcast.coverImg})` }}
        />
      </div>
      {edit && <EditPodcast podcastId={podcast.id} />}
    </div>
  );
};

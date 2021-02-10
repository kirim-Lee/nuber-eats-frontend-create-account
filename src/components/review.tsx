import { React } from '@ungap/global-this';
import { getTimeAgo } from '../util';
import { WholePodcastPart_reviews } from '../__generated__/WholePodcastPart';
import { Stars } from './stars';

interface IProps {
  review: WholePodcastPart_reviews;
  nobg?: boolean;
}
export const Review: React.FC<IProps> = ({ review, nobg }) => {
  return (
    <div className={`mb-2 rounded ${nobg ? '' : 'border border-violet-100'}`}>
      <h6 className="text-sm py-1 px-2 font-medium  border-b border-dashed border-gray-200 flex justify-between">
        {review.title}
        <div>
          <Stars rating={review.rating} small={true} />
        </div>
      </h6>
      <div className={`px-2 py-2 text-xs ${nobg ? '' : 'bg-violet-50'}`}>
        {review.text}
        <div className="flex justify-end items-center pt-3 text-gray-400">
          <span className="">{getTimeAgo(review.createdAt)}</span> &middot;{' '}
          <span className="text-violet-400">{review.creator.email}</span>
        </div>
      </div>
    </div>
  );
};

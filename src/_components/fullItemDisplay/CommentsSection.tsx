import React from 'react';
import './commentsSection.scss';	
import NewsService, { INewsItem } from '../newsService';
import LoadShimmer from '../loadShimmer/LoadShimmer';
import Comment from './Comment';

export interface ICommentsSectionProps {	
    newsItem?: INewsItem;
    isFirstLevel?: boolean;
}	

const CommentsSection = (props: ICommentsSectionProps) => {
    const [comments, setComments] = React.useState<INewsItem[]>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (props.newsItem) {
            setLoading(true);
            NewsService.getComments(props.newsItem).then(comments => {
                setLoading(false);
                setComments(comments);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [props.newsItem]);

    return (
        <div className={`CommentsSection ${props.isFirstLevel ? '' : 'nested'}`}>
            {
                loading && <LoadShimmer />
            }
            {
                (props.isFirstLevel && !loading && comments.length === 0) &&
                <div className='no-comments-message'>No Comments</div>	
            }
            { 
                (!loading && comments.length > 0) &&
                comments.map(comment => <Comment key={comment.id} comment={comment} />)
            }
        </div>	
    );	
}	

export default CommentsSection; 
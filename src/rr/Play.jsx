import Comments from '../components/Comments';
import Header from '../components/Header';
import PlayAnime from '../components/PlayAnime';
import { useParams} from "react-router-dom";
import Home from './Home';

function Play() {
    const { id } = useParams();
    
    if (!id) {
        return <Home />;
    }

    return (
        <>
            <Header isHome={false}/>
            <PlayAnime id={id} />
            <Comments id={id} />
        </>
    );
}

export default Play;

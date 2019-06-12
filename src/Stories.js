import React from 'react';
import { useFetch } from './hooks';

function Stories() {
    const stories = useFetch('https://news-proxy-server.appspot.com/topstories', []);
    return (
        <div className='Stories'>
            <h3>Stories</h3>
            {
                stories.map(story => {
                    const { id, by, time, title, url } = story;
                    return (
                        <div key={id}>
                            <a href={url}>{title}</a>
                            <div>{by} - {new Date(time * 1000).toLocaleString() /*api returns time in unix time which counts in seconds from 1970 but javascript counts in milliseconds so * 1000*/}</div>
                        </div>)
                })
            }
        </div>
    )
}

export default Stories;

//CODE BEFORE IMPLEMENTING USEFETCH CUSTOM HOOK
//function Stories() {
    //     const [stories, setStories] = useState([]);
    //     useEffect(() => {
    //         fetch('https://news-proxy-server.appspot.com/topstories')
    //             .then(response => response.json())
    //             .then(json => { setStories(json) })
    //     }, []);
    //     return (
    //         <div className='Stories'>
    //             <h3>Stories</h3>
    //             {
    //                 stories.map(story => {
    //                     const { id, by, time, title, url } = story;
    //                     return (
    //                         <div key={id}>
    //                             <a href={url}>{title}</a>
    //                             <div>{by} - {new Date(time * 1000).toLocaleString() /*api returns time in unix time which counts in seconds from 1970 but javascript counts in milliseconds so * 1000*/}</div>
    //                         </div>)
    //                 })
    //             }
    //         </div>
    //     )
    // }
import React from 'react';
import { useFetch } from './hooks';

function Joke() {
    const { setup, punchline } = useFetch('https://official-joke-api.appspot.com/jokes/random', {})
    return (
        <div>
            <h3>Joke of the session</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    )
}

export default Joke;

//CODE BEFORE MAKING CUSTOM USEFETCH HOOK
/*
function Joke() {
    const [joke, setJoke] = useState({});
    useEffect(() => {
        //kinda like component did mount - callback fires after renders
        fetch('https://official-joke-api.appspot.com/jokes/random')//fetch('http://localhost:3005/jokes/random')
            .then(response => response.json())
            .then(json => {
                console.log('joke json', json);
                setJoke(json);
            });
    }, []);//by providing an empty array for variables it only rerenders when the variable changes or for empty array it does not rerender, this prevents infinite loops because otherwise it keeps rerendering
    const { setup, punchline } = joke;
    return (
        <div>
            <h3>Joke of the session</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    )
}*/
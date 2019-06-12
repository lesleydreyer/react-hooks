import { useState, useEffect } from 'react';

export const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setResult(json));
    }, []);
    return result;
}

//this code renders twice - usestate with initial value then useeffect and an async fetch is called and then it gets to setResult(json) and goes back to the destructured useState and rerenders with the result, but sees the empty [] in useeffect which as nothing to wathc in so ends up not rerendering with infinite loop



export const useDynamicTransition = ({ increment, delay, length }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(storedIndex => {
                return (storedIndex + increment) % length;
            })
        }, delay);
        return () => clearInterval(interval);
    }, [delay, increment]);
    return index;
}
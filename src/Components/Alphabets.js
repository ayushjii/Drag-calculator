import { useEffect, useState } from "react";

const useAlphabets = () => {
    const [alphabets, setAlphabets] = useState([]);
    useEffect(() => {
        const getAlphabets = async () => {
             fetch("https://floating-sands-78044.herokuapp.com/alphabets")
                .then((response) => response.json())
                .then((data) => {
                    setAlphabets(data);
                })
        };
        getAlphabets();
    }, []);
    return [alphabets];
};

export default useAlphabets;

import { useEffect, useState } from "react";

const useAlphabets = () => {
    const [alphabets, setAlphabets] = useState([]);
    useEffect(() => {
        const getAlphabets = async () => {
             fetch("http://localhost:5000/")
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

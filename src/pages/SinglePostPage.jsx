import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CardComponent from "../components/CardComponent";

const myApiUrl = 'http://localhost:3000';

export default function SinglePostPage() {
    const { id } = useParams();
    const [singleElement, setSingleElement] = useState(null);

    useEffect(getData, [id]);

    function getData() {
        axios
            .get(myApiUrl + "/posts/" + id)
            .then((res) => {
                console.log(res);
                setSingleElement(res.data.item);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                console.log("finally");
            });
    }


    return (
        <div>

            {
                singleElement && (
                    <>
                        <h1>Sono il post con id {id}</h1>
                        <CardComponent key={singleElement.id} post={singleElement} />
                    </>
                )

            }
        </div>
    )
}
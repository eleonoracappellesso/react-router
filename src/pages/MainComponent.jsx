import { useEffect, useState } from "react";
// import { allPosts } from "../data/post";
import CardComponent from "../components/CardComponent"
// import PostForm from "../pages/PostForm";

import axios from "axios";

const myApiUrl = 'http://localhost:3000/posts';

function MainComponent() {
    // inizializzo lo stato posts con i post esistenti
    const [posts, setPosts] = useState([]); //useState(allPosts);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(myApiUrl).then((res) => {
            console.log(res.data);
            console.log(res.data.posts);
            setPosts(res.data.posts);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {

        });
    }

    // funzione che accetta il nuovo post, crea una copia dell'array di post esistenti e aggiunge il nuovo

    // function handleNewPost(newPost) {
    //     setPosts([...posts, newPost])
    // }

    function handleDeletePost(id) {
        axios.delete(myApiUrl + '/' + id).then((res) => {
            setPosts(posts.filter(post => post.id !== id));
        });
    }

    // function handleTag(e) {
    //     setPosts((post) => {
    //         let { tags, ...others } = post;
    //         if (tags.includes(e.target.value)) {
    //             tags = tags.filter((val) => val !== e.target.value);
    //         } else {
    //             tags = [...tags, e.target.value];
    //         }
    //         return {
    //             tags,
    //             ...others,
    //         };
    //     });
    // }

    // struttura del main component

    return (
        <main className="container">
            <h1 className="text-center my-3">Il mio blog</h1>
            <section className="d-flex justify-content-center flex-wrap align-items-center">
                {posts.map((post) => (
                    post.published ? <CardComponent key={post.id} post={post} removePost={handleDeletePost} /> : null
                ))}
            </section>
            {/*includo il form e gli passo la funzione per inviare il nuovo post al component padre, il main */}
            {/* <PostForm setPosts={setPosts} /> */}
        </main>
    )
}

export default MainComponent;
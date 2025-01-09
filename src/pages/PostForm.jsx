import { useState, useEffect } from "react";
import axios from "axios";

// stato iniziale del post
const initialPost = {
    title: "",
    published: false,
    id: null,
    image: "",
    content: "",
    tags: []
};

const myApiUrl = "http://localhost:3000";

function PostForm({ setPosts }) {
    // const tagList = tags();
    const [post, setPost] = useState(initialPost);
    const [selectedTags, setSelectedTags] = useState([]); // Stato per i tag selezionati

    useEffect(() => {
        getTags();
    }, []);

    function getTags() {
        axios
            .get(myApiUrl + "/tags")
            .then((res) => {
                console.log(res.data);
                setSelectedTags(res.data.tags);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(post)

        axios.post(myApiUrl + "/posts", post).then((res) => {
            console.log(res.data);
            setPosts(prev => [...prev, res.data]);
        });
        setPost(initialPost);

        // // controllo se il campo è vuoto
        // if (post.title.trim() === "") return;
        // // creo il nuovo post
        // const newPost = { ...post, id: Date.now(), tags: selectedTags };
        // // richiamo la funzione del contenitore padre e reimposto il form al valore iniziale
        // addPost(newPost);
        // setPost(initialPost);
        // setSelectedTags([]); // Resetta i tag selezionati
    }

    function handleInput(event) {
        const value =
            event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setPost({ ...post, [event.target.name]: value });
    }

    function handleTag(event) {
        const tag = event.target.value;
        setPost((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag) // Rimuovi il tag se già selezionato
                : [...prev.tags, tag] // Aggiungi il tag se non selezionato
        })
        );
    }

    return (
        <section className="my-4">
            <h4 className="text-uppercase">Inserisci un nuovo post:</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Title" className="form-label">
                        Titolo del post:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={post.title}
                        name="title"
                        onChange={handleInput}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="content" className="form-label">
                        Contenuto del post:
                    </label>
                    <textarea
                        type="text"
                        className="form-control"
                        value={post.content}
                        name="content"
                        onChange={handleInput}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="content" className="form-label">
                        Inserisci un'immagine:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={post.image}
                        name="image"
                        onChange={handleInput}
                    />
                </div>
                <div className="card p-4 my-2">
                    <h6 className="mb-3">Seleziona i tag del tuo post:</h6>
                    {selectedTags.map((tag) => (
                        <div className="mb-3 form-check" key={`tag-${tag.id}`}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`tag-${tag}`}
                                name="tags"
                                onChange={handleTag}
                                value={tag.title}
                            // checked={selectedTags.includes(tag.id)}
                            />
                            <label className="form-check-label" htmlFor={`tag-${tag}`}>
                                {tag.title}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="form-check my-2">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="published"
                        checked={post.published}
                        onChange={handleInput}
                    />
                    <label className="form-check-label" htmlFor="publishedPost">
                        Post pubblico
                    </label>
                </div>
                <button type="submit" className="btn btn-success my-3">
                    Crea post
                </button>
            </form>
        </section>
    );
}

export default PostForm;

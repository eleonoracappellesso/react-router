import style from "./Card.module.css";
import { Link } from "react-router-dom";

function CardComponent({ post, removePost }) {
    const handleDeleteClick = () => { removePost(post.id) }
    //console.log(post);
    return (
        <>
            <div className={`card m-3 ${style.card}`} key={post.id}>
                <img src={"/" + post.image} className={`card-img-top ${style.cardImg}`} alt={post.title} />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <p className="card-text">Tags: {post.tags.join(", ")}</p>
                    <Link to={`/posts/${post.id}`} className="btn read-btn">Leggi di più</Link>
                    <button
                        type="button" className="btn btn-danger mx-3" onClick={handleDeleteClick}>
                        Elimina post
                    </button>
                </div>
            </div >
        </>
    )
}

export default CardComponent;
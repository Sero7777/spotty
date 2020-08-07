import React, {useState} from "react";
import { updateComment } from "../../actions/index"

const UpdateCommentModal = (props) => {
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const status = await updateComment({content, id: props.comment._id})

        if (status === 200) {
            setContent("")
            props.onDismiss()
        }

        else console.log("something went wrong")
    }

    return (
        <div className="updateCommentModal__container">
            <div className="updateCommentModal__comment mg-bottom-m">
                <div className="updateCommentModal__comment--username">
                    <span className="pd-left-xs">{props.comment.username}</span> wrote:
                </div>
                <div className="updateCommentModal__comment--content">
                    {props.comment.content}
                </div>
            </div>
            <div className="comment__input mg-top-xs mg-bottom-s">
                <form onSubmit={handleSubmit}>
                    <textarea type="text" placeholder="Enter a Comment" value={content} onChange={e => setContent(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCommentModal;

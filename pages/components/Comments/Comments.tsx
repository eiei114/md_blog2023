import {ChangeEvent, FormEvent, useState} from "react";
import useSWR from 'swr';
import {mutate} from "swr";

const fetcher = (url: string) => fetch(url, {method: "GET"}).then((res) => res.json());
/* eslint-disable */
const addCommentRequest = (url: string, data: any) =>
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    }).then((res) => res.json());

const editCommentRequest = (url: string, data: any) =>
    fetch(url, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    }).then((res) => res.json());

const deleteCommentRequest = (url: string, id: string) =>
    fetch(`${url}?comment_id=${id}`, {method: "DELETE"}).then((res) => res.json());

interface CommentParams {
    id: string;
    created_at: string;
    updated_at: string;
    username: string;
    payload: string;
    reply_of?: string;
}

interface EditCommentParams {
    id: string;
    payload: string;
}

const Comments = () => {
    const {data: commentList, error: commentListError} = useSWR<CommentParams[]>("/api/comments", fetcher);
    const [comment, setComment] = useState<string>("");
    const [editComment, setEditComment] = useState<EditCommentParams>({
        id: "",
        payload: ""
    });
    const [replyOf, setReplyOf] = useState<string | null>(null);

    const confirmDelete = async (id: string) => {
        const ok = window.confirm("Delete comment?");
        if (ok && typeof commentList !== "undefined") {
            mutate(
                "api/comments",
                commentList.filter((comment) => comment.id !== id),
                false
            );
            const response = await deleteCommentRequest("api/comments", id);
            if (response[0].created_at) {
                mutate("api/comments");
                window.alert("Deleted Comment :)");
            }
        }
    };

    const onChangeEditComment = (event: ChangeEvent<HTMLInputElement>) => {
        const payload = event.target.value;
        setEditComment({...editComment, payload});
    };

    const confirmEdit = async () => {
        const editData = {
            commentId: editComment.id,
            payload: editComment.payload,
        };
        if (typeof commentList !== "undefined") {
            mutate(
                "api/comments",
                commentList.map((comment) => {
                    if (comment.id === editData.commentId) {
                        return {...comment, payload: editData.payload};
                    }
                }),
                false
            );
            const response = await editCommentRequest("api/comments", editData);
            if (response[0].created_at) {
                mutate("api/comments");
                window.alert("Hooray!");
                setEditComment({ id: "", payload: ""});
            }
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const commentValue = event.target.value;
        setComment(commentValue);
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newComment = {
            username: "hoonwee@email.com",
            payload: comment,
            reply_of: replyOf,
        };
        if (typeof commentList !== "undefined") {
            mutate("api/comments", [...commentList, newComment], false);
            const response = await addCommentRequest("api/comments", newComment);
            if (response[0].created_at) {
                mutate("api/comments");
                window.alert("Hooray!");
                setComment("")
            }
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-extrabold mb-4">Comments</h1>
                <form onSubmit={onSubmit} className="flex flex-col">
                    {replyOf && (
                        <div className="flex items-center">
                            <p className="mr-4">
                                Reply of: {commentList?.find((comment) => comment.id === replyOf)?.payload ?? ""}
                            </p>
                            <button onClick={() => setReplyOf(null)} className="btn btn-sm">
                                Cancel
                            </button>
                        </div>
                    )}
                    <input className="border p-2 mb-4" onChange={onChange} value={comment} type="text"
                           placeholder="Add a comment"/>
                    <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
                </form>
                <div className="flex flex-col">
                    {(commentList ?? [])
                        .sort((a, b) => {
                            const aDate = new Date(a.created_at);
                            const bDate = new Date(b.created_at);
                            return +aDate - +bDate;
                        }).map((comment) => (
                            <div key={comment.id} className="mb-4">
                                {comment.reply_of &&
                                    <p className="text-sm mb-2">
                                        Reply of: {commentList?.find((c) => c.id === comment.reply_of)?.payload ?? ""}
                                    </p>
                                }
                                <p className="mb-2">
                                    {comment.username}
                                    {comment.updated_at !== comment.created_at && (
                                        <span className="ml-4 text-sm italic font-extralight">edited</span>
                                    )}
                                </p>
                                <div className="flex flex-col">
                                    {editComment.id === comment.id ? (
                                        <input className="border p-2 mb-2" type="text" value={editComment.payload}
                                               onChange={onChangeEditComment}
                                        />
                                    ) : (
                                        <p className="mb-2">{comment.payload}</p>
                                    )}
                                    <div className="flex">
                                        {editComment.id === comment.id ? (
                                            <>
                                                <button type="button" onClick={confirmEdit}
                                                        className="bg-green-500 text-white p-2 mr-2 rounded">
                                                    Confirm
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditComment({
                                                        id: "", payload: ""
                                                    })}
                                                    className="bg-red-500 text-white p-2 rounded">
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditComment({
                                                        id: comment.id,
                                                        payload: comment.payload
                                                    })}
                                                    className="bg-blue-500 text-white p-2 mr-2 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button type="button" onClick={() => confirmDelete(comment.id)}
                                                        className="bg-red-500 text-white p-2 mr-2 rounded">
                                                    Delete
                                                </button>
                                                <button type="button" onClick={() => setReplyOf(comment.id)}
                                                        className="bg-green-500 text-white p-2 mr-2 rounded">
                                                    Reply
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
/* eslint-enable */
export default Comments
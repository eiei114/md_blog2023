import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = 'https://bdtegiewrnjqezybwbwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGVnaWV3cm5qcWV6eWJ3YndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYwODI1ODUsImV4cCI6MTk5MTY1ODU4NX0.UZkRodV9ZWbmhNux8jtSxE3xPiyZfZ2HZBpN9BkgeQw';

export const supabase = createClient(supabaseUrl, supabaseKey);
/* eslint-disable */
const CommentsApi = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        // Get all comments
        case "GET":
            const { data: getData, error: getError } = await supabase.from("comments").select("*");
            if (getError) {
                return res.status(500).json({ message: getError.message });
            }
            return res.status(200).json(getData);
        // Add comment
        case "POST":
            const comment = req.body;
            const { data: postData, error: postError } = await supabase.from("comments").insert(comment);
            if (postError) {
                return res.status(500).json({ message: postError.message });
            }
            return res.status(200).json(postData);
        // Edit comment
        case "PATCH":
            const { commentId: editcommentId, payload } = req.body;
            const { data: patchData, error: patchError } = await supabase
                .from("comments")
                .update({ payload })
                .eq("id", editcommentId);
            if (patchError) {
                return res.status(500).json({ message: patchError.message });
            }
            return res.status(200).json(patchData);
        // Delete comment
        case "DELETE":
            const { comment_id: deleteCommentId } = req.query;
            if (typeof deleteCommentId === "string") {
                const { data: deleteData, error: deleteError } = await supabase
                    .from("comments")
                    .delete()
                    .eq("id", deleteCommentId + "");
                if (deleteError) {
                    return res.status(500).json({ message: deleteError.message });
                }
                return res.status(200).json(deleteData);
            }
        default:
            return res.status(405).json({
                message: "Method Not Allowed",
            });
            break;
    }
};
/* eslint-enable */
export default CommentsApi;
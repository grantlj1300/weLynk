import dbConnect from "../../lib/mongodb";
import Post from "../../models/postModel";

export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const posts = await Post.find();
                res.status(201).send(posts);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "POST":
            try {
                const newPost = await Post.create(req.body);
                res.status(201).send(newPost);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}

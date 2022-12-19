import dbConnect from "../../../lib/mongodb";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        default:
            res.status(400).end();
            break;
    }
}

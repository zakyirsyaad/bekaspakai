export default async function handler(req, res) {
    if (req.method === "POST") {
        const { message } = req.body;

        // Simulasikan respons dari backend
        const botReply = `Anda mengatakan: ${message}`;

        return res.status(200).json({ reply: botReply });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

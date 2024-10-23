import TransactionSche from "../Module/TransactionSche.js";

const GetTransaction = async (req, res) => {
    try {
        const data = await TransactionSche.find();

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No transactions found."
            });
        }

        return res.status(200).json({
            status: true,
            message: "Transactions retrieved successfully.",
            data
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error retrieving transactions.",
            error: error.message
        });
    }
};

export default GetTransaction;

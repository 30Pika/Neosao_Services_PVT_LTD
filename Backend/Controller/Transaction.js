import TransactionSche from "../Module/TransactionSche.js";

const Transaction = async (req, res) => {
    try {
        const { type, amount, description, category, date } = req.body;

        const data = new TransactionSche({
            type,
            amount,
            description,
            category,
            date,
        });

        const result = await data.save();

        if (result) {
            return res.status(201).json({
                status: true,
                message: "Transaction created successfully.",
                data: result
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Failed to create transaction."
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred while creating the transaction.",
            error: error.message
        });
    }
};

export default Transaction;

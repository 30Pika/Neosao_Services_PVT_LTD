import TransactionSche from "../Module/TransactionSche.js";

const DeleteTransaction = async (req, res) => {
    try {
        const result = await TransactionSche.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 1) {
            return res.status(200).json({
                status: true,
                message: "Transaction deleted successfully.",
                result
            });
        } else {
            return res.status(404).json({
                status: false,
                message: "Transaction not found, deletion failed."
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error deleting transaction.",
            error: error.message
        });
    }
};

export default DeleteTransaction;

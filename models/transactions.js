var pending_transactions = [
    {
        transaction_id: 1,
        status: 'pending',
        type: 'credit',
        epoch: 1652001675,
        amount: 1200.00,
        currency: 'usd',
        to_account_number: 30221490342,
        from_account_number: 123456789
    },
    {
        transaction_id: 2,
        status: 'pending',
        type: 'debit',
        epoch: 1652001685,
        amount: 1225.00,
        currency: 'gbp',
        to_account_number: 30221490352,
        from_account_number: 123456788
    },
    { transaction_id: 3, status: 'pending', type: 'credit', epoch: 1652001695, amount: 1250.00, currency: 'gbp', to_account_number: 30221490362, from_account_number: 123456787 },
    { transaction_id: 4, status: 'pending', type: 'credit', epoch: 1652001705, amount: 1275.00, currency: 'usd', to_account_number: 30221490372, from_account_number: 123456786 },
    { transaction_id: 5, status: 'pending', type: 'debit', epoch: 1652001715, amount: 1300.00, currency: 'gbp', to_account_number: 30221490382, from_account_number: 123456785 },
    { transaction_id: 6, status: 'pending', type: 'credit', epoch: 1652001725, amount: 1325.00, currency: 'usd', to_account_number: 30221490392, from_account_number: 123456784 },
    { transaction_id: 7, status: 'pending', type: 'debit', epoch: 1652001735, amount: 1350.00, currency: 'gbp', to_account_number: 30221490402, from_account_number: 123456783 },
    { transaction_id: 8, status: 'pending', type: 'credit', epoch: 1652001745, amount: 1375.00, currency: 'gbp', to_account_number: 30221490412, from_account_number: 123456782 },
    { transaction_id: 9, status: 'pending', type: 'credit', epoch: 1652001755, amount: 1400.00, currency: 'usd', to_account_number: 30221490422, from_account_number: 123456781 },
    { transaction_id: 10, status: 'pending', type: 'debit', epoch: 1652001765, amount: 1425.00, currency: 'gbp', to_account_number: 30221490432, from_account_number: 123456780 }
];

var completed_transactions = [
    { transaction_id: 1, status: 'settled', type: 'credit', epoch: 1652001675, amount: 1200.00, currency: 'usd', to_account_number: 30221490342, from_account_number: 123456789 },
    { transaction_id: 2, status: 'declined', type: 'debit', epoch: 1652001685, amount: 1225.00, currency: 'gbp', to_account_number: 30221490352, from_account_number: 123456788 },
    { transaction_id: 3, status: 'reversed', type: 'credit', epoch: 1652001695, amount: 1250.00, currency: 'gbp', to_account_number: 30221490362, from_account_number: 123456787 },
    { transaction_id: 4, status: 'settled', type: 'credit', epoch: 1652001705, amount: 1275.00, currency: 'usd', to_account_number: 30221490372, from_account_number: 123456786 },
    { transaction_id: 7, status: 'settled', type: 'debit', epoch: 1652001735, amount: 1350.00, currency: 'gbp', to_account_number: 30221490402, from_account_number: 123456783 },
    { transaction_id: 10, status: 'settled', type: 'debit', epoch: 1652001765, amount: 1425.00, currency: 'gbp', to_account_number: 30221490432, from_account_number: 123456780 }
];

module.exports.getPending = async function (req, callback) {
    var getData = pending_transactions;
    return callback(getData);
}

module.exports.getCompleted = async function (req, callback) {
    var getData = completed_transactions;
    return callback(getData);
}


module.exports.getTransactions = async function (req, callback) {
    var query = req.query;

    if (!query.status) {
        return callback({ code: 400, err: "Status is required" });
    }

    if (query.status === "pending") {
        await exports.getPending(req, async function (responseData) {
            var getData = responseData;

            if (query.type) {
                getData = getData.filter((item) => (item.type === query.type));
            }
            if (query.currency) {
                getData = getData.filter((item) => (item.currency === query.currency));
            }
            return callback({ code: 200, data: getData });
        });
    } else {
        await exports.getCompleted(req, async function (responseData) {
            var getData = responseData;

            if (query.type) {
                getData = getData.filter((item) => (item.type === query.type));
            }
            if (query.currency) {
                getData = getData.filter((item) => (item.currency === query.currency));
            }
            return callback({ code: 200, data: getData });
        });
    }
}
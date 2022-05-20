// /admin/transactions?type=<>&status=<>&currency=<></>
var express = require('express');
var router = express.Router();
var staticData = require("../../models/transactions");


router.get('/transactions', async function (req, res, next) {
    var query = req.query;
    console.log(query)

    if (!query.status) {
        return ReE(res, "Status is required", 400);
    } else {
        await staticData.getTransactions(req, async function (responseData) {
            console.log(responseData);

            if (responseData.code == 200) {
                return ReS(res, "Transaction fetched successfully!", {
                    payload: {
                        data: responseData.data
                    }
                });
            } else {
                return ReE(res, "Transaction  failed to fetch!", 400);
            }
        });
    }
});

module.exports = router;
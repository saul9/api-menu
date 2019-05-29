'use strict';

const router = express.Router();
const genericActions = autoload(`${__dirname}/../modules/genericActions`);

router.get('/:model', (req, res) => {

    let query = {};
    let limit = null;
    let page = null;
    let sort = null;

    try {
        if (req.query.q) {
            query = JSON.parse(req.query.q);
        }
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        if (req.query.sort) {
            sort = JSON.parse(req.query.sort);
        } else {
            sort = { id: 1 }
        }

    } catch (err) {
        return res.status(500).json({
            status: 'ERROR',
            error: err.message
        });
    }

    genericActions.find(req.params.model, query, limit, page, sort)
        .then((result) => {
            res.json({
                status: "OK",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 'ERROR',
                error: err.message
            });
        });

});

module.exports = router;

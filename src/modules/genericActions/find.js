module.exports = (model, query, limit, page, sort) => {
    if (page <= 0) {
        page = 1;
    }

    let skip = (page - 1) * limit;
    return new Promise((resolve, reject) => {
        if (!models[model]) {
            return reject(new Error('Model is not found'));
        }
        models[model].count(query).exec()
            .then((total) => {
                var succeeded = (result) => {
                    resolve({
                        results: result,
                        pages: parseInt(total / limit) + 1,
                        total: total
                    });
                };
                models[model].find(query).limit(limit).skip(skip).sort(sort).exec()
                    .then(succeeded)
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });

    })
};

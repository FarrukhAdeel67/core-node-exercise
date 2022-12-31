const fetch = require('node-fetch');
module.exports = {
    get: async(req, res) => {
        try {
            const { address } = req.query;
            if (!address) {
                throw { status: 400, message: "address is required" };
            }
            const result = await fetch(`http://localhost:3000/I/want/title/${address}`) //, 
                // {
                //     method: 'GET',
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // });
            const data = await result.text();
            // console.log(result.json());
            // console.log(data);
            var stringified = JSON.stringify(data);
            var parsedObj = JSON.parse(stringified);
            res.status(200).send(parsedObj)
        } catch (err) {
            console.log(err);
            return res
                .status(err.status || 500)
                .send(err.message || "Something went wrong...");
        }
    },
}
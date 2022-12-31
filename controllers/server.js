const fetch = require('node-fetch');
module.exports = {
    get: (req, res) => {
        const parseTitle = (body) => {
            let match = body.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
            if (!match || typeof match[1] !== 'string')
                throw new Error('Unable to parse the title tag')
            return match[1]
        }
        const { address } = req.query
        if (!address)
            throw { status: 400, message: "address is required" };
        if (!(address.endsWith('.com'))) {
            throw { status: 404, message: "NO Response" };

        }
        fetch(address)
            .then(res => res.text()) // parse response's body as text
            .then(body => parseTitle(body)) // extract <title> from body
            .then(title => res.status(200).send(`
            <h1>Following are the titles of given websites</h1>
            <ul> ${address} - "${title}"</ul>
          `)) // send the result back
            .catch(e => res.status(500).end(e.message)) // catch possible errors

    },
}
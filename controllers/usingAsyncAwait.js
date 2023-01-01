const fetch = require('node-fetch');
module.exports = async(req, res) => {
    //mutiple addresses in the form of query
    let addresses = req.query.address;
    if (!Array.isArray(addresses)) {
        addresses = [addresses];
    }
    try {
        const parseTitle = (body) => {
            //function to lookup for title
            let match = body.match(/<title>([^<]*)<\/title>/);
            if (!match || typeof match[1] !== 'string') {
                return res.send('Unable to parse the title tag');
            }
            return match[1];
        };
        const fetchAddress = async(address) => {
            //fucntion to fetch and process the addresses
            try {
                if (!address) {
                    return res.status(400).send('Query is Required');
                }
                const response = await fetch(address); //fetch the address
                const body = await response.text(); // change the fetched response to text format
                const title = parseTitle(body); //send the texted fortmat to parse the  title(s) from URL
                if (!title) {
                    return res.status(400).send('Unable to parse title');
                }
                return title;
            } catch (err) {
                console.log(err);
                res.status(500).send(`${address} - NO RESPONSE ` || err.message);
            }
        };
        const outputTitles = {};
        for (const i of addresses) {
            const title = await fetchAddress(i);
            outputTitles[i] = title;
        }
        res.render('index', { outputTitles });
    } catch (err) {
        console.log(err);
        return res.status(500).send(` ${addresses} - NO RESPONSE ` || err.message);
    }
};
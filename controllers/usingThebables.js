const fetch = require('node-fetch');
module.exports = (req, res) => {
    //mutiple addresses in the form of query
    let addresses = req.query.address;
    if (!Array.isArray(addresses)) {
        addresses = [addresses];
    }
    if (!addresses) {
        return res.status(400).send('Query address is required');
    }
    const parseTitle = (body) => {
        //function to looking up for title
        let match = body.match(/<title>([^<]*)<\/title>/);
        if (!match || typeof match[1] !== 'string') {
            res.send('Unable to parse the title tag');
        }
        return match[1];
    };

    const outputTitles = {};
    let count = 0; //keep track of no of addresses
    for (const address of addresses) {
        fetch(address) // fetches each address 
            .then((res) => res.text()) // change the fetched response to text format
            .then((body) => parseTitle(body)) //send the texted fortmat to parse the  title(s) from URL
            .then((title) => {
                outputTitles[address] = title;
                count++;
                if (count === addresses.length) {
                    res.render('index', { outputTitles });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(`${address} - NO RESPONSE   ` || err.message);
            });
    }
};
const fetch = require('node-fetch');

module.exports = (req, res) => {
    //mutiple addresses in the form of query
    let addresses = req.query.address;
    if (!Array.isArray(addresses)) {
        addresses = [addresses];
    }
    const parseTitle = (body) => {
        //function to return promise after looking up for title
        return new Promise((res, rej) => {
            let match = body.match(/<title>([^<]*)<\/title>/);
            if (!match || typeof match[1] !== 'string') {
                rej(new Error('Unable to parse the title tag'));
            }
            res(match[1]);
        });
    };
    // checking either addresses exist or not
    if (!addresses) {
        return res.status(400).end('Query address is required');
    }
    // create an array of Promises for each address
    const fetchAddress = addresses.map((address) => {
        return fetch(address) // fetches each address and returns success or failure
            .then((response) => response.text()) // change the fetched response to text format
            .then((body) => parseTitle(body)) //send the texted fortmat to parse the  title(s) from URL
            .then((title) => {
                if (!title) {
                    return Promise.reject(res.send('Unable to parse title'));
                }
                return { title, address }; // returns title and address is pomise is resolved 
            })
            //catches errors if any
            .catch((err) => {
                console.log(err);
                res.status(500).send(`${address} - NO RESPONSE` || err.message);
            });
    });

    // Promise.all wait for all requests to complete
    // After each address is fetched then it is passed here to be rendered 
    Promise.all(fetchAddress)
        .then((titles) => {
            if (titles.length === 1) {
                // render "single address"
                let outputTitles = titles[0];
                res.render('index', { outputTitles });
            } else if (titles.length >= 2) {
                // render "multiple addresses"
                const outputTitles = {};
                titles.forEach((element) => {
                    outputTitles[element.title] = element.address;
                });
                res.render('index', { outputTitles });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`${addresses} - NO RESPONSE` || err.message);
        });
};
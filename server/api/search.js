import Yelp from 'yelp';


let client = new Yelp({
    consumer_key: 'aS1epDqirA9wLtfvmLn82Q',
    consumer_secret: 'xz26fRhrTixjRxGixHUr-mrAJTg',
    token: '_ufbcTmJ87e8jX8VJLufRCv9xccjnNNC',
    token_secret: 'M5aHeveEV3PHDaBmBMuQNFLhItw'
});


export default app => {
    app.get('/api/search', (req, res) => {
        let {
            loc,
            ll
        } = req.query;
        
        let opts = {
            term: 'bar',
            limit: 10
        };
        
        if(ll) {
            opts.ll = ll;
        } else {
            opts.location = loc;
        }
        
        client.search(opts).then(({businesses}) => {
            res.json(businesses);
        }, err => {
            console.error(err);
            res.json([]);
        });
    });
};
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');

function createExpressApp(database) {

    app.set('port', (process.env.PORT || 3000));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api', apiRouter(database));

    app.listen(app.get('port'), () => {
        console.log('app listening on port' + app.get('port'));
    });
}

module.exports = createExpressApp;

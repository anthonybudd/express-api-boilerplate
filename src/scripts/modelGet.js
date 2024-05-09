
/**
 * node ./src/scripts/modelGet.js --model="User" --id="c4644733-deea-47d8-b35a-86f30ff9618e"
 * docker exec -ti express-api node ./src/scripts/modelGet.js --model="User" --id="c4644733-deea-47d8-b35a-86f30ff9618e"
 */
require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const Models = require('./../models');
const db = require('./../providers/db');

if (!argv['id']) throw Error('You must provide --id argument');
if (!argv['model']) argv['model'] = 'User';
if (!Models[argv['model']]) throw Error('Model does not exist');

(async function Main() {
    try {
        const Model = Models[argv['model']];

        const model = await Model.unscoped().findOne({
            where: { id: argv['id'] }
        });

        console.log(JSON.stringify(model.get({ plain: true }), null, 4));
    } catch (err) {
        console.error(err);
    } finally {
        db.connectionManager.close();
    }
})();



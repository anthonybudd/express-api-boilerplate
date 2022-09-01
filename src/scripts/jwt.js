
/**
 * npm run jwt -- --id="c4644733-deea-47d8-b35a-86f30ff9618e"
 * docker exec -ti express-api npm run jwt -- --id="c4644733-deea-47d8-b35a-86f30ff9618e"
 *
 */
require('dotenv').config();
const generateJWT = require('./../providers/generateJWT');
const argv = require('minimist')(process.argv.slice(2));
const { User } = require('./../models');
const db = require('./../providers/db');

if (!argv['id']) throw Error('You must provide and --id argument');

(async function Main() {
    try {
        const user = await User.findByPk(argv['id']);
        console.log('');
        console.log('JWT:');
        console.log(generateJWT(user));
        console.log('');
    } catch (err) {
        console.error(err);
    } finally {
        db.connectionManager.close();
    }
})();

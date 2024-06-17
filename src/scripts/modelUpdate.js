
/**
 * node ./src/scripts/modelUpdate.js --model="User" --data="eyJpZCI6ImM0NjQ0NzMzLWRlZWEtNDdkOC1iMzVhLTg2ZjMwZmY5NjE4ZSJ9"
 * docker exec -ti express-api node ./src/scripts/modelUpdate.js --model="User" --data="eyJpZCI6ImM0NjQ0NzMzLWRlZWEtNDdkOC1iMzVhLTg2ZjMwZmY5NjE4ZSJ9"
 */
require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const Models = require('./../models');
const db = require('./../providers/db');

if (!argv['id']) throw Error('You must provide --id argument');
if (!argv['model']) throw Error('You must provide --model argument');
if (!Models[argv['model']]) throw Error('Model does not exist');

(async function Main() {
    try {
        let data = '';
        let base64Decoded;
        let obj;

        for await (const chunk of process.stdin) data += chunk;

        try {
            base64Decoded = atob(data);
        } catch (error) {
            throw Error('Invalid base64 encoding');
        }

        try {
            obj = JSON.parse(base64Decoded);
        } catch (error) {
            throw Error('Invalid JSON');
        }

        if (!obj.id) throw Error('data.id is required');


        delete obj.id;
        const Model = Models[argv['model']];

        await Model.update(obj, {
            where: { id: argv['id'] }
        });

        console.log(`\n${argv['model']}:${argv['id']} updated\n`);
    } catch (err) {
        console.error(err);
    } finally {
        db.connectionManager.close();
    }
})();

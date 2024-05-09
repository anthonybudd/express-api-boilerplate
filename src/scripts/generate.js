
/**
 * node ./src/scripts/generate.js --model="bucketCase"
 * docker exec -ti express-api node ./src/scripts/generate.js --model="bucket"
 */
require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const jsConvert = require('js-convert-case');
const Inflector = require('inflector-js');
const { v4: uuidv4 } = require('uuid');
const Mustache = require('mustache');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

if (!argv['model']) throw Error('You must provide --model argument');
if (/^\d/.test(argv['model'])) throw Error('--model cannot start with a number');

(async function Main() {
    const modelName = argv['model'];
    const isDryRun = !!argv['d'] || false;

    const params = {
        modelname: jsConvert.toLowerCase(modelName),
        modelName: jsConvert.toCamelCase(modelName),
        ModelName: jsConvert.toPascalCase(modelName),
        MODELNAME: jsConvert.toUpperCase(modelName),

        modelnames: Inflector.pluralize(jsConvert.toLowerCase(modelName)),
        modelNames: Inflector.pluralize(jsConvert.toCamelCase(modelName)),
        ModelNames: Inflector.pluralize(jsConvert.toPascalCase(modelName)),
        UUID: uuidv4(),
    };

    if (argv['v']) console.log(params);
    if (isDryRun) console.log(`\n\n⚠️  Dry run. Will not write any files.\n\n`);


    ////////////////////////////////////////////////
    // Model
    const pathModel = path.resolve(`./src/models/${params.ModelName}.js`);
    if (!argv['force'] && fs.existsSync(pathModel)) throw new Error(`File already exists at ${pathModel}`);
    if (!isDryRun) fs.writeFileSync(pathModel, Mustache.render(fs.readFileSync(path.resolve('./src/scripts/generator/Model.js'), 'utf8'), params));
    console.log(`Created: ${pathModel}`);


    const modelsIndex = path.resolve(`./src/models/index.js`);
    const fileContent = fs.readFileSync(modelsIndex, 'utf8');
    if (!fileContent.includes(`const ${params.ModelName}`)) {
        const lines = fileContent.split('\n');
        let lastLineWithClosingBracket;
        let lastLineWithRequirePlusOne;
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i].trim();
            if (line.endsWith('};')) {
                lastLineWithClosingBracket = (i + 1);
            }

            if (line.includes('require(') && !lastLineWithRequirePlusOne) {
                lastLineWithRequirePlusOne = (i + 2);
            }
        }

        if (lastLineWithRequirePlusOne) {
            const requireLine = `const ${params.ModelName} = require('./${params.ModelName}');\n`;
            lines.splice(lastLineWithRequirePlusOne - 1, 1, requireLine);
        }

        if (lastLineWithClosingBracket) {
            const newLines = ([
                `    ${params.ModelName},`,
                '};',
            ]).join('\n');
            lines.splice(lastLineWithClosingBracket - 1, 1, newLines);
        }
        if (!isDryRun) fs.writeFileSync(modelsIndex, lines.join('\n'));
    }


    ////////////////////////////////////////////////
    // Route
    const pathRoute = path.resolve(`./src/routes/${params.ModelNames}.js`);
    if (!argv['force'] && fs.existsSync(pathRoute)) throw new Error(`File already exists at ${pathRoute}`);
    if (!isDryRun) fs.writeFileSync(pathRoute, Mustache.render(fs.readFileSync(path.resolve('./src/scripts/generator/Route.js'), 'utf8'), params));
    console.log(`Created: ${pathRoute}`);

    const mainIndex = path.resolve(`./src/index.js`);
    const mainIndexContent = fs.readFileSync(mainIndex, 'utf8');
    if (!mainIndexContent.includes(`require('./routes/${params.ModelNames}'));`)) {
        const mainIndexLines = mainIndexContent.split('\n');
        let lastLineWithRouteRequirePlusOne;
        for (let ii = mainIndexLines.length - 1; ii >= 0; ii--) {
            const line = mainIndexLines[ii].trim();
            if (line.includes(`require('./routes/`) && !lastLineWithRouteRequirePlusOne) {
                lastLineWithRouteRequirePlusOne = (ii + 2);
            }
        }

        if (lastLineWithRouteRequirePlusOne) {
            const routeRequireLine = `app.use('/api/v1/', require('./routes/${params.ModelNames}'));\n`;
            mainIndexLines.splice(lastLineWithRouteRequirePlusOne - 1, 1, routeRequireLine);
            if (!isDryRun) fs.writeFileSync(mainIndex, mainIndexLines.join('\n'));
        }
    }


    ////////////////////////////////////////////////
    // Migration
    const pathMigration = path.resolve(`./src/database/migrations/${moment().format('YYYYMMDDHHmmss')}-create-${params.ModelNames}.js`);
    if (!argv['force'] && fs.existsSync(pathMigration)) throw new Error(`File already exists at ${pathMigration}`);
    if (!isDryRun) fs.writeFileSync(pathMigration, Mustache.render(fs.readFileSync(path.resolve('./src/scripts/generator/Migration.js'), 'utf8'), params));
    console.log(`Created: ${pathMigration}`);


    ////////////////////////////////////////////////
    // Seeder
    const pathSeeder = path.resolve(`./src/database/seeders/${moment().format('YYYYMMDDHHmmss')}-${params.ModelNames}.js`);
    if (!argv['force'] && fs.existsSync(pathSeeder)) throw new Error(`File already exists at ${pathSeeder}`);
    if (!isDryRun) fs.writeFileSync(pathSeeder, Mustache.render(fs.readFileSync(path.resolve('./src/scripts/generator/Seeder.js'), 'utf8'), params));
    console.log(`Created: ${pathSeeder}`);


    ////////////////////////////////////////////////
    // Test
    const pathTest = path.resolve(`./tests/${params.ModelName}.js`);
    if (!argv['force'] && fs.existsSync(pathTest)) throw new Error(`File already exists at ${pathTest}`);
    if (!isDryRun) fs.writeFileSync(pathTest, Mustache.render(fs.readFileSync(path.resolve('./src/scripts/generator/Test.js'), 'utf8'), params));
    console.log(`Created: ${pathTest}`);


    ////////////////////////////////////////////////
    // Requests
    const pathRequests = path.resolve(`./requests.http`);
    const requestContent = fs.readFileSync(pathRequests, 'utf8');
    const newRequest = Mustache.render(fs.readFileSync(path.resolve('./src/scripts/generator/requests.http'), 'utf8'), params);
    if (!requestContent.includes(`### ${params.ModelName}`)) {
        if (!isDryRun) fs.writeFileSync(pathRequests, requestContent + '\n' + newRequest);
        console.log(`Updated: ${pathRequests}`);
    }
})();



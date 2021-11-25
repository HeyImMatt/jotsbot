const db = require('.');

(async function() {
    try {
        console.log(
            '********** ' +
            'Initializing Database ' +
            '**********'
        );

        await db.sequelize.sync({ force: true, logging: true });

        console.log('********** Database Initialization Complete! **********\n\n');
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}());

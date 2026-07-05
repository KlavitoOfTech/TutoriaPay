import config from './config/env.config.js';
import app from './app.js';
import query from './config/db.config.js';

const {PORT} = config;

async function startServer() {
    try {
        const res = await query('SELECT NOW()');
        console.log(`🚀 Database connection successful! Server time: ${res.rows[0].now}`);

        app.listen(PORT, () => {
            console.log(`app is listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server due to database connection error:', error);
        process.exit(1);
    }
}

startServer();
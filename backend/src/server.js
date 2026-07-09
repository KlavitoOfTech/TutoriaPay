import config from './config/env.config.js';
import app from './app.js';
import query from './config/db.config.js';
import { fetchSubAccountTransaction, fetchTransactionHistory, runBackgroundTokenManager, fetchVirtualAccount } from './services/nomba.service.js' 

const {PORT} = config;

async function startServer() {
    try {
        const res = await query('SELECT NOW()');
        console.log(`🚀 Database connection successful! Server time: ${res.rows[0].now}`);

        await runBackgroundTokenManager()
        //fetchSubAccountTransaction('ef828e15-9c7a-4b68-ae5d-fb58256228d9')
       //await fetchVirtualAccount('fe8821ed-c00e-41f6-af1f-2878f3eafb67')
        await fetchTransactionHistory('7918010552')

        app.listen(PORT, () => {
            console.log(`app is listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server due to database connection error:', error);
        process.exit(1);
    }
}

startServer();
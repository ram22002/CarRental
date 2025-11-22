import app from './src/app.js';
import {connect} from './src/db/db.js';
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 5000;

connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  
});
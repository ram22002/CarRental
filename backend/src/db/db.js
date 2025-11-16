import mongoose from 'mongoose';

export const connect = () => {
    mongoose.connect(process.env.MONGO_URL) 
        .then(() => console.log('🐰🐼🐼MongoDB Connected...✅✅✅ ... 🐼🐼🐰'))
        .catch(err => console.log(err));
}

import mongoose from "mongoose";

export async function setupMongo (): Promise <void> {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('✅ Already connected to DB');
            return;
        }

        console.log('🎲 Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('🚩 DB Connected!');
        
    } catch (error) {
        console.error('❌ DB Connection Error:', error);
        throw new Error('❌ DB not Connected!');
    }
}
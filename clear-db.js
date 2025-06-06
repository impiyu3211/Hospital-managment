const mongoose = require('mongoose');

// Configure Mongoose
mongoose.set('strictQuery', false);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hospital_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    try {
        // Drop the users collection
        await mongoose.connection.collection('users').drop();
        console.log('Users collection dropped successfully');
    } catch (error) {
        console.error('Error dropping collection:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}).catch((err) => {
    console.error('MongoDB connection error:', err);
}); 
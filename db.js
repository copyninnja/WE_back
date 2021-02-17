var dotenv =require( 'dotenv');
var mongoose =require( 'mongoose');

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`database connection error: ${err}`);
});
db.on('disconnected', () => {
    console.log('database disconnected');
}); 
db.once('open', () => {
    console.log(`database connected to ${db.name} on ${db.host}`);
})

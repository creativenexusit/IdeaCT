const fs = require('fs');
const mongoose = require('mongoose');

try {
  const envLocal = fs.readFileSync('.env.local', 'utf8');
  const dbUrlMatch = envLocal.match(/DATABASE_URL=(.+)/);
  if (!dbUrlMatch) {
    console.error('DATABASE_URL not found in .env.local');
    process.exit(1);
  }
  const connStr = dbUrlMatch[1].trim().replace(/^['"]|['"]$/g, '');

  console.log('Connecting...');
  mongoose.connect(connStr).then(async () => {
    console.log('Connected');
    
    const Service = mongoose.model('Service', new mongoose.Schema({ title: String, thumbnail: String }));
    const services = await Service.find({});
    console.log('Services in DB:', services.map(s => ({ title: s.title, thumbnail: s.thumbnail })));
    
    const Training = mongoose.model('Training', new mongoose.Schema({ title: String, banner: String }));
    const trainings = await Training.find({});
    console.log('Trainings in DB:', trainings.map(t => ({ title: t.title, banner: t.banner })));
    
    process.exit(0);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
} catch (e) {
  console.error(e);
}

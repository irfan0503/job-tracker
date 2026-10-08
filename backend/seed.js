require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Job = require('./models/Job');

const sampleJobs = [
  {
    jobTitle: 'Electronics Design Intern',
    company: 'Demo Circuits Lab',
    location: 'Chennai',
    category: 'Electronics',
    jobType: 'On-site',
    applyLink: 'https://example.com/electronics-intern',
    description: 'Sample/demo internship record for electronics design.'
  },
  {
    jobTitle: 'Embedded Systems Intern',
    company: 'Demo Embedded Works',
    location: 'Bengaluru',
    category: 'Embedded Systems',
    jobType: 'Hybrid',
    applyLink: 'https://example.com/embedded-intern',
    description: 'Sample/demo internship record for embedded systems.'
  },
  {
    jobTitle: 'IoT Intern',
    company: 'Demo Technologies',
    location: 'Chennai',
    category: 'IoT',
    jobType: 'On-site',
    applyLink: 'https://example.com/iot-intern',
    description: 'Sample/demo internship record for Internet of Things projects.'
  },
  {
    jobTitle: 'Web Development Intern',
    company: 'Demo Web Studio',
    location: 'Remote',
    category: 'Web Development',
    jobType: 'Remote',
    applyLink: 'https://example.com/web-intern',
    description: 'Sample/demo internship record for web development.'
  },
  {
    jobTitle: 'Software Engineering Intern',
    company: 'Demo Software Group',
    location: 'Hyderabad',
    category: 'Software',
    jobType: 'Hybrid',
    applyLink: 'https://example.com/software-intern',
    description: 'Sample/demo internship record for software engineering.'
  },
  {
    jobTitle: 'Electronics Testing Intern',
    company: 'Sample Hardware Studio',
    location: 'Pune',
    category: 'Electronics',
    jobType: 'On-site',
    applyLink: 'https://example.com/electronics-testing',
    description: 'Sample/demo internship record for electronics testing.'
  },
  {
    jobTitle: 'IoT Platform Intern',
    company: 'Sample Connected Systems',
    location: 'Chennai',
    category: 'IoT',
    jobType: 'Hybrid',
    applyLink: 'https://example.com/iot-platform',
    description: 'Sample/demo internship record for connected device platforms.'
  },
  {
    jobTitle: 'Frontend Web Intern',
    company: 'Sample Interface Studio',
    location: 'Mumbai',
    category: 'Web Development',
    jobType: 'Remote',
    applyLink: 'https://example.com/frontend-intern',
    description: 'Sample/demo internship record for frontend development.'
  },
  {
    jobTitle: 'Firmware Development Intern',
    company: 'Sample Embedded Lab',
    location: 'Coimbatore',
    category: 'Embedded Systems',
    jobType: 'On-site',
    applyLink: 'https://example.com/firmware-intern',
    description: 'Sample/demo internship record for firmware development.'
  },
  {
    jobTitle: 'Backend Software Intern',
    company: 'Sample Code Studio',
    location: 'Remote',
    category: 'Software',
    jobType: 'Remote',
    applyLink: 'https://example.com/backend-intern',
    description: 'Sample/demo internship record for backend development.'
  }
];

async function seedJobs() {
  try {
    await connectDB();
    const operations = sampleJobs.map((job) => ({
      updateOne: {
        filter: { jobTitle: job.jobTitle, company: job.company },
        update: { $set: job },
        upsert: true
      }
    }));
    const result = await Job.bulkWrite(operations);
    console.log(`Sample/demo jobs seeded. Inserted: ${result.upsertedCount}; updated: ${result.modifiedCount}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedJobs();

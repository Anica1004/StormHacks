// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Replace with your path
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the ChoreContextType structure
const choreContextType = [
    {
        choreID: 'chore1',
        name: 'Take out the trash',
        frequency: 'Weekly',
        person: 'Alice',
        recurring: true,
        status: 'unassigned',  // Changed to 'unassigned'
    },
    {
        choreID: 'chore2',
        name: 'Clean the kitchen',
        frequency: 'Weekly',   // Set to 'Weekly'
        person: 'Bob',
        recurring: true,
        status: 'complete',     // Changed to 'complete'
    },
    {
        choreID: 'chore3',
        name: 'Mow the lawn',
        frequency: 'Weekly',   // Set to 'Weekly'
        person: 'Charlie',
        recurring: true,
        status: 'incomplete',   // Changed to 'incomplete'
    },
    {
        choreID: 'chore4',
        name: 'Wash the car',
        frequency: 'Weekly',   // Set to 'Weekly'
        person: 'Alice',
        recurring: false,
        status: 'unassigned',   // Changed to 'unassigned'
    },
    {
        choreID: 'chore5',
        name: 'Water the plants',
        frequency: 'Weekly',   // Set to 'Weekly'
        person: 'Bob',
        recurring: true,
        status: 'complete',     // Changed to 'complete'
    },
];

// Function to write mock chores to Firestore
const writeMockChores = async () => {
    const batch = db.batch();

    choreContextType.forEach(chore => {
        const choreRef = db.collection('chores').doc(chore.choreID); // Specify your collection name
        batch.set(choreRef, chore);
    });

    try {
        await batch.commit();
        console.log('Mock chores successfully written to Firestore!');
    } catch (error) {
        console.error('Error writing mock chores:', error);
    }
};

// Execute the function
writeMockChores().then(() => {
    // Optionally, close the Firebase Admin SDK connection
    admin.app().delete();
});

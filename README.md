# To-Do List Application with Firebase Firestore

This is a simple web-based To-Do List application that allows users to:
1. Add their names to a Firestore database.
2. View all added names in real-time on the page.

The application is implemented using Firebase Firestore for real-time database management.

## Features
- **Add User:** Enter a name in the input field and add it to Firestore.
- **Real-Time Updates:** The list of added users updates dynamically as users are added to Firestore.
- **Firestore Integration:** The application is connected to Firestore to store and retrieve data.

---

## Prerequisites
1. A Firebase project with Firestore enabled.
2. Basic knowledge of HTML, JavaScript, and Firebase.
3. A modern web browser that supports ES6 modules.

---

## Installation and Setup

### Step 1: Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable Firestore in the "Build > Firestore Database" section.
4. Copy your Firebase project's configuration details (API key, project ID, etc.).

### Step 2: Code Setup
1. Create a new project directory and include the following files:
   - `index.html`: The HTML structure for the app.
   - `script.js`: The JavaScript file with Firebase and Firestore logic.
2. Paste the provided code into the respective files.

### Step 3: Update Firebase Configuration
Replace the Firebase configuration object in the `script.js` file with your project's configuration:
```javascript
const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>",
  measurementId: "<YOUR_MEASUREMENT_ID>",
};
```

### Step 4: Run the Application
1. Open the `index.html` file in a browser.
2. Type a name in the input field and click "Add" to add it to Firestore.
3. View the added names in real-time below the input field.

---

## File Structure
```
project-directory/
├── index.html    # HTML structure
├── script.js     # JavaScript logic for Firebase and Firestore
```

---

## Usage
1. Open the application in a browser.
2. Enter a name in the input field.
3. Click the "Add" button.
4. The name is added to Firestore and displayed in the list dynamically.

---

## Example Code

### HTML (`index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List with Firestore</title>
  <script type="module" src="script.js"></script>
</head>
<body>
  <h1>To-Do List</h1>
  <label for="userName">Enter Name:</label>
  <input type="text" id="userName" placeholder="Enter your name">
  <button id="addButton">Add</button>

  <h2>Added Users</h2>
  <ul id="userList"></ul>
</body>
</html>
```

### JavaScript (`script.js`)
```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>",
  measurementId: "<YOUR_MEASUREMENT_ID>",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add event listener to the "Add" button
document.getElementById("addButton").addEventListener("click", async () => {
  const userName = document.getElementById("userName").value;

  if (userName.trim() === "") {
    alert("Please enter a valid name.");
    return;
  }

  try {
    // Add to Firestore with a unique ID
    await addDoc(collection(db, "users"), {
      name: userName,
      timestamp: new Date(),
    });
    alert("User added successfully!");
    document.getElementById("userName").value = ""; // Clear input
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to add to Firestore.");
  }
});

// Real-time listener to display users
const userList = document.getElementById("userList");
const usersCollection = collection(db, "users");
const q = query(usersCollection);

onSnapshot(q, (snapshot) => {
  userList.innerHTML = ""; // Clear the list before updating
  snapshot.forEach((doc) => {
    const userData = doc.data();
    const listItem = document.createElement("li");
    listItem.textContent = `${userData.name} (Added: ${userData.timestamp.toDate().toLocaleString()})`;
    userList.appendChild(listItem);
  });
});
```

---

## Troubleshooting
- **Names Not Displaying in Real-Time:** Ensure `query` and `onSnapshot` are properly imported in the `script.js` file.
- **Firestore Rules:** Make sure Firestore rules allow read and write access for testing:
  ```json
  {
    "rules": {
      "users": {
        "allow read, write": "if true"
      }
    }
  }
  ```
  (Only for testing. Update rules for production.)
- **CORS Issues:** Serve the `index.html` file using a local server (e.g., `Live Server` in VSCode).

---

## License
This project is open-source and free to use for educational purposes.


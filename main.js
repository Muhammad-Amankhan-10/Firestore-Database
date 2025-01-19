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
  apiKey: "AIzaSyAP6mJCwJTVkTHcMJg0SLRJOJXbtFsMqbM",
  authDomain: "database-c60b5.firebaseapp.com",
  projectId: "database-c60b5",
  storageBucket: "database-c60b5.firebasestorage.app",
  messagingSenderId: "182216328047",
  appId: "1:182216328047:web:a8ac594d0ddc4c33229e9a",
  measurementId: "G-N4RJL4B5C8",
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

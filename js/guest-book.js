const form = document.getElementById("guestForm");
const guestList = document.getElementById("guestList");
const savedMsg = document.getElementById("guestSaved");

// Backend API URL - update this to prod backend URL
const API_URL = "http://localhost:3000";

async function loadMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`);
    const result = await response.json();
    
    if (result.success && result.messages) {
      guestList.innerHTML = "";
      result.messages.forEach((g) => {
        const div = document.createElement("div");
        div.classList.add("glass", "p-3", "rounded-lg", "shadow", "fade-in");
        div.innerHTML = `<p class="font-serif text-gray-700">"${g.message}"</p><p class="text-sm text-right italic text-gray-600 mt-1">– ${g.name}</p>`;
        guestList.appendChild(div);
      });
    } else {
      console.error("Failed to load messages:", result.error);
      // Fallback to localStorage if API fails
      loadMessagesFromLocalStorage();
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    // Fallback to localStorage if API fails
    loadMessagesFromLocalStorage();
  }
}

function loadMessagesFromLocalStorage() {
  const saved = JSON.parse(localStorage.getItem("cloverGuests")) || [];
  guestList.innerHTML = "";
  saved.forEach((g) => {
    const div = document.createElement("div");
    div.classList.add("glass", "p-3", "rounded-lg", "shadow", "fade-in");
    div.innerHTML = `<p class="font-serif text-gray-700">"${g.message}"</p><p class="text-sm text-right italic text-gray-600 mt-1">– ${g.name}</p>`;
    guestList.prepend(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name =
    document.getElementById("guestName").value.trim() || "Anonymous";
  const message = document.getElementById("guestMessage").value.trim();
  if (!message) return;

  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });

    const result = await response.json();

    if (result.success) {
      form.reset();
      savedMsg.classList.remove("hidden");
      loadMessages();
      setTimeout(() => savedMsg.classList.add("hidden"), 2000);
    } else {
      console.error("Failed to save message:", result.error);
      alert("Failed to save message. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting message:", error);
    alert("Could not connect to server. Please check your backend is running.");
  }
});

window.addEventListener("load", loadMessages);

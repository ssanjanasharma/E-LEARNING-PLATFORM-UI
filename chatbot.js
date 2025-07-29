const form = document.getElementById("chatbot-form");
const input = document.getElementById("chat-input");
const chatbox = document.getElementById("chatbot-messages");

// Very simple bot response logic for demo (customize as needed!)
function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) return "Hi there! 👋";
  if (msg.includes("course")) return "You can find courses on the Courses page.";
  if (msg.includes("progress")) return "To view your progress, click 'My Progress' in the menu!";
  if (msg.includes("video")) return "Video lessons are available inside each course.";
  if (msg.includes("bye")) return "Goodbye! 👋";
  return "I'm just a simple demo bot. Try typing 'course', 'progress', or 'video'!";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = userMsg;
  chatbox.appendChild(userDiv);

  // Bot "typing..." simulation
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.textContent = getBotReply(userMsg);
    chatbox.appendChild(botDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 550);

  input.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
});

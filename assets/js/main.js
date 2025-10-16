// Toggle menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

// Chatbot sederhana
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatResponse = document.getElementById("chatResponse");

chatSend.addEventListener("click", () => {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  let response = "Maaf, RoboFokap belum tahu jawaban itu 😅";
  if (userMsg.toLowerCase().includes("osis"))
    response = "OSIS adalah wadah pelatihan kepemimpinan di sekolah! 💪";
  else if (userMsg.toLowerCase().includes("fokap"))
    response = "FOKAP adalah Forum OSIS Kabupaten Pekalongan, tempat OSIS dari berbagai sekolah berkolaborasi!";
  else if (userMsg.toLowerCase().includes("halo"))
    response = "Halo juga! Ada yang ingin kamu tanyakan tentang kegiatan OSIS?";
  
  chatResponse.innerHTML = `<strong>Kamu:</strong> ${userMsg}<br><strong>RoboFokap:</strong> ${response}`;
  chatInput.value = "";
});
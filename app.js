async function send(){

    const box = document.getElementById("message");
    const text = box.value;

    if(!text) return;

    addMessage("You", text);

    box.value = "";

    const response = await fetch(
        "https://teto-3.onrender.com/chat",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                text:text
            })
        }
    );

    const data = await response.json();

    addMessage("TetoAI", data.reply);

    speak(data.reply);
}

function addMessage(sender,text){

    const chat = document.getElementById("chat");

    chat.innerHTML += `
      <p><b>${sender}:</b> ${text}</p>
    `;

    chat.scrollTop = chat.scrollHeight;
}

function speak(text){

    const speech = new SpeechSynthesisUtterance(text);

    speech.pitch = 1.2;
    speech.rate = 1.0;

    speechSynthesis.speak(speech);
}

function voice(){

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    recognition.start();

    recognition.onresult = function(event){

        document.getElementById("message").value =
          event.results[0][0].transcript;
    };
}

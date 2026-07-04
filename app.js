const chat=document.getElementById("chat");

function bubble(text,who){

    const div=document.createElement("div");

    div.className="message "+who;

    div.innerHTML=text;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}

async function send(){

    const input=document.getElementById("message");

    const text=input.value;

    if(text=="") return;

    bubble(text,"user");

    input.value="";

    const response=await fetch(
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

    const data=await response.json();

    bubble(data.reply,"ai");

    speak(data.reply);

}

function speak(text){

    const speech=new SpeechSynthesisUtterance(text);

    speech.rate=1;

    speech.pitch=1.2;

    speechSynthesis.speak(speech);

}

function voice(){

    const SpeechRecognition=
    window.SpeechRecognition||
    window.webkitSpeechRecognition;

    const recognition=new SpeechRecognition();

    recognition.start();

    recognition.onresult=function(e){

        document.getElementById("message").value=
        e.results[0][0].transcript;

    };

}


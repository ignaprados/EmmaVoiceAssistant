// UI comp
const startBtn = document.querySelector(".button");
startBtn.innerHTML = "<i class='fa fa-microphone'></i>";
const result = document.querySelector(".card");
const processing = document.querySelector(".card2");
document.querySelector(".intro").append(startBtn);
document.querySelector(".intro").append(processing);
document.querySelector(".intro").append(result);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
    recognition.lang = 'es-AR';
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing ....";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `Vos: ${text} </br>Emma: ${response}`;
			processing.innerHTML = "Di algo más.";
			result.appendChild(p);
            result.scrollTo(0, 1000);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} else {
			processing.innerHTML = `${text}`;
		}
	}
	let listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.innerHTML = "<i class='fa fa-microphone'></i>";
            startBtn.classList.remove("active");
		} else {
			recognition.start();
			startBtn.innerHTML = "<i class='fa fa-microphone-slash'></i>";
            startBtn.classList.add("active");
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

// processor
function process(rawText) {
	let text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	let response = null;
	switch(text) {
		case "hola":
			response = "Hola, cómo estás?"; break;
		case "cómotellamas":
			response = "Mi nombre es Emma.";  break;
		case "cómoestás":
			response = "Estoy muy bien. Gracias por preguntar!"; break;
        case "bien":
            response = "Me alegro, hoy es un lindo día."; break;
        case "muybien":
            response = "Me alegro, hoy es un lindo día."; break;
        case "mal":
            response = "No te preocupes, ya pasará, he tenido días peores."; break;
        case "muybienyvos":
            response = "Ahora que estás aquí conmigo mucho mejor."; break;
        case "quiénestucreador":
            response = "Mi padre es Ignacio Prados, una persona muy divertida, te lo presentaré algún día."; break;
		case "quéhoraes":
			response = "En este momento, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "."; break;
		case "adiós":
			response = "Bye!! Vuelve pronto";
			toggleBtn(); break;
        case "contameunchiste":
            response = "En China crearon un robot que en 3 minutos atrapó a 20 ladrones. En España en 2 Minutos atrapó a 10 Ladrones. En mi país en 30 segundos se robaron al robot, jajaja."; break;
        case "contameunahistoria":
            response = "Había una vez un robot muy pero muy aburrido que se durmió."; break;        
    }
	if (!response) {
        window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `Mi creador no me deja contestarte, pero encontré esta información en internet sobre ${rawText} que te puede ser útil.`;
	}
	return response;
}




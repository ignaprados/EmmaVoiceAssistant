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
	result.innerHTML = "<b>Lo siento, tu navegador no soporta Speech API. Para usar a Emma, descarga la última versión de Google Chrome.<b>";
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
		case "":
			response = "Disculpa, no pude escuchar lo que dijiste, puedes repertirlo por favor?"; break;
		case "hola":
		case "holaemma":
		case "holaema":
		case "buenas":
		case "buenosdias":
		case "buendía":
		case "buenasnoches":
			response = "Hola, cómo estás?"; break;
		case "cómotellamas":
		case "cómoestunombre":
		case "cuálestunombre":
			response = "Mi nombre es Emma.";  break;
		case "cómoestás":
		case "cómoteva":
		case "cómova":
		case "holacómova":
		case "holacómoteva":
		case "holacómoestás":
			response = "Estoy muy bien. Gracias por preguntar!"; break;
        case "bien":
		case "muybien":
            response = "Me alegro, hoy es un lindo día."; break;
        case "mal":
		case "muymal":
            response = "No te preocupes, ya pasará, he tenido días peores."; break;
        case "muybienyvos":
		case "comoteencuentras":
		case "túcomoestás":
		case "voscomoestás":
            response = "Ahora que estás aquí conmigo mucho mejor."; break;
        case "quiénestucreador":
            response = "Mi padre es Ignacio Prados, una persona muy divertida, te lo presentaré algún día."; break;
		case "quéhoraes":
		case "decimelahora":
		case "dimelahora":
			response = "En este momento, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "."; break;
		case "adiós":
		case "nosvemos":
		case "chau":
		case "chao":
		case "adiósemma":
		case "nosvemosemma":
		case "chauemma":
		case "chaoemma":
			response = "Bye!! Vuelve pronto.";
			toggleBtn(); break;
        case "contameunchiste":
		case "cuentameunchiste":
		case "chiste":
		case "unchiste":
            response = "En China crearon un robot que en 3 minutos atrapó a 20 ladrones. En España en 2 Minutos atrapó a 10 Ladrones. En Argentina en 30 segundos se robaron al robot, jajaja."; break;
		case "contameotro":
		case "contameotrochiste":
		case "cuentameotrochiste":
		case "cuentameotro":
		case "otro":
		case "otrochiste":
			response = "¿Qué le dice un gusano a otro? Me voy a dar la vuelta a la manzana."; break;
        case "contameunahistoria":
            response = "Había una vez un robot muy pero muy aburrido que se durmió."; break;      
		case "dialgomás":
		case "dialgo":
		case "contamealgo":
		case "cuentamealgo":
		case "decimealgo":
		case "dimealgo":
			response = "No sé que decirte, mi vida es muy aburrida."; break;
		case "queestáshaciendo":
		case "quéestáshaciendo":
		case "quehaces":
		case "quéhaces":
			response = "Estoy tratando de entender la mente compleja de los humanos."; break;
		case "gracias":
			response = "No hay de que, fui creada para ayudarte y que tengas un buen día."; break;
		case "cómovatudía":
		case "cómofuetudía":
			response = "Excelente, me hablaron muchas personas hoy!"; break;
    }
	if (!response) {
        window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `Mi creador no me deja contestarte, pero encontré esta información en internet sobre ${rawText} que te puede ser útil.`;
	}
	return response;
}




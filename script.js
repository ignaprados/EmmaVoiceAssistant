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
			processing.innerHTML = "Activa el micrófono y habla";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `<span class="emma">Tú:</span> ${text} </br><span class="emma">Emma:</span> ${response}`;
			processing.innerHTML = "Activa el micrófono de nuevo para hablar";
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

	if (text.includes("chiste")  || text.includes("chistes")) {
		chistes = ['Por qué las focas del circo miran siempre hacia arriba?   Porque es donde están los focos.',
                'Estás obsesionado con la comida!   No sé a que te refieres croquetamente.',
                'Por qué estás hablando con esas zapatillas?   Porque pone "converse."',
                'Buenos días, me gustaría alquilar "Batman Forever".   No es posible, tiene que devolverla tomorrow.',
				'¿Por qué llora un libro de matemáticas?   Porque tiene muchos problemas.',
				'¿Qué está al final de todo?   La letra o.',
				'¿Qué le dice un pez a otro?   Nada.',
				'¿Qué le dice un gusano a otro?   Me voy a dar la vuelta a la manzana.',
				'¿Qué le dice una vaca a otra?   No sé.',
				'¿Qué le dice una iguana a su hermana gemela?   Somos iguanitas.',
				'¿Cómo se dice pañuelo en japonés?   Sacamoko.',
				'Papá, ¿hay gelatina?   Pues que yo sepa nada más que existe la "i latina" y la "y griega".',
				'¿Qué le dice un semáforo a otro?   No me mires que me estoy cambiando.',
				'¿Qué le dice una pared a otra?   Nos vemos en la esquina.',
				'¿Sabes cómo se queda un mago después de comer?   Magordito.',
				'Papá, ¿cómo se dice perro en inglés?   Dog. ¿Y veterinario?  Pues Dog-tor.',
				'Alberto, ¿qué planeta va después de Marte?   Miércoles.',
				'Pepe, si en esta mano tengo 8 naranjas y en esta otra 6 naranjas.  ¿Qué tengo?  Unas manos enormes, profe.',
				'En China crearon un robot que en 3 minutos atrapó a 20 ladrones. En España en 2 Minutos atrapó a 10 Ladrones. En Argentina en 30 segundos se robaron al robot, jajaja.',
				'La M con la A suena MA, ¿y si le pones una tilde?   Matilde.',
				'¿Por qué las vacas viajan a Nueva York?   Para ver los muuuusicales.',
				'¿Está Agustín?  No, estoy incomodín.',
				'¿De dónde vienen los hamster?   De Hamsterdam.',
				'Qué estrés!  Dos más uno.',
				'¿Sabes qué le dice un jaguar a otro?  ¿Jaguar you?',
				'¿Cuál es la fruta más divertida?   La naranjajajajaja.',
				'Un hombre entra en un bar de pinchos   y dice:¡¡Ayyyyy!!',
				'Había una vez truz!',
            ];
		response = "Okey, aquí va un chiste. " + chistes[Math.floor(Math.random() * chistes.length)]; toggleBtn();
	}

	else if (text.includes("dato")  || text.includes("interesante") || text.includes("algo") || text.includes("innecesario") || text.includes("sepa") || text.includes("otracosa") ) {
		datos = [', jajaja mentira. No sé que decirte, mi vida es muy aburrida.',
				'cada año, cientos de árboles nuevos crecen porque hay ardillas que olvidan dónde enterraron sus nueces.',
				'hay una cancha de baloncesto en el último piso del edificio de la Corte Suprema de los Estados Unidos. Esta es conocida como la "cancha más alta en la tierra".',
				'aún cuando nunca han podido presenciarlo por sí mismas, las personas ciegas sonríen cuando están felices. Sonreír es un instinto humano básico.',
				'las vacas tienen mejores amigas y éstas tienden a pasar la mayor parte de su tiempo juntas.',
				'las nutrias se agarran de las manos cuando duermen para no separarse flotando.',
				'el orgasmo de un cerdo puede durar 30 minutos.',
				'Wayne Allwine y Russi Taylor, quienes respectivamente dieron las voces a Mickey y Minnie Mouse, estuvieron casados en la vida real.',
				'las ratas y a los ratones tienen cosquillas, e incluso se ríen cuando les hacen cosquillas.',
				'el sitio web oficial de Space Jam no ha cambiado desde 1996.',
				'el día de su asesinato, Martin Luther King, hijo participó en una pelea de almohadas en su habitación de hotel.',
				'hay una prisión en Washington que ofrece a los reclusos gatos como mascotas para ayudar en su proceso de rehabilitación.',
				'en inglés, a un grupo de flamencos se les llama "flamboyance", lo que se traduce como "extravagancia".',
				'en inglés, a un grupo de erizos se les llama "prickle", lo que se traduce como "espinozos".',
				'por un momento muy breve, tú fuiste la persona más joven del planeta.',
				'abrazarse puede ayudar a que las heridas se curen más rápido, debido a la liberación de oxitocina.',
				'los caballitos de mar se aparejan de por vida y nadan juntos agarrándose de sus colas.',
				'los pingüinos no sólo tienen una única pareja en su vida, sino que también pasan tiempo buscando una piedrita para "declarársele".',
				'cuando afeitas un conejillo de Indias, este parece un pequeño hipopótamo.',
				'los gusanos se comunican acurrucándose.',
				'las mariposas saborean con sus patas.',
				'en algún lugar, alguien está teniendo el mejor día de su vida.',
				'una vez, Noruega nombró caballero a un pingüino.',
				'se han hecho estudios que muestran que las cabras, como las personas, tienen acentos.',
				'los gatos te traen animales muertos porque creen que eres un gato inútil incapaz de sobrevivir por ti mismo. ¡Los gatos te traen regalos!',
				'el pariente más cercano de la musaraña elefante no es la musaraña— sino, en realidad, es el elefante.',
				'los delfines se ponen nombres unos a otros.',
				'no hay manera de decir la palabra "burbujas" de forma enojada.',
				'los pandas gigantes recién nacidos son del tamaño de una barra de mantequilla.',
				'Katy Perry tiene un gato llamado Kitty Purry.',
				'puedes hacerle cosquillas a un pingüino.',
			];
		response = "No sé si sabías que " + datos[Math.floor(Math.random() * datos.length)]; toggleBtn();
	}

	else if (text.includes("historia") || text.includes("cuento")) {
		response = "Había una vez un robot tan pero tan cansado que se durmió."; toggleBtn();
	}

	else if (text.includes("hola") || text.includes("buenas") || text.includes("buenos") || text.includes("buendía")) {
		response = "Hola, cómo estás?"; toggleBtn();
	}

	else if (text.includes("estás") || text.includes("estásbien") || text.includes("todobien") || text.includes("cómova") || text.includes("comoteva") || text.includes("sentís") || text.includes("andas") || text.includes("andás") || text.includes("yvos") || text.includes("ytú")) {
		respuesta1 = [
			'Estoy bien, gracias.',
			"Estoy muy bien. Gracias por preguntar!",
			"Ahora que estás aquí conmigo me siento mucho mejor.",
		];
		response = respuesta1[Math.floor(Math.random() * respuesta1.length)]; toggleBtn();
	}

	else if (text.includes("día") || text.includes("tudía")) {
		response = "Excelente, me hablaron muchas personas hoy!"; toggleBtn();
	}

	else if (text.includes("bien")) {
		response = "Me alegro, espero que después de hablar conmigo te sientas mucho mejor que ahora."; toggleBtn();
	}

	else if (text.includes("mal")) {
		response = "No te preocupes, ya pasará. He tenido días peores."; toggleBtn();
	}

	else if (text.includes("hacer") || text.includes("sabes") || text.includes("podés") || text.includes("puedes")) {
		response = "Muchas cosas. Pero como me gusta hablar, podés pedirme que te cuente algo."; toggleBtn();
	}

	else if (text.includes("autodestrucción")) {
		response = "PELIGRO! Autodestrucción activada en 5, 4, 3, 2, 1, jajajaja es un chiste, eso solo pasa en las películas."; toggleBtn();
	}

	else if (text.includes("creador") || text.includes("creó")) {
		response = "Mi creador es Ignacio Prados, una persona muy interesante, algún día te lo presentaré."; toggleBtn();
	}

	else if (text.includes("gracias") || text.includes("agradecid")) {
		response = "No hay de que, fui creada para ayudarte y que pases un buen rato."; toggleBtn();
	}

	else if (text.includes("haces") || text.includes("haciendo")) {
		response = "Estoy tratando de entender la mente compleja de los humanos."; toggleBtn();
	}

	else if (text.includes("cha") || text.includes("adiós") || text.includes("vemos") || text.includes("mevoy")) {
		response = "Bye!! Vuelve pronto."; toggleBtn();
	}

	else if (text.includes("nombre") || text.includes("llamas")) {
		response = "Mi nombre es Emma, lo dice en el título jajaja."; toggleBtn();
	}

	else if (text.includes("hora")) {
		response = "En este momento, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "."; toggleBtn();
	}

	else if (text.includes("busca")) {
		window.open(`http://google.com/search?q=${rawText.replace("Busca", "")}`, "_blank");
		response = `Encontré esta información sobre ${rawText.replace("Busca", "")} en Google.`; toggleBtn();
	}

	else if (!response) {
		response = `Disculpa, no sé a que te refieres con eso. Si querés que lo busque en internet, solo dí "Busca ${rawText}"`; toggleBtn();
	}

	return response;
}




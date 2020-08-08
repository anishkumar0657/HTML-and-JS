const talk = document.querySelector(".talk");
const content = document.querySelector(".content");
const listening = document.querySelector(".listen");

//get the SpeechRecognition API from the windows
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//create an object of SpeechRecognition API
const recognition = new SpeechRecognition();

//implement on start function
recognition.onstart = () => {
    content.value= "";
    listening.textContent = 'Listening.....';
}

//implement the onresult function
recognition.onresult = (event=>{
    //console.log(event);
    listening.textContent = "";
    //get the index of the result stored in the results array
    const resultIndex = event.resultIndex;
    //get the actual transcripted data from the results array
    const transcript = event.results[resultIndex][0].transcript;
    //display the content in the header that is defined in HTML file
    content.value =transcript;

    //pass the transcript to the speak method so that it can speak aloud
    speak(transcript);
});

//create a click action event on the button
talk.addEventListener('click', ()=>{
    console.log("clicked");
    //start the recognition system
    recognition.start();
});

//use speech synthesys uttrerance to make the browser speak aloud.
function speak(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume =1;
    //pass the SpeechSynthesisUtterance object to the windows speech API so that it talks back
    window.speechSynthesis.speak(speech);
}
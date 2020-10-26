document.addEventListener('DOMContentLoaded', () => {
    const icon = document.querySelector('i.fas.fa-microphone')
    let paragraph = document.createElement('p')
    let container = document.querySelector('.text-box')

    let transcript = ''
    let listening = false


    container.appendChild(paragraph)
    const sound = document.querySelector('.sound')
    const voices = speechSynthesis.getVoices();

    window.SpeechRecognition = webkitSpeechRecognition || window.SpeechRecognition
    const synth = window.speechSynthesis

    recognition = new SpeechRecognition()
    recognition.interimResults = true

    icon.addEventListener('click', () => {
        sound.play();
        dictate()
    })

    const dictate = () => {
        recognition.start()
        recognition.onresult = (event) => {
            console.log(event)
            const speechToText = Array.from(event.results)
            .map(result =>result[0])
            .map(result =>result.transcript)
            .join (' ')
            console.log(speechToText)
            paragraph.textContent = speechToText

            if(event.results[0].isFinal) {
                paragraph = document.createElement('p')
                container.appendChild(paragraph)

                speak()
            }

        }

    }

    const speak = () => {
        const utterThis = new SpeechSynthesisUtterance('this is amazing')
        utterThis.voice = getVoiceUsingName('Google UK English Male')
        synth.speak(utterThis)
    }

    const getVoiceUsingName = (name) => {
        let foundVoice = null
        voices.forEach(function (voice, index) {
            if (voice.name === name) {
              foundVoice = voice;
            }
        });
        return foundVoice
    }
})
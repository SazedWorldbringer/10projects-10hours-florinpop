const quizData = [
    {
        question: 'How many Shards are there?',
        a: '103',
        b: '5',
        c: '16',
        d: '27',
        correct: 'c'
    }, {
        question: 'Which of the following is a Scholar?',
        a: 'Kelsier',
        b: 'Vasher',
        c: 'Tonk Fah',
        d: 'OreSeur',
        correct: 'b'
    }, {
        question: 'What is the name of the geographic feature that causes the Reod?',
        a: 'Lake Alonoe',
        b: 'The Crack',
        c: 'Kalomo River',
        d: 'The Chasm',
        correct: 'd'
    }, {
        question: 'What is the meaning of the Aon "Rao"?',
        a: 'Spirit',
        b: 'Bravery',
        c: 'Strength',
        d: 'Wisdom',
        correct: 'a'
    }, {
        question: 'Who taught Kelsier Allomancy?',
        a: 'Vin',
        b: 'Gemmel',
        c: 'Sarene',
        d: 'Vasher',
        correct: 'b'
    }
]

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const aText = document.getElementById('a-text')
const bText = document.getElementById('b-text')
const cText = document.getElementById('c-text')
const dText = document.getElementById('d-text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    aText.innerText = currentQuizData.a
    bText.innerText = currentQuizData.b
    cText.innerText = currentQuizData.c
    dText.innerText = currentQuizData.d
}
loadQuiz()

function getSelected() {
    let  answer = undefined

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false
    })
}

submitBtn.addEventListener('click', () => {
    // Check to see the answer
    const answer = getSelected()

    console.log(answer)

    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        };

        currentQuiz++
        if (currentQuiz === quizData.length - 1) {
            loadQuiz()
            submitBtn.textContent = 'Submit'
        } else if(currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
                <h2 class="result">You answered ${score} questions correctly out of ${quizData.length}</h2>
                <button class="btn" onclick="location.reload()">Reload Quiz</button>
            `
        }
    }   
})
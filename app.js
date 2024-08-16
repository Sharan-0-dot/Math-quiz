const Base_URL = "https://opentdb.com/api.php?amount=10&category=19&type=multiple";

const question = document.querySelector("#question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const st_quiz = document.querySelector("#st-quiz");
const next = document.querySelector("#next-question");
let questions;
let count = 0;

const Screen_options = [option1, option2, option3, option4];

st_quiz.addEventListener("click",() => {
    Start();
    default_border();
})
next.addEventListener("click", () => {
    if(count < 10) {
        getQuestion(questions,count)
        default_border();
        count++;
    } else {
        count = 0;
        Start();
    }
})

const default_border = () => {
    Screen_options.forEach((option) => {
        option.style.border = "1px solid grey";
    })
}

const Start = async () => {

    let response = await fetch(Base_URL);

    let data = await response.json();

    questions = data.results;

    getQuestion(questions,count);
    console.log("Executed");
}



const getQuestion = (questions,count) => {
    let Api_options = questions[count].incorrect_answers;
    Api_options.push(questions[count].correct_answer);
    Api_options = shuffleOptions(Api_options);

    question.textContent = questions[count].question;
    for(let i=0;i<4;i++) {
        Screen_options[i].innerText = Api_options[i];
    }
    
    Screen_options.forEach((option) => {
        option.addEventListener("click", () => {
            if(option.innerText == questions[count].correct_answer) {
                option.style.border = "2px solid green";
            } else {
                option.style.border = "2px solid red";
            }
        })
    })
}

const shuffleOptions = (options) => {
    let shuffledOptions = [];
    let usedIndexs = [];

    let i=0;
    while(i<options.length) {
        let Number = Math.floor(Math.random() * options.length);
        if(!usedIndexs.includes(Number)) {
            shuffledOptions.push(options[Number]);
            usedIndexs.push(Number);
            i++;
        }
    }
    return shuffledOptions;
}
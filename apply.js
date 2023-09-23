let btnStart = document.getElementById("btnstart");
let sec1 = document.querySelector(".sec1");
let sec2 = document.querySelector(".sec2");
let quetions = document.querySelector(".movefromlevels");
let texttitle = document.querySelector(".nameque");
let optionbtn = document.querySelector(".option");
let btnnext = document.querySelector('.nextque');
let quizinfo = document.querySelector('.quizinfo .data');
let quizscore = document.querySelector('.quizinfo .score');
let tryAgain = document.querySelector('.score button')

let currentindex = 0;
let currentchoies ;
let score = 0 ;

btnStart.addEventListener("click",()=>{
    sec1.classList.toggle('active');
    sec2.classList.toggle('active');
    getQuestions();
    
})
tryAgain.onclick = ()=>{
    sec1.classList.toggle('active');
    sec2.classList.toggle('active');
    location.reload();
}

function getQuestions(){
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let data = JSON.parse(this.responseText);
            
            
            adddata(data[currentindex]);
            movefromquestion(data.length);
            
            let alllevels = document.querySelectorAll(".movefromlevels div");       
            
            
            btnnext.onclick = ()=>{

                if(currentindex == (data.length-1) ){
                    let rigthAnswer = data[currentindex]["correct_answer"];
                    checkcorrectanswer(rigthAnswer, alllevels,data.length);

                    quizinfo.innerHTML = '';
                    quizscore.classList.toggle('active')
                    finalscore = document.createElement("p");
                    finalscore.className = 'score';
                    finalscore.innerHTML = score*10;
                    quizscore.append(finalscore)
                    
                }
                else{
                    let rigthAnswer = data[currentindex]["correct_answer"];
                    checkcorrectanswer(rigthAnswer, alllevels, data.length);

                    texttitle.innerHTML = '';
                    optionbtn.innerHTML = '';
                    adddata(data[currentindex]);
                    
                    
                }
                
            }
            
        }
    }
    myRequest.open("GET","data.json",true);
    myRequest.send();
}



function adddata(data) {
    let title = document.createElement("p");
    texttitle.appendChild(title.appendChild(document.createTextNode(data["title"])));

    let optionsbutton;
    for (let i = 0; i < 4; i++) {
        optionsbutton = document.createElement("button");
        optionsbutton.className = 'optionbtn';
        optionsbutton.appendChild(document.createTextNode(data["answer"][i]))
        optionbtn.appendChild(optionsbutton);
    }
    ///click button 
    let btn = document.querySelectorAll(".optionbtn");
    for (let index = 0; index < btn.length; index++) {
        btn[index].addEventListener("click", () => {

            currentchoies = data["answer"][index];

            for (let i = 0; i < btn.length; i++) {
                if(i != index){
                    btn[i].disabled = true;
                    btn[index].style.color = "white"
                    btn[index].style.backgroundColor = 'rgba(250, 171, 0, 0.778)';
                    // console.log(i);
                }
            }

        })

    }
}


function checkcorrectanswer(rigthAnswer,alllevels,len) {

    if (currentchoies == rigthAnswer) {
        score++;
        if (currentindex != len) {
            alllevels[currentindex].className = 'rigth';
        }
    } else {
        alllevels[currentindex].className = 'wrong';
    }

    currentindex++;
    if (currentindex != len) {
        alllevels[currentindex].className = 'one';
    }
    console.log(score);

}

function movefromquestion(num){
    for(let i=0;i<num;i++){
        question = document.createElement("div");
        question.className = 'que';
        if(i === 0){
            question.className = 'one';
        }
        quetions.append(question);
    }
}



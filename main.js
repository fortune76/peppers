class Game{
    constructor(){
        this.buttonTrue = document.getElementById("button_true")
        this.buttonFalse = document.getElementById("button_false")
        this.buttonStart = document.getElementById("button_start")
        this.buttonFinish = document.getElementById("button_finish")
        this.colorList = ['green', 'red', 'black', 'blue', 'orange']
        this.textList = ['Зеленый', 'Красный', 'Черный', 'Синий', 'Оранжевый']
        this.answerValue = 200
        this.buttonTrue = document.getElementById("button_true")
        this.buttonFalse = document.getElementById("button_false")
        this.buttonStart = document.getElementById("button_start")
        this.buttonFinish = document.getElementById("button_finish")
        this.timerSeconds = 60
        this.allAnswers = 0
        this.trueAnswers = 0
        this.pointsScore = 0
        this.streak = 1
        this.colorArr = document.getElementsByClassName('playcard')
        this.score = document.getElementsByClassName('score')
        this.streakScore = document.getElementsByClassName('streak')
        this.buttonStart.addEventListener('click', (event) => {
            setInterval(() => {
                this.timer();
             }, 1000)
            this.workWithClassHTML('hidden', 'start')
            this.workWithClassHTML('active', 'game')
        })
        this.buttonFinish.addEventListener('click', (event) => {
            document.location.reload()
        })
        this.game()
    }

    randColor(){
        return Math.floor(Math.random() * this.colorList.length)
    }
    
    randText(){
        return Math.floor(Math.random() * this.textList.length)
    }
    
    makeNewQuestion(){
        this.colorArr[0].style.color = this.colorList[this.randColor()]
        this.colorArr[1].style.color = this.colorList[this.randColor()]
        this.colorArr[0].textContent = this.textList[this.randText()]
        this.colorArr[1].textContent = this.textList[this.randText()]
    }

    checkAnswer(){
        let text = this.colorArr[0].textContent
        if (this.colorList[this.textList.indexOf(text)] === this.colorArr[1].style.color){
            return true
        }else{
            return false
        }
    }

    workWithClassHTML(type, className){
        // добавление/удаление классов html
        if (type === 'active'){
            document.getElementsByClassName(className)[0].classList.remove('hidden_element')
            document.getElementsByClassName(className)[0].classList.remove('hidden_answer')
            document.getElementsByClassName(className)[0].classList.add('active')
        }else if(type ==='hidden_answer'){
            document.getElementsByClassName(className)[0].classList.remove('active')
            document.getElementsByClassName(className)[0].classList.add('hidden_answer')
        }
        else{
            document.getElementsByClassName(className)[0].classList.remove('active')
            document.getElementsByClassName(className)[0].classList.add('hidden_element')
        }
    }

    checkFinish(){
        if (this.timerSeconds < 1){
            this.workWithClassHTML('hidden', 'game')
            document.getElementsByClassName('game_window')[0].style.backgroundImage = 'none'
            document.getElementById('finish_text').innerHTML = 'Тренировка завершена!' + '<br/>' + `Текущий счет: ${this.pointsScore}` + '<br/>' + `\
            Верных ответов: ${this.trueAnswers} из ${this.allAnswers}` + '<br/>' + `Точность ответов: ${((this.trueAnswers / this.allAnswers) * 100).toFixed(2)}%`
            this.workWithClassHTML('active', 'finish')
        }
    }

    timer(){
        if (this.timerSeconds > 1){
            this.timerSeconds -= 1
            document.getElementsByClassName('timer')[0].textContent = `Время: ${this.timerSeconds}`
        }else{
            this.timerSeconds -= 1
            document.getElementsByClassName('timer')[0].textContent = 'Время вышло'
        }
    }
    
    correct_answer(){
        this.trueAnswers += 1
        this.allAnswers += 1
        this.pointsScore += this.answerValue * this.streak
        this.score[0].textContent = `Очки: ${this.pointsScore}`
        this.streak += 1
        this.streakScore[0].textContent = `Бонус: ${this.streak}`
        this.workWithClassHTML('active', 'correct_answer')
        this.makeNewQuestion()
        setTimeout(this.workWithClassHTML, 100, 'hidden_answer', 'correct_answer')    
    }

    wrong_answer(){
        this.allAnswers += 1
        if (this.streak > 1){
            this.streak = 1
        }
        this.streakScore[0].textContent = `Бонус: ${this.streak}`
        this.pointsScore -= (this.pointsScore > 0) ? 200 : 0
        this.score[0].textContent = `Очки: ${this.pointsScore}`
        this.workWithClassHTML('active', 'wrong_answer')
        this.makeNewQuestion()
        setTimeout(this.workWithClassHTML, 100, 'hidden_answer', 'wrong_answer')
    }
    
    game(){
        this.makeNewQuestion()
        this.buttonTrue.addEventListener('click', (event) => {
            if(this.checkAnswer()){
                this.correct_answer()
            }else{
                this.wrong_answer()
            }
            this.checkFinish()
          })
        
        this.buttonFalse.addEventListener('click', (event) => {
            if (!this.checkAnswer()){
                this.correct_answer()
            }else{
                this.wrong_answer()
            }
            this.checkFinish()
          })
        }
    
}

function start(){
    let game = new Game()
}

start()
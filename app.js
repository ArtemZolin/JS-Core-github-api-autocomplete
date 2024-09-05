function debounce(fn, ms) {
    let timer;
    return function (...arg) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arg)
        }, ms)
    }
}

//объявление переменных
let request = ' '
let input = document.querySelector('.input')
let ul = document.querySelector('.redux')
let reduxAction = document.querySelector('.redux-action')
let elms = [];

// отслеживание клика в инпуте и запуск поиска
function start() {

    input.addEventListener('keyup', debounce(function (event) {
        request = this.value
        if (request.length > 0 && request != ' ') {
            ul.innerHTML = '';
            github(request)
        } else {
            ul.innerHTML = '';
        }
    }, 500))
}
start()

function newElementLiRedux(data){
    elms = [];
    for (let i = 0; i < data.items.length && i < 5; i++) {// цикл записи 5 объектов и создание из них выпадающего списка
       
        let elm = {};
        elm.name = data.items[i].name;
        elm.owner = data.items[i].owner.login;
        elm.stars = data.items[i].stargazers_count;
        elms.push(elm);

        let newElement = document.createElement('LI');// создание выпадающего списка
        newElement.classList = "li-redux"
        ul.appendChild(newElement);
        newElement.innerHTML = data.items[i].name;
    }
    if(elms.length==0){
        alert('Репозиторий с таким именем нет, проверьте правильность ввода')
    }
    console.log(elms)
}

function newElementLiReduxAction(){

    let liRedux = document.querySelectorAll('.li-redux')
    for (let i = 0; i < liRedux.length; i++) {// обработка клика на первый список и добавление в нижний список
        liRedux[i].addEventListener("click", function () {
            console.log(elms[i].name)

            let newElement = document.createElement('LI');
            newElement.classList = "li-redux-action"
            reduxAction.appendChild(newElement);

            let newElementDiv1 = document.createElement('DIV');
            newElement.appendChild(newElementDiv1)
            newElementDiv1.innerHTML = `Name: ${elms[i].name}`;

            let newElementDiv2 = document.createElement('DIV');
            newElement.appendChild(newElementDiv2)
            newElementDiv2.innerHTML = `Owner: ${elms[i].owner}`;

            let newElementDiv3 = document.createElement('DIV');
            newElement.appendChild(newElementDiv3)
            newElementDiv3.innerHTML = `Stars: ${elms[i].stars}`;

            let newElementButton = document.createElement('BUTTON');
            newElementButton.classList = "button-close"
            newElement.appendChild(newElementButton)

             buttonClose()

            let dellInput = document.querySelector('.input')
            dellInput.value=''
            ul.innerHTML = '';
            
        });
    }
}
function buttonClose(){
    let buttonClose = document.querySelectorAll('.button-close')
    console.log('buttonClose')
    let a =  document.querySelectorAll('.li-redux-action')
    for (let i = 0; i < buttonClose.length; i++) {// обработка клика и удаление позиции
        buttonClose[i].onclick = fn
        function fn (){
            
            console.log(a[i])
            a[i].parentElement.removeChild(a[i])
            console.log('click buttonClose')
        }
    }
}
async function github(g) {// функция поиска
    const url = `https://api.github.com/search/repositories?q=${g}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
  
    await newElementLiRedux(data)
    await newElementLiReduxAction()
    

}

// находит одного пользователя dfvfde

// selectors
const scoreboard = document.querySelector('.scoreboard')
const container_DIV = document.querySelector('.container')

// variables
let userScore = 0
const cards = []
let firstCard = null
let secondCard = null
let lock = false
    // event listeners
document.addEventListener('click', function(e) {
    console.log(userScore);
    const elementName = e.target.dataset.name

    if (e.target.classList.contains('item') && !lock) {
        if (/blank/g.test(e.target.getAttribute('src'))) {
            e.target.setAttribute('src', `images/${elementName}.png`)
        } else {
            e.target.setAttribute('src', 'images/blank.png')
        }

        // burada seçimleri birazdan kullanmak için değişkenlere atadık
        if (!firstCard) {
            firstCard = e.target
        } else {
            secondCard = e.target
        }

        // kartları karşılaştırmak
        if (firstCard && secondCard) {
            if (firstCard.dataset.name === secondCard.dataset.name) {
                userScore += 1
                lock = true
                alerter('win')
            } else {
                lock = true
                alerter('lose')
            }
        }
    }
})

// functions
function createCards() {
    const items = {
        0: ['cheeseburger', 'cheeseburger'],
        1: ['fries', 'fries'],
        2: ['hotdog', 'hotdog'],
        3: ['ice-cream', 'ice-cream'],
        4: ['milkshake', 'milkshake'],
        5: ['pizza', 'pizza']
    }

    while (cards.length < 12) {
        const number = Math.floor(Math.random() * 6)
        if (items[number].length > 0) {
            cards.push(items[number].shift())
        }
    }
}

function loadCards() {
    for (let i of cards) {

        let htmlElem = document.createElement('img')
        htmlElem.classList.add('item')
        htmlElem.setAttribute('data-name', i)
        htmlElem.setAttribute('src', `images/${i}.png`)
        container_DIV.appendChild(htmlElem)
    }
}

function hideAllCards() {
    for (let i of container_DIV.children) {
        i.setAttribute('src', 'images/blank.png')
    }
}

function alerter(situation) {
    if (situation == 'win') {
        container_DIV.style.borderColor = 'greenyellow'
        setTimeout(function() {
            container_DIV.style.borderColor = 'white'
            firstCard.style.visibility = 'hidden'
            secondCard.style.visibility = 'hidden'
            firstCard = null
            secondCard = null
            lock = false
        }, 1000)

        if (userScore == 6) {
            scoreboard.innerHTML = 'you win'
            setTimeout(() => {
                location.reload()
            }, 1500);
        }
    } else {
        container_DIV.style.borderColor = 'red'
        setTimeout(function() {
            container_DIV.style.borderColor = 'white'
            const firstStr = firstCard.dataset.name
            const secondStr = secondCard.dataset.name
            firstCard.setAttribute('src', `images/blank.png`)
            secondCard.setAttribute('src', `images/blank.png`)
            firstCard = null
            secondCard = null
            lock = false
        }, 1000)
    }
}

// calling functions
createCards()
loadCards()
hideAllCards()
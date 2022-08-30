function allPlayers(data) {
  JSON.stringify(data)
  const article = document.createElement('article')
  // create article
  article.innerHTML = ` 
              <div class="card_head">
                <img src="${data.img} " alt="" />
              </div>
              <div class="card_body">
                <div class="card_info">
                  <h1>
                   ${data.name}
                  </h1>
                </div>
                <div class="card_dutration">
                  <ul>
                    <li>
                      <span><i class="far fa-futbol"></i></span>
                      <span>${data.goal} Goals</span>
                    </li>
                    <li>
                      <span><i class="far fa-parachute-box"></i></span>
                      <span>${data.assist}  Assist</span>
                    </li>
                  </ul>
                </div>
                <div class="card_btn">
                  <button id=btn-${data.id}  class="c-btn">Select</button>
                </div>
              </div>
             `
  return playersDiv.appendChild(article)
}

// display all plyaer
function showPlayer() {
  for (let i = 0; i < players.length; i++) {
    const element = players[i]
    allPlayers(element)
  }
}
showPlayer()

// get value
function getValue(id) {
  const getVal = parseInt(document.querySelector(id).value)
  return getVal
}

// set value
function setData(value, setValue) {
  const newSetValue = document.querySelector(setValue)
  newSetValue.innerHTML = value
}

// add list items
let count = 1
const btn = document.querySelector('.match_list')
btn.addEventListener('click', (e) => {
  for (const x of players) {
    // crete dynamic id
    const id = 'btn-' + x.id

    // check plyer id
    if (e.target.id == id) {
      const li = document.createElement('li')
      li.innerText = `${count < 10 ? '0' + count++ : count++}. ${x.name}`

      // add max 5 player
      const addMax5 = playersAdd.childNodes.length
      if (addMax5 < 5) {
        playersAdd.appendChild(li)
        e.target.setAttribute('disabled', '')
        e.target.style.cursor = 'not-allowed'
        e.target.innerText = 'Selected'
        e.target.setAttribute('class', 'c-btn activebtn')
        return false
      } else {
        return alert('Maximum 5 playars you can add')
      }
    }
  }
})

// calculate player ammount
plyerCalculate.addEventListener('click', () => {
  const list = playersAdd.childElementCount
  if (list <= 0) {
    alert('add plyer first')
    return false
  }
  const plyerExpenses = parseInt(plyerBudget.value)
  if (!isNaN(plyerExpenses) && plyerExpenses > 0) {
    const total = list * plyerExpenses
    setData(total, '.setPlayerBudget')
  } else {
    alert('fill the plyer Ammount')
    return setData('00', '.setPlayerBudget')
  }
})

// calculate final ammount
finalCalculate.addEventListener('click', () => {
  // check add player
  const list = playersAdd.childElementCount
  if (list <= 0) {
    alert('add plyer first')
    return false
  }

  // check input player ammount
  const playerExpenseString = document.querySelector('.setPlayerBudget')
    .innerText
  const playerExpense = parseInt(playerExpenseString)
  if (playerExpense <= 0) {
    alert('please add ammount')
    return false
  }

  // check manager ammout
  const managerValue = getValue('.manager-budget')
  if (managerValue >= 0 && !isNaN(managerValue)) {
    managerValue
  } else {
    alert('Please fill Manager Ammount')
    setData('00', '.total-ammount')
    return false
  }

  // check coach ammount
  const coachValue = getValue('.coach-budget')
  if (coachValue >= 0 && !isNaN(coachValue)) {
    coachValue
  } else {
    alert('Please fill Coach Ammount')
    setData('00', '.total-ammount')
    return false
  }

  // final update
  const final = managerValue + coachValue + playerExpense

  setData(final, '.total-ammount')
})

// The end

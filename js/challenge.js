const getById = (id) => document.getElementById(id)

document.addEventListener('DOMContentLoaded', () => {
  const counter = getById('counter')
  const plusBtn = getById('plus')
  const minusBtn = getById('minus')
  const heartBtn = getById('heart')
  const pauseBtn = getById('pause')
  const commentBtn = getById('submit')
  const commentForm = getById('comment-form')
  const btnList = [plusBtn, minusBtn, heartBtn, commentBtn]

  counter.textContent = 0
  counter.setAttribute('data-paused', 'false')
  let count = 0

  setInterval(() => {
    if(counter.getAttribute('data-paused') === 'false') {
      count++
      counter.textContent = count
    }
  }, 1000);

  plusBtn.addEventListener('click', () => {
    count++
    counter.textContent = count
  })

  minusBtn.addEventListener('click', () => {
    count--
    counter.textContent = count
  })

  heartBtn.addEventListener('click', () => likeNum(counter))
  pauseBtn.addEventListener('click', (e) => pause(counter, btnList, e.target))
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addComment()
  })
})

function likeNum(counter) {
  const likeList = document.querySelector('.likes')
  if(getById('like' + counter.textContent) !== null) {

    const numLi = getById('like' + counter.textContent)
    numLi.setAttribute('data-likes', parseInt(numLi.getAttribute('data-likes')) + 1)
    numLi.textContent = `${numLi.id.slice(4)} has been liked ${numLi.getAttribute('data-likes')} times.`
  } else {
    const numLi = document.createElement('li')
    const numsList = [...likeList.children]
    numLi.id = 'like' + counter.textContent
    numLi.setAttribute('data-likes', 1)
    numLi.textContent = `${counter.textContent} has been liked 1 time.`

    numsList.push(numLi)
    numsList.sort((a, b) => parseInt(a.id.slice(4)) > parseInt(b.id.slice(4)))

    likeList.replaceChildren(...numsList)
  }
}

function pause(counter, btnList, pauseBtn) {
  if(counter.getAttribute('data-paused') === 'false') {
    counter.setAttribute('data-paused', 'true')
    btnList.forEach(btn => {
      btn.disabled = true
    })
    pauseBtn.textContent = 'resume'
  } else {
    counter.setAttribute('data-paused', 'false')
    btnList.forEach(btn => {
      btn.disabled = false
    })
    pauseBtn.textContent = 'pause'
  }
}

function addComment() {
  const commentList = getById('list')
  const commentBox = getById('comment-input')

  const newComment = document.createElement('div')
  newComment.textContent = commentBox.value
  commentList.append(newComment)
  commentBox.value = ''
}
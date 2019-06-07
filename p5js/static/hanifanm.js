window.onload = function () {

  function createImgElement() {
    let el = document.createElement('img')
    el.style.position = 'absolute'
    el.style.right = '50px'
    el.style.height = '80px'
    el.style.width = '80px'
    el.style.cursor = 'pointer'
    el.addEventListener('mouseover', function () {
      el.style.opacity = '0.8'
    })
    el.addEventListener('mouseout', function () {
      el.style.opacity = '1'
    })
    document.body.appendChild(el)
    return el
  }

  let home = createImgElement()
  home.src = 'https://hanifanm.github.io/p5js/static/home.png'
  home.style.bottom = '400px'
  home.addEventListener('click', function(){
    window.open('https://hanifanm.github.io', '_blank')
  })

  let refresh = createImgElement()
  refresh.src = 'https://hanifanm.github.io/p5js/static/refresh.png'
  refresh.style.bottom = '500px'
  refresh.addEventListener('click', function(){
    window.location.reload()
  })

}
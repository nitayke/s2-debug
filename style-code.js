document.querySelectorAll('.concept').forEach(item => {
    item.addEventListener('click', event => {
      item.classList.toggle('active')
    })
  })
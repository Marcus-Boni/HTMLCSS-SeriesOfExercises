function scroll () {
    if (window.scrollY > 0) {
        window.scrollTo(0, 0)
    }
}
window.addEventListener('scroll', scroll)

let open = document.querySelector('.category_img')
let category = document.querySelector('.category_area')
function show () {
    if (category.style.display == 'none') {
        category.style.display = 'block'
    } else {
        category.style.display = 'none'
    }
}
open.addEventListener('click', show)
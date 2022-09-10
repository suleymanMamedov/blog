const upload_img_btn = document.querySelector('.upload_img_btn');
const upload_blog_img = document.querySelector('#upload_blog_img');
const uploaded_img_as_blog = document.querySelector('.uploaded_img_as_blog')

const profileIconHome = document.querySelector('#profileIconHome')
const profileIconBlog = document.querySelector('#profileIconBlog')
const profileIconUser = document.querySelector('#profileIconUser')
const userName = document.querySelector('#userName')

const logOut = document.querySelector('#logOut')

// upload_img_btn.addEventListener('click', () => {
//     // console.log(upload_blog_img.files[0])
// })
// upload_blog_img.addEventListener('change', (e) => {


//     let reader = new FileReader();
//     reader.onload = () => {
//         localStorage.setItem('img', reader.result)

//     }

//     reader.readAsDataURL(e.target.files[0])
// })


if (localStorage.getItem('img')) {
    uploaded_img_as_blog.style.display = 'block';
    uploaded_img_as_blog.src = localStorage.getItem('img');
}

const currentUser = JSON.parse(localStorage.getItem('loggedInUSer'))

userName.innerHTML = currentUser.name

profileIconHome.addEventListener('click', () => {
    window.location.pathname = 'index.html'
})
profileIconBlog.addEventListener('click', (e) => {
    window.location.pathname = 'blog.html'
    console.log(profileIconBlog);
})
profileIconUser.addEventListener('click', () => {
    window.location.pathname = 'profile.html'
})

logOut.addEventListener('click', () => {
    window.location.pathname = 'login.html'
})
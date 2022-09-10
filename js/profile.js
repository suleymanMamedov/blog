const prName = document.querySelector('#prName')
const prCountry = document.querySelector('#prCountry')
const prCity = document.querySelector('#prCity')
const prDate = document.querySelector('#prDate')
const prEmail = document.querySelector('#prEmail')
const prEditBtn = document.querySelector('#prEditBtn')
const prImg = document.querySelector('#prImg')
const edit_profile_form = document.querySelector('.edit_profile_form')
const name = document.querySelector('#name')
const country = document.querySelector('#country')
const city = document.querySelector('#city')
const birth_year = document.querySelector('#birth_year')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const saveBtn = document.querySelector('#saveBtn')
const profilemg = document.querySelector('#profilemg')

const profileIconHome = document.querySelector('#profileIconHome')
const userNameProfile = document.querySelector('#userNameProfile')
const profileIconBlog = document.querySelector('#profileIconBlog')
const logOut = document.querySelector('#logOut')




class Profile {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users'))
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUSer'))
    }

    showData() {


        prName.innerHTML = this.currentUser.name
        prCountry.innerHTML = this.currentUser.country
        prCity.innerHTML = this.currentUser.city
        prDate.innerHTML = this.currentUser.date
        prEmail.innerHTML = this.currentUser.email
        prImg.src = this.currentUser.image
        userNameProfile.innerHTML=this.currentUser.name
    }
    fillInputs() {
        name.value = this.currentUser.name
        country.value = this.currentUser.country
        city.value = this.currentUser.city
        birth_year.value = this.currentUser.date
        email.value = this.currentUser.email
        password.value = this.currentUser.password
    }
    saveChange() {


        this.currentUser.name = name.value;
        this.currentUser.country = country.value;
        this.currentUser.city = city.value;
        this.currentUser.date = birth_year.value;
        this.currentUser.email = email.value;
        this.currentUser.password = password.value;


        localStorage.setItem('loggedInUSer', JSON.stringify(this.currentUser))
        const index = this.users.findIndex(user => user.id == this.currentUser.id)
        this.users[index] = this.currentUser;
        localStorage.setItem('users', JSON.stringify(this.users))
        edit_profile_form.style.display = 'none'
        this.showData()
    }

    uploadImg(file) {
        let reader = new FileReader()
        reader.onload = () => {
            this.currentUser.image = reader.result
            localStorage.setItem('loggedInUSer', JSON.stringify(this.currentUser))
            const index = this.users.findIndex(user => user.id == this.currentUser.id)
            this.users[index] = this.currentUser;
            localStorage.setItem('users', JSON.stringify(this.users))
            edit_profile_form.style.display = 'none'
            this.showData()
        }
        reader.readAsDataURL(file)
    }
}


window.addEventListener('load', () => {
    const pr = new Profile(

    )
    pr.showData()
})

prEditBtn.addEventListener('click', () => {
    edit_profile_form.style.display = 'grid'
    const pr = new Profile()
    pr.fillInputs()
})
saveBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const pr = new Profile
    pr.saveChange()
})

profilemg.addEventListener('input', (e) => {
    const pr = new Profile()
    pr.uploadImg(e.target.files[0])
})
logOut.addEventListener('click',()=>{
    window.location.pathname = 'login.html'
})

profileIconHome.addEventListener('click',()=>{
    window.location.pathname = 'index.html'
})
profileIconBlog.addEventListener('click',()=>{
    window.location.pathname = 'blog.html'
})
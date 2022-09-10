const logEmail = document.querySelector('#logEmail')
const logPassword = document.querySelector('#logPassword')
const logBtn = document.querySelector('#logBtn')
const logMsg = document.querySelector('#logMsg')




const regName = document.querySelector('#regName')
const regEmail = document.querySelector('#regEmail')
const regDate = document.querySelector('#regDate')
const regPassword = document.querySelector('#regPassword')
const regBtn = document.querySelector('#regBtn')
const regMsg = document.querySelector('#regMsg')



class Login {
    constructor(email, password) {
        this.email = email
        this.password = password

        if (localStorage.getItem('users')) {
            this.users = JSON.parse(localStorage.getItem('users'))
        } else {
            this.users = [];
        }
    }


    checkEmail() {
        return this.users.find(user => user.email == this.email)

    }

    checkPassword() {
        const email = this.checkEmail()
        if (email) {
            if (email.password == this.password) {
                logMsg.innerHTML = 'Login oldun'

                localStorage.setItem('loggedInUSer', JSON.stringify(email))
                window.location.pathname = 'index.html'
            } else {
                logMsg.innerHTML = 'Shifre yanlisdi'
            }

        } else {
            logMsg.innerHTML = 'Istifadeci movcud deyil'
        }
    }

}






class Register extends Login {
    constructor(email, password, date, name) {
        super(email, password)
        this.date = date
        this.name = name
    }


    registerUser() {
        const email = this.checkEmail()
        if (email) {
            regMsg.innerHTML = 'Istifadechi artiq movcudur'
        }
        else {
            const newUser = {
                id: this.users.length + 1,
                name: this.name,
                email: this.email,
                password: this.password,
                date: this.date,
                image: '',
                country: '',
                city: ''
            }
            this.users.push(newUser)
            localStorage.setItem('users', JSON.stringify(this.users))

            this.checkPassword()
        }
    }
}




logBtn.addEventListener('click', (e) => {
    e.preventDefault()

    if (logEmail.value !== '' && logPassword.value !== '') {
        const loginClass = new Login(logEmail.value, logPassword.value)
        loginClass.checkPassword()
    }
})


regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (regDate.value !== '' && regEmail.value !== '' && regName.value !== '' && regPassword.value !== '') {
        const registerUser = new Register(regEmail.value, regPassword.value, regDate.value, regName.value)
        registerUser.registerUser()
    }
})




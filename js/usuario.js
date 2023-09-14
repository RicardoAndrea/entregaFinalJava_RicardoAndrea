const btnRegister = document.getElementById("btn__register")
const formRegister = document.getElementById("user__register")
const formLogin = document.getElementById("user__login")
const btnLogin = document.getElementById("btn__logearse")

let usuarios = JSON.parse(localStorage.getItem("usuarios"))


class newUser{
    constructor(user, pass){
        this.id = usuarios.length + 1
        this.user = user
        this.pass = pass
        this.admin = false
    }
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formLogin.children[0].children[1].value
    const pass = formLogin.children[1].children[1].value

    validarYlogear(user, pass)



})

const validarYlogear = (user, pass) => {

    const userExiste = usuarios.find((usuario)  => usuario.user === user)

    if(userExiste === undefined || userExiste.pass !== pass){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error en usuario o contraseña!',
            footer: '<a href="">Intente nuevamente!</a>'
          })
    }else{
        let usuario = {
            user: userExiste.user,
            pass: userExiste.pass,
            admin: userExiste.admin
        }

        sessionStorage.setItem("usuario", JSON.stringify(usuario))
        location.href = "../index.html"
    }
    
}


btnRegister.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formRegister.children[0].children[1].value
    const pass = formRegister.children[1].children[1].value

    const nuevoUsuario = new newUser(user, pass)

    validarYRegistrar(nuevoUsuario)
})


const validarYRegistrar = (nuevoUsuario) => {

    const userNuevo = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user)
    if(userNuevo === undefined){

        usuarios.push(nuevoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario))
        console.log(usuarios)
        location.href = "../index.html"       
    }else{
        Swal.fire('El usuario ya Existe')


        sessionStorage.setItem("usuario", JSON.stringify(usuario))
        location.href = "../index.html"
    }

}
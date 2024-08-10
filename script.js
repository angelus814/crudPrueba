let form = document.querySelector(".form")
let tabla = document.querySelector(".tabla")
let botonAction = document.querySelector(".botonAction")
const nombre = document.getElementById("nombre")
const correo = document.getElementById("correo")
let id = 0
const boton = document.getElementById("enviar")
const arrae = JSON.parse(localStorage.getItem("listas")) || []

form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

const agregar = ()=>{
    crearListas(nombre.value, correo.value)
    console.log("machuque aqui")
    nombre.value =""
    correo.value = ""
    id++
}
const crearListas = (nom, corr) =>{
    tabla.innerHTML += `
        <li class="${nom+id}">${nom}</li>
        <li class="${nom+id}">${corr}</li>
        <li class="botones ${nom+id}">
            <button class="botonEditar ${nom+id}">Edit</button>
            <button class="botonAction  ${nom+id}">Delete</button>
        </li>
    `
    arrae.push(
        {nombre: `<li class="${nom+id}">${nom}</li>`, correo: `<li class="${nom+id}">${corr}</li>`, botones: `<li class="botones ${nom+id}">
            <button class="botonEditar ${nom+id}">Edit</button>
            <button class="botonAction  ${nom+id}">Delete</button>
        </li>`}
    )
   localStorage.setItem("listas", JSON.stringify(arrae))
    botonAction = document.querySelectorAll(".botonAction")
    botonAction.forEach(boton => {
        boton.addEventListener("click", ()=>{
            borrarClases(event)
        })
    })
    let botonEditar = document.querySelectorAll(".botonEditar")
    botonEditar.forEach(boton => {
        boton.addEventListener("click", (e)=>{
            let editarClase = e.target.classList[1]
            let editarLista = document.querySelectorAll(`.${editarClase}`)
            nombre.value = editarLista[0].textContent
            correo.value = editarLista[1].textContent
            borrarClases(event)
        })
    })
}
const borrarClases = (e) =>{
    let borrarClase = e.target.classList[1]
    let borrarLista = document.querySelectorAll(`.${borrarClase}`)
    for(let borrarLi of borrarLista ){
        borrarLi.remove()
    }
}
const cargarContenido = ()=>{
    let nuevoArrae = JSON.parse(localStorage.getItem("listas"))
    if(nuevoArrae){
        nuevoArrae.forEach(element => {
            tabla.innerHTML += element.nombre + element.correo + element.botones
        })
        borrarBoton()
    } 
}
const borrarBoton = () =>{
    botonAction = document.querySelectorAll(".botonAction")
    botonAction.forEach(boton => {
        boton.addEventListener("click", ()=>{
            borrarClases(event)
        })
    })
}
cargarContenido()
boton.addEventListener("click", agregar)
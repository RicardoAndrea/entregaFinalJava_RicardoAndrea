import { comprarProducto } from "./carrito.js"
fetch(".data.json")
   .then((response) => response.json())
const userlogin = document.getElementById("userlogin")
const divProductos = document.getElementById("productos")
const filterPrecio = document.getElementById("filter__precio")
const filterLista = document.getElementById("filter__lista")
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"))
let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))

document.addEventListener("DOMContentLoaded", () => {
     if(usuarioLogeado === null){
      const a = document.createElement("a")
      a.href = "./html/usuarios.html"
      a.innerHTML = "Login"
      userLogin.appendChild(a)
    }else{
      const p = document.createElement("p")
      const close = document.createElement("button")
  
      p.innerHTML = `Bienvenido ${usuarioLogeado.user}`
      close.id = "cerrar__sesion"
      close.innerHTML = "cerrar sesion"
      close.addEventListener("click", async () => {
        await Swal.fire({
          icon: 'success',
          title: 'Usuario deslogeado',
          text: 'Gracias por comprar en nuestra tienda',
        })
  
        sessionStorage.removeItem("usuario")
        location.reload()
      })
      userLogin.appendChild(p)
      userLogin.appendChild(close)
    }
      generarCardsProductos(productosDisponibles)
  })

export const generarCardsProductos = (productos) => {
    divProductos.innerHTML = "";
    productos.forEach((producto) => {

    const { imagen, nombre, categoria, precio, id } = producto
        let card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body">
        <p class="card-title">${nombre}</p>
        <p class="card-text">Categoria: ${categoria}</p>
        <p class="card-text">Precio: <b>$${precio}</b></p>
        <button id="btn${id}" class="btn btn-primary">Cotizar</button>
        </div>
        </div>`;
  
      divProductos.appendChild(card);

      const btnComprar = document.getElementById(`btn${id}`)
      btnComprar.addEventListener("click", () => comprarProducto(id))
    });
};
let boton = document.getElementById("whatsapp");
boton.addEventListener("click", () => {
    Toastify({
      text: "Contactenos por WhatsApp!",
      duration: 6000,
      destination: "https://wa.me/542235476379",
    }).showToast();
  });
  filterPrecio.addEventListener("click", (e) => {

    const orden = e.target.innerHTML
    let productos
  
    if(orden === "Ascendente"){
      productos = productosDisponibles.sort((a, b) => a.precio - b.precio)
    }else if(orden === "Descendente"){
      productos = productosDisponibles.sort((a, b) => b.precio - a.precio)
    }
  
    generarCardsProductos(productos)
  
  })
  filterLista.addEventListener("click", (e) => {
    const productosFilter = productosDisponibles.filter((producto) => producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
  
    productosDisponibles = productosFilter
  
    if(e.target.innerHTML !== "Todos"){
      generarCardsProductos(productosFilter)
    }else{
      productosDisponibles = JSON.parse(localStorage.getItem("productos"))
      generarCardsProductos(productosDisponibles)
    }
  })  
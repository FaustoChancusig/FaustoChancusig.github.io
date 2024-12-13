document.addEventListener('DOMContentLoaded', () => {
    // Al cargar la página, reconstruir el carrito desde localStorage
    actualizarCarrito();
});

const carrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el HTML del carrito y guardar en localStorage
function actualizarCarrito() {
    carrito.innerHTML = ''; // Limpiar el HTML del carrito
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><a href="#" class="borrar" data-id="${producto.id}">X</a></td>
        `;
        carrito.appendChild(row);
    });
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

// Función para agregar un producto
function agregarProducto(producto) {
    const existe = productosCarrito.some(item => item.id === producto.id);
    if (existe) {
        productosCarrito = productosCarrito.map(item => {
            if (item.id === producto.id) {
                item.cantidad++;
            }
            return item;
        });
    } else {
        productosCarrito.push(producto);
    }
    actualizarCarrito();
}

// Función para eliminar producto del carrito
function eliminarProducto(productoId) {
    productosCarrito = productosCarrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', e => {
    e.preventDefault();
    productosCarrito = [];
    actualizarCarrito();
});

// Detectar clic en botones "Agregar al carrito"
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const producto = {
            id: e.target.getAttribute('data-id'),
            nombre: e.target.parentElement.querySelector('h3').textContent,
            precio: e.target.parentElement.querySelector('.precio').textContent,
            imagen: e.target.parentElement.parentElement.querySelector('img').src,
            cantidad: 1
        };
        agregarProducto(producto);
    });
});

// Detectar clic en "borrar producto"
carrito.addEventListener('click', e => {
    if (e.target.classList.contains('borrar')) {
        const productoId = e.target.getAttribute('data-id');
        eliminarProducto(productoId);
    }
});

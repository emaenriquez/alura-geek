document.addEventListener('DOMContentLoaded', () => {
    let contenedorProducto = document.querySelector('.contenedor__productos');
    let btnEnviar = document.querySelector('.btn__enviar');
    let btnLimpiar = document.querySelector('.btn__limpiar');

    const cargarProductos = () => {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.forEach(producto => {
            agregarProductoAlDOM(producto);
        });
    };

    const agregarProductoAlDOM = (producto) => {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('contenedor__card');

        productoDiv.innerHTML = `
        <div class="contenedor__card">
          <img class="img__producto" src="${producto.imagen}" alt="producto">
          <p>${producto.nombre}</p>
          <div class="contenedor__card-contenido">
            <p>$ ${producto.precio}</p>
            <img class="" src="img/trash.png" alt="Eliminar">
          </div>
        </div>
      `;

        contenedorProducto.appendChild(productoDiv);
    };

    const AgregarProductos = (e) => {
        e.preventDefault();

        let inputNombre = document.querySelector('.input__nombre').value;
        let inputPrecio = document.querySelector('.input__precio').value;
        let inputImagen = document.querySelector('.input__imagen').value;

        let nuevoProducto = {
            nombre: inputNombre,
            precio: inputPrecio,
            imagen: inputImagen
        };

        agregarProductoAlDOM(nuevoProducto);

        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productos));

        // Limpiar los campos del formulario después de agregar el producto
        document.querySelector('.input__nombre').value = '';
        document.querySelector('.input__precio').value = '';
        document.querySelector('.input__imagen').value = '';
    };

    const limpiarProductos = () => {
        localStorage.removeItem('productos');
        contenedorProducto.innerHTML = '';
    };

    btnEnviar.addEventListener('click', AgregarProductos);
    btnLimpiar.addEventListener('click', limpiarProductos);

    // Cargar productos al iniciar la página
    cargarProductos();
});

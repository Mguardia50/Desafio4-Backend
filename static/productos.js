

function renderProduct(resp) {
    const html = resp

    .map(
      (prod) => `
      <div class="productList">
      <h2 style="color: blue">${prod.objeto}
      </h2><h2 style="color: blue">${prod.precio}
      </h2><img src=${prod.url} style="width: 150px; height: 150px">
      </div>
`

    )
    .join(" ");
    /* .map(
      (msg) => `
      <div class="productList">
      <h2 style="color: blue">${nombreProducto}
      </h2><h2 style="color: blue">${precioProducto}
      </h2><img src=${urlProducto} style="width: 150px; height: 150px">
      </div>
`
    ) */
    document.getElementById("productContainer").innerHTML = html;

  }

function probando(){
    const nombreProducto = document.getElementById("nombreProducto").value;
    const precioProducto = document.getElementById("precioProducto").value;
    const stockProducto = document.getElementById("stockProducto").value;
    const urlProducto = document.getElementById("urlProducto").value;

    const texto = `<div class="productList">
    <h2 style="color: blue">${nombreProducto}</h2>
    <h2 style="color: blue">${precioProducto}</h2>
    <img src=${urlProducto} style="width: 150px; height: 150px">
    </div>`
    fetch('http://localhost:8080/productos')


  .then((res) => res.text())
  .then((html) => {
    socket.emit("new_prod", html , {objeto: nombreProducto, stock: stockProducto, precio: precioProducto, url:urlProducto})
});
    
  }

  let botonVer = document.getElementById("btnVer");
  botonVer.addEventListener("click", probando);

  socket.on("cargarProductos", (resp) => {
    renderProduct(resp);
  });

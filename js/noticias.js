/******** Sección Noticias Archivo Local y Externo ********/

// === CARGAR DESDE ARCHIVO LOCAL ===
async function cargarNoticiasLocal() {
  try {
    const res = await fetch("./data/noticias.json");
    const noticias = await res.json();
    mostrarNoticias(noticias);
  } catch (error) {
    console.error("Error al cargar JSON local:", error);
  }
}

// === CARGAR DESDE API EXTERNA ===
async function cargarNoticiasAPI() {
  const apiKey = "fd205bfee4713686dade6dd7b9e0ee05";
  const url = `https://gnews.io/api/v4/top-headlines?lang=es&country=do&max=5&apikey=${apiKey}`;

  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    console.log("Respuesta GNews:", data); 

    if (!data.articles) {
      throw new Error(data.message || "No se encontraron artículos");
    }

    const noticias = data.articles.map(noticia => ({
      titulo: noticia.title,
      descripcion: noticia.description,
      imagen: noticia.image,
      fecha: noticia.publishedAt
    }));

    mostrarNoticias(noticias);

  } catch (error) {
    console.error("Error al cargar API externa:", error);
    alert("No se pudieron cargar las noticias externas 😢");
  }
}



// === FUNCIÓN PARA MOSTRAR LAS NOTICIAS ===
function mostrarNoticias(lista) {
  const contenedor = document.getElementById("contenedor-noticias");
  contenedor.innerHTML = "";

  lista.forEach(noticia => {
    const div = document.createElement("div");
    div.classList.add("noticia");

    div.innerHTML = `
      <h2>${noticia.titulo}</h2>
      <p>${noticia.descripcion || "Sin descripción disponible."}</p>
      <small>${new Date(noticia.fecha).toLocaleDateString()}</small>
    `;

    contenedor.appendChild(div);
  });
}

// === EVENTOS DE LOS BOTONES ===
document.getElementById("btn-local").addEventListener("click", cargarNoticiasLocal);
document.getElementById("btn-api").addEventListener("click", cargarNoticiasAPI);

cargarNoticiasLocal();

const contenedor = document.getElementById("contenedor");
const cuadrado = document.createElement("div");
const circulo = document.createElement("div");


cuadrado.style.width = "100px";
cuadrado.style.height = "100px";
cuadrado.style.backgroundColor = "black";
cuadrado.style.margin = "20px";

contenedor.appendChild(cuadrado);


circulo.style.width = "100px";
circulo.style.height = "100px";
circulo.style.backgroundColor = "green";
circulo.style.borderRadius = "50%"; 
circulo.style.margin = "20px";

contenedor.appendChild(circulo);
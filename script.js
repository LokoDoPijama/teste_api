async function obterDados() {
    
    try {
        const resposta = await fetch("https://apiteste.hevandro-patric.repl.co/");
        const dados = await resposta.json();

        const temperaturaAguaDiv = document.getElementById("temperaturaAgua");
        const nivelAguaDiv = document.getElementById("nivelAgua");
        const temperaturaOleoDiv = document.getElementById("temperaturaOleo");
        const nivelOleoDiv = document.getElementById("nivelOleo");
        const avisosDiv = document.getElementById("avisos");

        temperaturaAguaDiv.innerHTML = `<h2>${dados.Sensor_Temperatura_Agua}°C</h2>`;

        nivelAguaDiv.innerHTML = `<h2>${dados.Sensor_Nivel_Agua * 10}%</h2>`;

        temperaturaOleoDiv.innerHTML = `<h2>${dados.Sensor_Temperatura_Oleo}°C</h2>`;

        nivelOleoDiv.innerHTML = `<h2>${dados.Sensor_Nivel_Oleo * 10}%</h2>`;

        if (dados.Avisos.length == 0) {

          avisosDiv.innerHTML = `
          <ul class="list-group list-group-flush">
              <li class="list-group-item">Nenhum aviso</li>
          </ul>
          `;

        } else {

          avisosDiv.innerHTML = `
          <ul class="list-group list-group-flush">
            ${dados.Avisos.map(aviso => `<li class="list-group-item">${aviso}</li>`).join("")}
          </ul>
          `;

        }


    } catch (error) {
        console.error("Erro ao obter dados: ", error);
    }
}

obterDados();

function meuLoop() {
  setTimeout(function() {
    obterDados();
    meuLoop();

   }, 5000)
}

meuLoop();
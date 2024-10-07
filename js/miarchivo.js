
let simulacion=new SimulacionLuz();
inicio();
function inicio()
{
    let tarifa1=new Tarifa("Doble");
    let horario1=new Horario(16,21,11.032);
    let horario2=new Horario(21,0,4.422);
    let horario3=new Horario(0,16,4.422);
    tarifa1.agregar(horario1);
    tarifa1.agregar(horario2);
    tarifa1.agregar(horario3);
    simulacion.agregar(tarifa1);

    let tarifa2=new Tarifa("Triple");
    horario1=new Horario(17,21,11.032);
    horario2=new Horario(0,7,2.298);
    horario3=new Horario(7,17,5.036);
    tarifa2.agregar(horario1);
    tarifa2.agregar(horario2);
    tarifa2.agregar(horario3);
    simulacion.agregar(tarifa2)
     
    let select=document.getElementById("tarifa");
    for(let tarifa of simulacion.tarifas)
    {
        select.innerHTML+="<option value="+tarifa.nombre+">"+tarifa.nombre+"</option>";
    }

    document.getElementById("horaInicio").addEventListener("input",mostrarValor)
    document.getElementById("horaFinal").addEventListener("input",mostrarValor)
    document.getElementById("btnCalcular").addEventListener("click",iniciarSimulacion)
}
// Función para iniciar la simulación
function iniciarSimulacion() {
    let horaInicio=Number(document.getElementById('horaInicio').value);
    let horaFinal=Number(document.getElementById('horaFinal').value);

    const potencia = parseFloat(document.getElementById("potencia").value);
    const tipoTarifa = document.getElementById("tarifa").value;


    const consumo = simulacion.calcularConsumo(horaFinal-horaInicio,potencia);
    const costo = simulacion.calcularCostoPorIntervalo(tipoTarifa,potencia,horaInicio,horaFinal);

    // Mostrar los resultados en el HTML
    const resultado = document.getElementById('resultadoSimulacion');
    resultado.innerHTML = `
        <p>Consumo: ${consumo.toFixed(2)} kWh</p>
        <p>Franja Horaria: ${tipoTarifa}</p>
        <p>Costo: $${costo.toFixed(2)}</p>
    `;
}

// Función para mostrar el valor seleccionado en el input range
function mostrarValor() {
    let horaIncio=Number(document.getElementById('horaInicio').value);
    let valorHoraInicio = document.getElementById('valorHoraInicio');
    valorHoraInicio.textContent = `${horaIncio}:00`;

    let horaFinal=Number(document.getElementById('horaFinal').value);
    let valorHoraFinal = document.getElementById('valorHoraFinal');
    valorHoraFinal.textContent = `${horaFinal}:00`;

    let luzNaturalDisponible=simulacion.promedioLuzNatural(horaIncio,horaFinal);

    const luzNaturalLabel = document.getElementById('luzNatural');
    luzNaturalLabel.textContent = `Luz natural promedio disponible: ${Math.max(0, luzNaturalDisponible.toFixed(2))}%`;
}

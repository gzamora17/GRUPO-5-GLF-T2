var alfabeto=[];
var estado1=[], estado2=[];
var transicion1=[], transicion2=[];
var T1BOOL, T2BOOL;
var contadorBoton = 0;

function setAlfabeto() {
    var size = document.getElementById('size-alfabeto').value;
    var printAlfabeto = document.getElementById('alfabetoTabla');
    // Lo vacia para prevenir problemas
    printAlfabeto.innerHTML = "";
    alfabeto = []

    // Rellena el alfabeto original
    if(size > 0){
       alfabeto.push("E");
       var aux;
       var Textaux;
       var textaux2;
       for(i=0;i<size;i++){
           if(i <= 25){
               aux=97+i;
               aux=String.fromCharCode(aux);
           }
           else {
               textaux=96+(Math.trunc(i/26));
               textaux=String.fromCharCode(textaux);
               textaux2=97+(i-(26*(Math.trunc(i/26))));
               textaux2=String.fromCharCode(textaux2);
               aux=textaux.concat(textaux2);
           }
           alfabeto.push(aux);
       }
       console.log("Se ha ingresado el alfabeto\n");
       console.log(alfabeto);
   }
   else{
       console.error("Debe ingresar un número mayor a 1");
       alert("Debe ingresar un número mayor a 1");
   }

    // Lo imprime la tabla por pantalla
    for (var i = 0; i<alfabeto.length; i++) {
        var untr = document.createElement("tr");
        var untd = document.createElement("td");
        untd.textContent = alfabeto[i];
        untr.appendChild(untd);
        printAlfabeto.appendChild(untr);
    }
}

function IngresarEstados(automata) {
    var validacion=0;
    var Textaux;
    // Si el automata ingresado es 1
    if(automata == "automata1"){
        var NumeroIngresado = document.getElementById("estadosA1").value;
        if(NumeroIngresado >= 1){
            estado1= [];
            validacion = 1;
        }
        else {
            alert("Numero menor a 1 o letra");
            console.error("Numero menor a 1 o letra");
            return false;
        }

        if(validacion == 1){
            var letra ="q";
            for(i=0;i<NumeroIngresado;i++){
                Textaux=letra.concat(i);
                estado1.push([Textaux,"n"]);
            }
        }
    }
    else {
        // Sino el automata ingresado es 2
        var NumeroIngresado = document.getElementById("estadosA2").value;
        if(NumeroIngresado >= 1){
            estado2= [];
            validacion = 1;
        }
        else {
            alert("Numero menor a 1 o letra");
            console.error("Numero menor a 1 o letra");
            return false;
        }
        if(validacion == 1){
            var letra ="r";
            for(i=0;i<NumeroIngresado;i++){
                Textaux=letra.concat(i);
                estado2.push([Textaux,"n"]);
            }
        }
    }

    if(automata == "automata1"){
        T1BOOL = document.getElementById("afdA1").checked;
        if (T1BOOL == false) {
            console.log("[Automata 1]\n\tTipo: AFD\n\tSe han ingresado: "+estado1.length+" estados")
        }
        else {
            console.log("[Automata 1]\n\tTipo: ANFD\n\tSe han ingresado: "+estado1.length+" estados")
        }
        console.log(estado1);
    }
    else {
        T2BOOL = document.getElementById("afdA2").checked;
        if (T2BOOL == false) {
            console.log("[Automata 2]\n\tTipo: AFD\n\tSe han ingresado: "+estado2.length+" estados")
        }
        else {
            console.log("[Automata 2]\n\tTipo: ANFD\n\tSe han ingresado: "+estado2.length+" estados")
        }
        console.log(estado2);
    }
}

function IngresarEtiquetas(automata){
   var validacion=0;

   if(automata=="automata1"){
       var NumeroIngresado = document.getElementById("etiquetaA1").value;
       var BoolIngresado = document.getElementById("etiquetaB1").checked;

       if(estado1.length > NumeroIngresado){
           validacion=1;
       }
       else{
           console.error("Numero de estados finales mayor al maximo posible")
           alert("Numero de estados finales mayor al maximo posible");
       }

       if(validacion==1){
           for(i=0;i<estado1.length;i++){
               if(i==0){
                   if(BoolIngresado==true){
                       estado1[i][1]="if";
                   }
                   else{
                       estado1[i][1]="i";
                   }
               }
               if(i>=((estado1.length)-NumeroIngresado)){
                   estado1[i][1]="f";
               }
           }
           console.log("Se ha ingresado correctamente la etiqueta para el automata 1");
           console.log(estado1);
       }
   }
   else {
    //    Si es automata 2
       var NumeroIngresado = document.getElementById("etiquetaA2").value;
       var BoolIngresado = document.getElementById("etiquetaB2").value;

       if(estado1.length > NumeroIngresado){
           validacion=1;
       }
       else{
           console.error("Numero de estados finales mayor al maximo posible")
           alert("Numero de estados finales mayor al maximo posible");
       }

       if( validacion == 1){
           for(i=0;i<estado2.length;i++){
               if(i==0){
                   if(BoolIngresado==true){
                       estado2[i][1]="if";
                   }
                   else{
                       estado2[i][1]="i";
                   }
               }
               if(i>=((estado2.length)-NumeroIngresado)){
                   estado2[i][1]="f";
               }
           }
           console.log("Se ha ingresado correctamente la etiqueta para el automata 2");
           console.log(estado2);
       }
   }
}

function setTransiciones(automata){
    var cont=1;
    var validacion=1;

    do{
        var Estado1Ingresado = document.getElementById("inicio"+cont).value;
        var Estado2Ingresado = document.getElementById("termino"+cont).value;
        var ABCIngresado = document.getElementById("alfabeto"+cont).value;

        if(automata == "automata1"){
            transicion1.push([Estado1Ingresado,ABCIngresado,Estado2Ingresado]);
        }
        else {
            // Automata 2
            transicion2.push([Estado1Ingresado,ABCIngresado,Estado2Ingresado]);
        }
        cont++;
    }while(cont <= contadorBoton);

    cont=0;
    if(automata == "automata1"){
        if(T1BOOL == false){
            if(contadorBoton != ((estado1.length)*(alfabeto.length - 1))){
               validacion==0;
               console.error("Cantidad de transiciones con concuerda que el tipo de automata");
               alert("Cantidad de transiciones con concuerda que el tipo de automata");
           }
           for(i=1;i<alfabeto.length;i++){
               for(j=0;j<transicion1.length;j++){
                   if(alfabeto[i] == transicion1[j][1]){
                       cont++;
                   }
               }
               if(cont != estado1.length){
                   validacion=0;
                   console.error("Cantidad de transiciones con concuerda que el tipo de automata");
                   alert("Cantidad de transiciones con concuerda que el tipo de automata");
               }
               cont=0;
           }
        }
        var aux1=0;
        var aux2=0;
        var aux3=0;

      for(i=0;i<transicion1.length;i++){
        for(j=0;j<estado1.length;j++){
          if(transicion1[i][0]==estado1[j][0]){
            aux1++;
          }
          if(transicion1[i][2]==estado1[j][0]){
            aux2++;
          }
        }
        for(k=0;k<alfabeto.length;k++){
          if(transicion1[i][1]==alfabeto[k]){
            aux3++;
          }
        }
        if((aux1==0) || (aux2==0) || (aux3==0)){
          validacion=0;
          console.error("Elemento no presente en datos previamente guardados");
          alert("Elemento no presente en datos previamente guardados");
        }
        aux1=0;
        aux2=0;
        aux3=0;
      }
   }
   else{
       if(T2BOOL == false){
           if(contadorBoton != ((estado2.length)*(alfabeto.length - 1))){
               validacion==0;
               console.error("Cantidad de transiciones con concuerda que el tipo de automata");
               alert("Cantidad de transiciones con concuerda que el tipo de automata");
           }
           for(i=1;i<alfabeto.length;i++){
               for(j=0;j<transicion2.length;j++){
                   if(alfabeto[i] == transicion2[j][1]){
                       cont++;
                   }
               }
               if(cont != estado2.length){
                   validacion=0;
                   console.error("Cantidad de transiciones con concuerda que el tipo de automata");
                   alert("Cantidad de transiciones con concuerda que el tipo de automata");
               }
               cont=0;
           }
       }
        var aux1=0;
        var aux2=0;
        var aux3=0;

      for(i=0;i<transicion2.length;i++){
        for(j=0;j<estado2.length;j++){
          if(transicion2[i][0]==estado2[j][0]){
            aux1++;
          }
          if(transicion2[i][2]==estado2[j][0]){
            aux2++;
          }
        }
        for(k=0;k<alfabeto.length;k++){
          if(transicion2[i][1]==alfabeto[k]){
            aux3++;
          }
        }
        if((aux1==0) || (aux2==0) || (aux3==0)){
          validacion=0;
          console.error("Elemento no presente en datos previamente guardados");
          alert("Elemento no presente en datos previamente guardados");
        }
        aux1=0;
        aux2=0;
        aux3=0;
      }
   }
   if(validacion == 0){
       if(automata == "automata1"){
           transicion1=[]
       }else{
           transicion2=[]
       }
   }else{
       if(automata == "automata1"){
           console.log("Se han ingreasdo transiciones al automata 1: ");
           console.log(transicion1);
       }else{
           console.log("Se han ingreasdo transiciones al automata 2: ");
           console.log(transicion2);
       }
   }
   // Limpia el area de ingreso para prevenir problemas
   document.getElementById("sub-transicion1").innerHTML = '';
   document.getElementById("sub-transicion2").innerHTML = '';
}

 // Transiciones AFD
var addTransicionAFD = function (estados,id) {
    // Si es AFD el numero de transiciones esta limitado al numero de estados
    for(var i=0; i<estados*(alfabeto.length-1); i++){
        addTransicionANFD(id);
    }
};

// Añadir transicion para un anfd con un tamaño indeterminado
var addTransicionANFD = function(transicion) {
    contadorBoton++;

    var div = document.createElement("div");
    document.getElementById(transicion).appendChild(div);
    // Set div ID: Trans+#n
    div.setAttribute("id", "Trans" + document.getElementById(transicion).childElementCount);
    div.setAttribute("style", "padding:10px 0px; display:flex;");

    // Set inputs: inicio
    var inicio = document.createElement("input")
    inicio.setAttribute("id", "inicio" + document.getElementById(transicion).childElementCount);
    inicio.setAttribute("type","text");
    inicio.setAttribute("placeholder", "inicio");
    inicio.setAttribute("style", "padding:10px; width:100px;");

    // Set inputs: alfabeto
    var alfabeto = document.createElement("input")
    alfabeto.setAttribute("id", "alfabeto" + document.getElementById(transicion).childElementCount);
    alfabeto.setAttribute("type","text");
    alfabeto.setAttribute("placeholder", "alfabeto");
    alfabeto.setAttribute("style", "padding:10px; width:100px;");

    // Set inputs: termino
    var termino = document.createElement("input")
    termino.setAttribute("id", "termino" + document.getElementById(transicion).childElementCount);
    termino.setAttribute("type","text");
    termino.setAttribute("placeholder", "termino");
    termino.setAttribute("style", "padding:10px; width:100px;");

    // Append inputs
    div.appendChild(inicio);
    div.appendChild(alfabeto);
    div.appendChild(termino);
};

// Funcion cuando se oprime 'Añadir transiciones de estado'
function afdAnfd(automata) {
    contadorBoton = 0;
    // Limpia el area de ingreso para prevenir problemas
   document.getElementById("sub-transicion1").innerHTML = '';
   document.getElementById("sub-transicion2").innerHTML = '';
    if (automata == 'automata1') {
        IngresarEstados("automata1")
        // Imprime el nombre del automata
        var printNombreAutomata = document.getElementById("name-automata1");
        printNombreAutomata.innerHTML = document.getElementById("automataN1").value;
        // Imprime la tabla de estados y Alfabeto para el automata 1
        var estadosAutomata1 = document.getElementById("estadosA1").value;
        var printTablaAutomata = document.getElementById("automata1-tabla");
        printTablaAutomata.innerHTML = "";
        var mayor = 0;
        if (estadosAutomata1 > alfabeto.length) {
            mayor = estadosAutomata1;
        }
        else {
            mayor = alfabeto.length;
        }
        for (var i = 0; i < mayor; i++) {
            var untr = document.createElement("tr");
            var untd1 = document.createElement("td");
            untd1.textContent = alfabeto[i];
            var untd2 = document.createElement("td");
            untd2.textContent = estado1[i];
            untr.appendChild(untd1);
            untr.appendChild(untd2);
            printTablaAutomata.appendChild(untr);
        }

        // Procede a crear las casillas para las transiciones
        var boolAFD1 = document.getElementById("afdA1").checked;
        // Determina si el automata 1 es afd sino es anfd (false=afd; true=anfd)
        if (boolAFD1 == false) {
            // Limpia el boton de ingreso en caso de cambio
            document.getElementById("transicion-input1").innerHTML = '';
            // Crea tantas transiciones como estados tenga el automata y los deja en el div con id:sub-transicion1
            addTransicionAFD(estadosAutomata1,'sub-transicion1');
        }
        else {
            // Crea el boton para Añadir
            anadir = ['<button type=button onclick=addTransicionANFD("sub-transicion1")>Añadir</button>']
            // Lo ingresa en la  pagina
            var addHtml = document.getElementById("transicion-input1");
            addHtml.innerHTML = anadir;
        }
    }
    else {
        // Si es automata 2
        IngresarEstados("automata2");
        // Imprime el nombre del automata
        var printNombreAutomata = document.getElementById("name-automata2");
        printNombreAutomata.innerHTML = document.getElementById("automataN2").value;
        // Imprime la tabla de estados y Alfabeto para el automata 1
        var estadosAutomata1 = document.getElementById("estadosA2").value;
        var printTablaAutomata = document.getElementById("automata2-tabla");
        printTablaAutomata.innerHTML = "";
        var mayor = 0;
        if (estadosAutomata1 > alfabeto.length) {
            mayor = estadosAutomata1;
        }
        else {
            mayor = alfabeto.length;
        }
        for (var i = 0; i < mayor; i++) {
            var untr = document.createElement("tr");
            var untd1 = document.createElement("td");
            untd1.textContent = alfabeto[i];
            var untd2 = document.createElement("td");
            untd2.textContent = estado2[i];
            untr.appendChild(untd1);
            untr.appendChild(untd2);
            printTablaAutomata.appendChild(untr);
        }

        // Procede a crear las casillas para las transiciones
        var boolAFD2 = document.getElementById("afdA2").checked;
        // Determina si el automata 2 es afd sino es anfd (false=afd; true=anfd)
        if (boolAFD2 == false) {
            // Limpia el boton de ingreso en caso de cambio
            document.getElementById("transicion-input2").innerHTML = '';
            // Crea tantas transiciones como estados tenga el automata y los deja en el div con id:sub-transicion2
            var estadosAutomata2 = document.getElementById("estadosA2").value;
            addTransicionAFD(estadosAutomata2,'sub-transicion2');
        }
        else {
            // Crea el boton para Añadir
            anadir = ['<button type=button onclick=addTransicionANFD("sub-transicion2")>Añadir</button>']
            // Lo ingresa en la  pagina
            var addHtml = document.getElementById("transicion-input2");
            addHtml.innerHTML = anadir;
        }
    }
}

/** PARTE 2.b */
/** 2.b.1 Unión */
function union (Estados1, Estados2, Alfabeto, Transicion1, Transicion2) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculo').innerHTML = ''
    
    //Nuevo Automata
    var neoEstados = [['qE', 'i']], neoAlfabeto = [], neoTransicion = [];

    /* Dejamos el Alfabeto en el nuevo Automata */
    neoAlfabeto = Alfabeto.slice();
    
    /* Dejamos los Estados en el nuevo Automata */
    //Además, cambiamos los Iniciales por No Finales.
    //Primero con el Automata N°1.
    for (let i = 0; i < Estados1.length; i++) {
        if (Estados1[i][1] === 'i') {
            aux = Estados1[i];
            aux[1] = 'n';
            neoEstados.push(aux);
        }
        else {
            if (Estados1[i][1] === 'if') {
                aux = Estados1[i];
                aux[1] = 'f';
                neoEstados.push(aux);
            }
            else {
                neoEstados.push(Estados1[i]);
            }
        }
        
    }
    console.log("Guardamos los primeros Estados a nuestro nuevo Automata : [" + neoEstados + "]");
    //Luego, con el Automata N°2.
    for (let i = 0; i < Estados2.length; i++) {
        if (Estados2[i][1] === 'i') {
            aux = Estados2[i];
            aux[1] = 'n';
            neoEstados.push(aux);
        }
        else {
            if (Estados2[i][1] === 'if') {
                aux = Estados2[i];
                aux[1] = 'f';
                neoEstados.push(aux);
            }
            else {
                neoEstados.push(Estados2[i]);
            }
        }
    }
	console.log("Y listo, nuestro Automata posee todos los Estados que necesitamos : [" + neoEstados + "]");

    /* Dejamos las transiciones en el nuevo Automata */
    //Primero con el Automata N°1.
    aux = Transicion1.slice();
    for (let i = 0; aux.length != 0; i++) {
        if (i === 0){
            neoTransicion[i] = [neoEstados[0][0], 'E', Estados1[0][0]];
            i++;
            neoTransicion[i] = [neoEstados[0][0], 'E', Estados2[0][0]];
        }
        else 
            neoTransicion[i] = aux.shift();
    }
    //Luego, con el Automata N°2. 
    aux = Transicion2.slice();
    for (let i = neoTransicion.length; aux.length != 0; i++) {
        neoTransicion[i] = aux.shift();
    }
    console.log("Obtenemos todas las transciones para nuestro nuevo Automata : [" + neoTransicion + "]");

    // Lo imprime a la pagina
    var unionHTML= document.getElementById('mostrar-calculo');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Union';
    unionHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+ neoEstados ;
    unionHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Alfabeto: '+neoAlfabeto;
    unionHTML.appendChild(alfabeto);
    // Transicion
    var transiciones = document.createElement("h3");
    transiciones.textContent = 'Transicion: '+neoTransicion;
    unionHTML.appendChild(transiciones);
    
    return [neoEstados, neoAlfabeto, neoTransicion];
}

/** 2.b.2 Complemento */
function complemento (E) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculo').innerHTML = ''

    for (let i = 0; i < E.length; i++) {
        if (E[i][1] == 'f') {
            E[i][1] = 'n';
            console.log(E[i] + " pasó de Final a No Final");
        }
        else {
            if (E[i][1] == 'n'){
                E[i][1] = 'f'
                console.log(E[i] + " pasó de No Final a Final");
            }
            else {
                if (E[i][1] == 'i') {
                    E[i][1] = 'if';
                    console.log(E[i] + " pasó de Inicial a Inicial Final");
                }
                else {
                    if (E[i][1] == 'if') {
                        E[i][1] = 'i';
                        console.log(E[i] + " pasó de Inicial Final a Inicial");
                    }
                }
            }
        }
    }
    // Lo imprime a la pagina
    var complementoHTML= document.getElementById('mostrar-calculo');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Complemento';
    complementoHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+E ;
    complementoHTML.appendChild(estados);
    // Retorna la variable
    return E;
}

/** 2.b.3 Concatenación */
function Concatenacion (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculo').innerHTML = '';

    var neoEstados = [], neoAlfabeto = [], neoTransiciones = [];

    // Guardamos los Estados y las Transiciones del Automata 1 en el nuevo Automata.
    neoEstados = Estado_1.slice();
    neoTransiciones = Transicion_1.slice();

    /** ---- */
    // Guardamos el Alfabeto
    neoAlfabeto = Alfabeto.slice();

    /** ---- */
    //Procedemos a generar las nuevas Transiciones
    let aux_estados = Estado_2.slice();
    for (let i = 0; i < aux_estados.length; i++) {
        for (let k = 0; k < neoAlfabeto.length; k++) {
            for (let q = 0; q < neoEstados.length; q++) {
                if (neoEstados[q][1] == 'f' || neoEstados[q][1] == 'if') {
                    if (neoTransiciones[i][1] != neoAlfabeto[k]) {
                        var aux_transiciones = [neoEstados[q][0], neoAlfabeto[k], aux_estados[i][0]];
                        neoTransiciones.push(aux_transiciones);
                    }
                }
            }
        }
    }
    // Luego guardamos el resto de Transiciones.
    for (let i = 0; i < Transicion_2.length; i++) {
        neoTransiciones.push(Transicion_2[i]);
    }
    console.log("Así es como queda la nueva Transición : [" + neoTransiciones + "]");

    /** ---- */
    // Guardamos el resto de los Estados.
    console.log(aux_estados[0][1])
    for (let i = neoEstados.length; aux_estados != 0; i++) {
        neoEstados[i] = aux_estados.shift();
        if (neoEstados[i][1] == 'i') {
            neoEstados[i][1] = 'n';
        }
    }
    console.log("Continuamos con como queda los nuevos Estados : [" + neoEstados + "]");

    // Si el Automata 2 posee un Estado Inicial Final dejamos todo como está, a excepción del Estado Inicial que pasa a ser No Final.
    // En caso contrario, los Estados Finales del Automata 1 pasan a ser No Finales.
    aux_estados = Estado_2.slice();
    if (aux_estados[0][1] != 'if') {
        for (let i = 0; i < neoEstados.length - aux_estados.length; i++) {
            if (neoEstados[i][1] == 'f') {
                neoEstados[i][1] = 'n';
                
            }
            else {
                if (neoEstados[i][1] == 'if') {
                    neoEstados[i][1] = 'i';
                }
            }
        }
    }
    else {
        for (let i = 0; i < neoEstados.length; i++) {
            if (aux_estados[0] == neoEstados[i]) {
                neoEstados[i][1] = 'f';
            }
        }
    }

    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculo').innerHTML = '';
    // Lo imprime a la pagina
    var concatenacionHTML= document.getElementById('mostrar-calculo');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Concatenación';
    concatenacionHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+neoEstados;
    concatenacionHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Alfabeto:  '+neoAlfabeto;
    concatenacionHTML.appendChild(alfabeto);
    // Transiciones
    var transiciones = document.createElement("h3");
    transiciones.textContent = 'Transiciones: '+neoTransiciones;
    concatenacionHTML.appendChild(transiciones);
    
    /** ---- */
    // Retornamos el nuevo Automata.
    console.log("Después de todos los cambios, así queda nuestro Automata : ");
    console.log("[" + neoEstados + "], [" + neoAlfabeto + "], [" + neoTransiciones + "]");
    return [neoEstados, neoAlfabeto, neoTransiciones];
}

/** 2.b.4 Intersección */ 
function Interseccion (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculo').innerHTML = '';

    var Automata_neo = [], Estados_neo = [], Alfabeto_neo = [], Transicion_neo = [];
    
    // Para obtener la intersección debemos calcular lo siguiente:
    // (L1 ∩ L2) = (L1^c ∪ L2^c)^c
    // Obtenemos los complementos de ambos Estados.
    Estado_1 = complemento(Estado_1);
    console.log("Estos son los elementos del Estado 1 : [" + Estado_1 + "]");

    Estado_2 = complemento(Estado_2);
    console.log("Estos son los elementos del Estado 2 : [" + Estado_2 + "]");

    // Luego, calculamos la Unión.
    Automata_neo = union (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2);
    Estados_neo = Automata_neo[0];
    
    // Para finaliza, obtenemos el complemento del Automata Final.
    Estados_neo = complemento(Estados_neo);
    Alfabeto_neo = Automata_neo[1];
    Transicion_neo = Automata_neo[2];

     // limpia la zona para mostrarlo
     document.getElementById('mostrar-calculo').innerHTML = '';
    // Lo imprime a la pagina
    var interseccionHTML= document.getElementById('mostrar-calculo');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Intersección';
    interseccionHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+Estados_neo;
    interseccionHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Alfabeto:  '+Alfabeto_neo;
    interseccionHTML.appendChild(alfabeto);
    // Transiciones
    var transiciones = document.createElement("h3");
    transiciones.textContent = 'Transiciones: '+Transicion_neo;
    interseccionHTML.appendChild(transiciones);

    return [Estados_neo, Alfabeto_neo, Transicion_neo];
}

//2.a.- Simplificar
function E(){
    if(T1BOOL==false){
        simplificar(estado1, transicion1, alfabeto);
    }else{
        var[estado1AFND, transicion1AFND]=convertirAFND(estado1, transicion1);
        simplificar(estado1AFND, transicion1AFND, alfabeto);
    }
    if(T2BOOL==false){
        simplificar(estado2, transicion2, alfabeto);
    }else{
        var[estado2AFND, transicion2AFND]=convertirAFND(estado2, transicion2);
        simplificar(estado2AFND, transicion2AFND, alfabeto);
    }
}
function compararDestinos (matriz, estadosA, alfaA){
    var arrayConjunto = [], estadoConjunto = [], alfaConjunto=alfaA;
    var k = 0, f = 1 ;
    arrayConjunto=matriz, estadoConjunto=estadosA, alfaConjunto=alfaA;
    
    do{
        if (JSON.stringify(arrayConjunto[k])==JSON.stringify(arrayConjunto[f])){
            var nuevoNombre = estadoConjunto[k][0]+";"+estadoConjunto[f][0];
            console.log(nuevoNombre);
            var q=0, d=0;
            
            do{
                for(d;d<alfaConjunto.length;d++){
                    if(arrayConjunto[q][d]==estadoConjunto[k][0] || arrayConjunto[q][d]==estadoConjunto[f][0]){
                        arrayConjunto[q].splice(d,1,nuevoNombre);
                    }
                }
                q++;
            }while(q<arrayConjunto.length);
            
            for(var w=0;w<estadoConjunto.length;w++){
                if(estadoConjunto[w][0]==estadoConjunto[k][0] || estadoConjunto[w][0]==estadoConjunto[f][0]){
                    estadoConjunto[w].splice(0,1,nuevoNombre);
                }
            }
            arrayConjunto.splice(f,1);
            estadoConjunto.splice(f,1);
            k=0, f++;
        }else{
            f++;                    
        }
    }while(k<arrayConjunto.length && f<arrayConjunto.length);

    return [arrayConjunto,estadoConjunto];
}

function identificaAislados (destinos, estadosAnalizado, alfaAnalizado){
    var dAUX =[], estadoAUX=[], alfabetoAUX=[], estCont=0, desCont=0, alCont=0, validador=0;
    dAUX=destinos; estadoAUX=estadosAnalizado, alfabetoAUX=alfaAnalizado;
    console.log(dAUX);
    console.log(estadoAUX);
    
    do{
        do{
            if(desCont==estCont){
                desCont++,alCont=0;
            }
            else{
                if(dAUX[desCont][alCont]==estadoAUX[estCont][0]){
                    validador=1, alCont++;
                    if(alCont>alfabetoAUX.length){
                        alCont=0, desCont++;
                    }
                }
                else{
                    alCont++;
                    if(alCont>alfabetoAUX.length){
                        alCont=0, desCont++;
                    }
                }
            }
        }while(desCont<dAUX.length);
        console.log(validador);

        if(validador==0 && estadoAUX[estCont][1]!=="i" && estadoAUX[estCont][1]!=="if"){
            console.log("El estado "+estadoAUX[estCont][0]+" es aislado, se elimina.");
            dAUX.splice(estCont, 1);
            estadoAUX.splice(estCont,1);
            estCont++,alCont=0,desCont=0, validador=0;
        }else{
                console.log("El estado "+estadoAUX[estCont][0]+" no es aislado, se mantiene.");
                estCont++, alCont=0, desCont=0, validador=0;
        }
    }while(estCont<estadoAUX.length);
    console.log(dAUX);
    console.log(estadoAUX);
    
    return[dAUX, estadoAUX];
}

function simplificar (estadoAFD, transAFD, alfabetoAFD){
    // limpia la zona para mostrarlo
    document.getElementById('simplificar').innerHTML = '';
    
    var estadoAux = [], transAux = [], alfaAux=[], tamanoEstados =0;
    estadoAux=estadoAFD, transAux =transAFD;
    tamanoEstados=estadoAux.length;
    for(var treo=1;treo<alfabetoAFD.length;treo++){
        alfaAux.push(alfabetoAFD[treo]);
    }
    console.log("Estados Iniciales, no Finales y finales (C0)"+": "+estadoAux);
    console.log("Alfabeto: "+alfaAux);

    var MatrizAux= [], ingreso =[], p=0, o=0, v=0;
    console.log("La matriz que contiene las direcciones debe ser de "+estadoAux.length+" por "+alfaAux.length);
    
    do{
        do{
            if(transAux[o][0]==estadoAux[p][0] && transAux[o][1]==alfaAux[v]){
                ingreso.push(transAux[o][2]);
                v++, o=0;
            }else{
                o++;
            }
        }while(v<alfaAux.length && o<transAux.length);
        MatrizAux.push(ingreso), ingreso=[], p++, v=0, o=0;
    }while(p<estadoAux.length);
    console.log(MatrizAux);
    
    const [destinoAislado, estadoAislado]=identificaAislados(MatrizAux,estadoAux,alfaAux);
    const [nuevoDestino, estadosFinal]=compararDestinos(destinoAislado,estadoAislado,alfaAux);
    console.log("Esta es la nueva matriz de destinos: "+nuevoDestino);
    console.log(nuevoDestino);
    console.log("Estos son los nuevos estados: "+estadosFinal);

    var transFinal=[];
    var ingreso3=[], nivelEstado=0, nivelAlfa=0;
    do{
        ingreso3.push(estadosFinal[nivelEstado][0]);
        ingreso3.push(alfaAux[nivelAlfa]);
        ingreso3.push(nuevoDestino[nivelEstado][nivelAlfa]);
        transFinal.push(ingreso3);
        ingreso3=[];
        nivelAlfa++;
        if(nivelAlfa==alfaAux.length){
            nivelEstado++, nivelAlfa=0;
        }
    }while(nivelEstado<estadosFinal.length);
   
    
    if(estadosFinal.length==tamanoEstados || transFinal.length==transAux.length){
        console.log("El automata no se puede simplificar mas.");
    }else{
        console.log("La simplificación hizo que el automata finito determinista ingresado con "+tamanoEstados+" Estados y "+transAux.length+" Transiciones pasara a tener "+estadosFinal.length+" Estados y "+transFinal.length+" Transiciones.");
    }

    // Lo imprime a la pagina
    var simplificarHTML= document.getElementById('simplificar');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Simplificación';
    simplificarHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Los estados luego de la simplificación son: '+ estadosFinal;
    simplificarHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Las Transiciones luego de la simplificación:  '+ transFinal;
    simplificarHTML.appendChild(alfabeto);


    console.log("Los estados luego de la simplificación son:");
    console.log(estadosFinal);
    console.log("Las Transiciones luego de la simplificación:")
    console.log(transFinal);
    return [estadosFinal, transFinal, alfaAux];
}
// 2.a Convertir AFND a AFD
function agregaEstados(matrizD, estadoD, alfaD){
    var matrizDES=[], estadoDES=[], alfaDES=[], guardaNombre=[], a=0, b=0, esCombinado=0, guardaEstado=[], ingreso="k";
    matrizDES=matrizD, estadoDES=estadoD, alfaDES=alfaD;

    do{
    for(var c=0;c<estadoDES.length;c++){
            if(matrizDES[a][b]==estadoDES[c][0]){
            esCombinado=1;
        }
    }
        if(esCombinado==0){
            estadoDES.push([matrizDES[a][b],"n"]);
                guardaNombre=matrizDES[a][b].split("");
                var var1=0;
                do{
                    for(var pot=0;pot<guardaNombre.length;pot++){
                        if(guardaNombre[pot]==";"){
                            var1=1;
                        }
                    }
                    if(var1==1){
                        for(var twerk=0;guardaNombre[twerk]!=";";twerk++){
                            ingreso=ingreso+guardaNombre[twerk];
                        }
                        var algo=ingreso.slice(1, ingreso.length);
                        guardaEstado.push(algo);
                        do{
                            guardaNombre.splice(0,1);
                        }while(guardaNombre[1]==";");
                        guardaNombre.splice(0,1);
                        ingreso="k", var1=0;
                    }else{
                        if(var1==0){
                            var algo2="k";
                            for(var ser=0;ser<guardaNombre.length;ser++){
                                algo2=algo2+guardaNombre[ser];
                            }
                            var algo3=algo2.slice(1, algo2.length);
                            guardaEstado.push(algo3);
                            guardaNombre.splice(0, guardaNombre.length);
                        }
                    }
                }while(guardaNombre.length!=0);

                guardaEstado
            
                var tro=0, tra=0, tru=0, validadorDelNombre=0, guardaLlegada=[], ingresaLlegada=[], ingresoalgo="k";
                do{
                    do{
                        do{
                    if(guardaEstado[tro]==estadoDES[tra][0]){
                        var analisis=matrizDES[tra][tru].split("");
                        for(var two=0;two<analisis.length;two++){
                            if(analisis[two]==";"){
                                validadorDelNombre=1;
                            }
                        }
                            if(validadorDelNombre==1){
                                var var3=0;
                                do{
                                    for(var wq=0;wq<analisis.length;wq++){
                                        if(analisis[wq]==";"){
                                            var3=1;
                                        }
                                    }
                                    if(var3==1){
                                        for(var twerk=0;analisis[twerk]!=";";twerk++){
                                            ingresoalgo=ingresoalgo+analisis[twerk];
                                        }
                                        var algo=ingresoalgo.slice(1, ingresoalgo.length);
                                        guardaLlegada.push(algo);
                                        do{
                                            analisis.splice(0,1);
                                        }while(analisis[1]==";");
                                        analisis.splice(0,1);
                                        ingresoalgo="k", var3=0;
                                    }else{
                                        if(var3==0){
                                            var algo2="k";
                                            for(var ser=0;ser<analisis.length;ser++){
                                                algo2=algo2+analisis[ser];
                                            }
                                            var algo3=algo2.slice(1, algo2.length);
                                            guardaLlegada.push(algo3);
                                            analisis.splice(0, analisis.length); 
                                            var3=2; 
                                        }
                                    }
                                }while(var3!=2);
                                tra++;
                            }else{
                                if(validadorDelNombre==0){
                                    guardaLlegada.push(matrizDES[tra][tru]);
                                }
                                tra++;
                            }
                        }else{
                            tra++;
                        }
                    }while(tra<estadoDES.length);
                        tro++, tra=0;
                    }while(tro<guardaEstado.length);
                    guardaLlegada.sort();
                    var unicos = Array.from(new Set(guardaLlegada));
                    var ka="k";
                    for(var twf=0;twf<unicos.length;twf++){
                        ka=ka+";"+unicos[twf];
                    }
                    var ahoraSi=ka.slice(2, ka.length);
                    ingresaLlegada.push(ahoraSi);
                    guardaLlegada=[];
                    tru++, tra=0, tro=0;
                }while(tru<alfaDES.length);
                matrizDES.push(ingresaLlegada);
            }
            b++, esCombinado=0;
                if(b<alfaDES.length){
                    a++;
                    b=0;
                }
        }while(a<matrizDES.length);
        matrizDES
        estadoDES
        
    return[matrizDES, estadoDES];
}

function convertirAFND (estadoAFND, transAFND){//Solo ingresar automatas finitos no deterministas
    var eAUX=[], tranAUX=[], aAUX=[];
    eAUX=estadoAFND, tranAUX=transAFND;
    for(var ret=1; ret<alfabeto.length;ret++){
        aAUX.push(alfabeto[ret]);
    }

    var matrizDestinos=[]; ingresoDestino=[], validaAlfabeto=[], v=0, x=0, k=0, cont1=0;
    do{
        do{
            for(x;x<tranAUX.length;x++){
                if(eAUX[v][0]==tranAUX[x][0] && aAUX[k]==tranAUX[x][1]){
                    cont1++;
                }
            }
            validaAlfabeto.push(cont1);
            cont1=0,x=0, k++;
        }while(k<aAUX.length);
        console.log(validaAlfabeto);
        k=0, x=0;
        var n=0;
        do{
            if(validaAlfabeto[n]==0){
                ingresoDestino.push("NX");
                n++;
            }else{
                if(validaAlfabeto[n]==1){
                    var ñ=0
                    do{
                        if(eAUX[v][0]==tranAUX[x][0] && aAUX[n]==tranAUX[x][1]){
                            ingresoDestino.push(tranAUX[x][2]);
                            ñ=1;
                        }else{
                            x++;
                        }
                    }while(ñ==0);
                    x=0, n++;
                }
                else{
                    if(validaAlfabeto[n]>1){
                        var NNombre="k", estadosMM=[];
                        do{
                            if(eAUX[v][0]==tranAUX[x][0] && aAUX[n]==tranAUX[x][1]){
                                estadosMM.push(tranAUX[x][2]);
                                x++;
                            }else{
                                x++;
                            }
                        }while(x<tranAUX.length);
                        estadosMM.sort();
                        for(var por=0;por<estadosMM.length;por++){
                            NNombre=NNombre+";"+estadosMM[por];
                        }
                        var Nombre=NNombre.slice(2);
                        estadosMM=[];
                        ingresoDestino.push(Nombre), NNombre="k", x=0, n++;
                    }
                }
            }
        }while(n<validaAlfabeto.length);
    matrizDestinos.push(ingresoDestino);
        ingresoDestino=[], validaAlfabeto=[], x=0, n=0, k=0, v++;
    }while(v<eAUX.length);

    console.log(matrizDestinos);
    console.log(eAUX);

    var ingresoVariable=[], teo=0, wet=0, contador=1;
    do{
        if(matrizDestinos[teo][wet]=="NX"){
            matrizDestinos[teo].splice(wet, 1, "Nuevo"+contador);
            for(var hg=0; hg<aAUX.length;hg++){
                ingresoVariable.push("Nuevo"+contador);
            }
            matrizDestinos.push(ingresoVariable);
            eAUX.push(["Nuevo"+contador,"n"]);
            ingresoVariable=[];
            wet++, contador++;
            if(wet>aAUX.length){
                wet=0, teo++;
            }
        }else{
            wet++;
            if(wet>aAUX.length){
                wet=0, teo++;
            }
        }
    }while(teo<matrizDestinos.length);
    console.log(matrizDestinos);
    console.log(eAUX);

    const [matrizConvertida, estadoConvertido]=agregaEstados(matrizDestinos, eAUX, aAUX);
    
    var transFinalAFND=[];
    var ingreso3=[], nivelEstado=0, nivelAlfa=0;
    do{
        ingreso3.push(estadoConvertido[nivelEstado][0]);
        ingreso3.push(aAUX[nivelAlfa]);
        ingreso3.push(matrizConvertida[nivelEstado][nivelAlfa]);
        transFinalAFND.push(ingreso3);
        ingreso3=[];
        nivelAlfa++;
        if(nivelAlfa==aAUX.length){
            nivelEstado++, nivelAlfa=0;
        }
    }while(nivelEstado<estadoConvertido.length);
    console.log(transFinalAFND);
    console.log(estadoConvertido);
    return[estadoConvertido, transFinalAFND];

}

//Extra: Identificar si el Automata es AFND o no

function esafnd1 (transicion,Estados1,alfabetoEsAFND){
    var j=0,i=0, cont=0, cont2=0, tamestados=Estados1.length, T=[], E=[], A=[];
    for(var rio=1;rio<alfabetoEsAFND.length;rio++){
        A.push(alfabetoEsAFND[rio]);
    }
    T=transicion, E=Estados1;
    do{
        do{
            if(A[i]==T[j][1]){
                cont++;
                j++;
                
            }
            else{
                j++;
            }
        }while(j<T.length);
        j=0;
        console.log(cont);
        console.log(tamestados);
        
        if(cont==tamestados){
            cont2++;
            i++;
            cont=0;
            
        }
        else{
            
            cont=0;
            i++;
        }
    }while(i<A.length);
        if(cont2==A.length){
            console.log("Es afd");
            return 0;
        }
        else{
            console.log("No es afd");
            return 1;
    } 
}


// 2.c Simplificar elementos de las operaciones
/** 2.c.1 Unión */
function unionC (Estados1, Estados2, Alfabeto, Transicion1, Transicion2) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = ''
    
    //Nuevo Automata
    var neoEstados = [['qE', 'i']], neoAlfabeto = [], neoTransicion = [];

    /* Dejamos el Alfabeto en el nuevo Automata */
    neoAlfabeto = Alfabeto.slice();
    
    /* Dejamos los Estados en el nuevo Automata */
    //Además, cambiamos los Iniciales por No Finales.
    //Primero con el Automata N°1.
    for (let i = 0; i < Estados1.length; i++) {
        if (Estados1[i][1] === 'i') {
            aux = Estados1[i];
            aux[1] = 'n';
            neoEstados.push(aux);
        }
        else {
            if (Estados1[i][1] === 'if') {
                aux = Estados1[i];
                aux[1] = 'f';
                neoEstados.push(aux);
            }
            else {
                neoEstados.push(Estados1[i]);
            }
        }
        
    }
    console.log("Guardamos los primeros Estados a nuestro nuevo Automata : [" + neoEstados + "]");
    //Luego, con el Automata N°2.
    for (let i = 0; i < Estados2.length; i++) {
        if (Estados2[i][1] === 'i') {
            aux = Estados2[i];
            aux[1] = 'n';
            neoEstados.push(aux);
        }
        else {
            if (Estados2[i][1] === 'if') {
                aux = Estados2[i];
                aux[1] = 'f';
                neoEstados.push(aux);
            }
            else {
                neoEstados.push(Estados2[i]);
            }
        }
    }
	console.log("Y listo, nuestro Automata posee todos los Estados que necesitamos : [" + neoEstados + "]");

    /* Dejamos las transiciones en el nuevo Automata */
    //Primero con el Automata N°1.
    aux = Transicion1.slice();
    for (let i = 0; aux.length != 0; i++) {
        if (i === 0){
            neoTransicion[i] = [neoEstados[0][0], 'E', Estados1[0][0]];
            i++;
            neoTransicion[i] = [neoEstados[0][0], 'E', Estados2[0][0]];
        }
        else 
            neoTransicion[i] = aux.shift();
    }
    //Luego, con el Automata N°2. 
    aux = Transicion2.slice();
    for (let i = neoTransicion.length; aux.length != 0; i++) {
        neoTransicion[i] = aux.shift();
    }
    console.log("Obtenemos todas las transciones para nuestro nuevo Automata : [" + neoTransicion + "]");
   
    var esTarde = esafnd1(neoTransicion,neoEstados,neoAlfabeto);
   
    if(esTarde == 0){
        var[state1, transition1, alphabet1] = simplificar(neoEstados, neoTransicion, neoAlfabeto);
    }else{
        var[estado1AFND, transicion1AFND] = convertirAFND(neoEstados, neoTransicion);
        var[state1, transition1, alphabet1] = simplificar(estado1AFND, transicion1AFND, neoAlfabeto);
    }


    // Lo imprime a la pagina
    var unionHTML= document.getElementById('mostrar-calculoC');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Union simplificada';
    unionHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+ state1 ;
    unionHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Alfabeto: '+alphabet1;
    unionHTML.appendChild(alfabeto);
    // Transicion
    var transiciones = document.createElement("h3");
    transiciones.textContent = 'Transicion: '+transition1;
    unionHTML.appendChild(transiciones);
    
    return [state1, alphabet1, transition1];
}

/** 2.c.2 Complemento */
function complementoC1 (E) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = ''

    for (let i = 0; i < E.length; i++) {
        if (E[i][1] == 'f') {
            E[i][1] = 'n';
            console.log(E[i] + " pasó de Final a No Final");
        }
        else {
            if (E[i][1] == 'n'){
                E[i][1] = 'f'
                console.log(E[i] + " pasó de No Final a Final");
            }
            else {
                if (E[i][1] == 'i') {
                    E[i][1] = 'if';
                    console.log(E[i] + " pasó de Inicial a Inicial Final");
                }
                else {
                    if (E[i][1] == 'if') {
                        E[i][1] = 'i';
                        console.log(E[i] + " pasó de Inicial Final a Inicial");
                    }
                }
            }
        }
    }
    var sonLas1 = esafnd1(transicion1,E,alfabeto);
   
    if(sonLas1 == 0){
        var[state1, transition1, alphabet1] = simplificar(E, transicion1, alfabeto);
    }else{
        var[estado1AFND, transicion1AFND] = convertirAFND(E, transicion1);
        var[state1, transition1, alphabet1] = simplificar(estado1AFND, transicion1AFND, alfabeto);
    }

    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = ''
    // Lo imprime a la pagina
    var complementoHTML= document.getElementById('mostrar-calculoC');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Complemento simplificado';
    complementoHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+state1;
    complementoHTML.appendChild(estados);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Transiciones: '+transition1;
    complementoHTML.appendChild(estados);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Alfabeto: '+alphabet1;
    complementoHTML.appendChild(estados);
    // Retorna la variable
    return E;
}
function complementoC2 (E) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = ''

    for (let i = 0; i < E.length; i++) {
        if (E[i][1] == 'f') {
            E[i][1] = 'n';
            console.log(E[i] + " pasó de Final a No Final");
        }
        else {
            if (E[i][1] == 'n'){
                E[i][1] = 'f'
                console.log(E[i] + " pasó de No Final a Final");
            }
            else {
                if (E[i][1] == 'i') {
                    E[i][1] = 'if';
                    console.log(E[i] + " pasó de Inicial a Inicial Final");
                }
                else {
                    if (E[i][1] == 'if') {
                        E[i][1] = 'i';
                        console.log(E[i] + " pasó de Inicial Final a Inicial");
                    }
                }
            }
        }
    }
    var sonLas1 = esafnd1(transicion2,E,alfabeto);
   
    if(sonLas1 == 0){
        var[state1, transition1, alphabet1] = simplificar(E, transicion2, alfabeto);
    }else{
        var[estado1AFND, transicion1AFND] = convertirAFND(E, transicion2);
        var[state1, transition1, alphabet1] = simplificar(estado1AFND, transicion1AFND, alfabeto);
    }

    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = ''
    // Lo imprime a la pagina
    var complementoHTML= document.getElementById('mostrar-calculoC');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Complemento simplificado';
    complementoHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+state1;
    complementoHTML.appendChild(estados);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Transiciones: '+transition1;
    complementoHTML.appendChild(estados);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Alfabeto: '+alphabet1;
    complementoHTML.appendChild(estados);
    // Retorna la variable
    return E;
}

/** 2.c.3 Concatenación */
function ConcatenacionC (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = '';

    var neoEstados = [], neoAlfabeto = [], neoTransiciones = [];

    // Guardamos los Estados y las Transiciones del Automata 1 en el nuevo Automata.
    neoEstados = Estado_1.slice();
    neoTransiciones = Transicion_1.slice();

    /** ---- */
    // Guardamos el Alfabeto
    neoAlfabeto = Alfabeto.slice();

    /** ---- */
    //Procedemos a generar las nuevas Transiciones
    let aux_estados = Estado_2.slice();
    for (let i = 0; i < aux_estados.length; i++) {
        for (let k = 0; k < neoAlfabeto.length; k++) {
            for (let q = 0; q < neoEstados.length; q++) {
                if (neoEstados[q][1] == 'f' || neoEstados[q][1] == 'if') {
                    if (neoTransiciones[i][1] != neoAlfabeto[k]) {
                        var aux_transiciones = [neoEstados[q][0], neoAlfabeto[k], aux_estados[i][0]];
                        neoTransiciones.push(aux_transiciones);
                    }
                }
            }
        }
    }
    // Luego guardamos el resto de Transiciones.
    for (let i = 0; i < Transicion_2.length; i++) {
        neoTransiciones.push(Transicion_2[i]);
    }
    console.log("Así es como queda la nueva Transición : [" + neoTransiciones + "]");

    /** ---- */
    // Guardamos el resto de los Estados.
    console.log(aux_estados[0][1])
    for (let i = neoEstados.length; aux_estados != 0; i++) {
        neoEstados[i] = aux_estados.shift();
        if (neoEstados[i][1] == 'i') {
            neoEstados[i][1] = 'n';
        }
    }
    console.log("Continuamos con como queda los nuevos Estados : [" + neoEstados + "]");

    // Si el Automata 2 posee un Estado Inicial Final dejamos todo como está, a excepción del Estado Inicial que pasa a ser No Final.
    // En caso contrario, los Estados Finales del Automata 1 pasan a ser No Finales.
    aux_estados = Estado_2.slice();
    if (aux_estados[0][1] != 'if') {
        for (let i = 0; i < neoEstados.length - aux_estados.length; i++) {
            if (neoEstados[i][1] == 'f') {
                neoEstados[i][1] = 'n';
                
            }
            else {
                if (neoEstados[i][1] == 'if') {
                    neoEstados[i][1] = 'i';
                }
            }
        }
    }
    else {
        for (let i = 0; i < neoEstados.length; i++) {
            if (aux_estados[0] == neoEstados[i]) {
                neoEstados[i][1] = 'f';
            }
        }
    }

    var sonLas2 = esafnd1(neoTransiciones,neoEstados,neoAlfabeto);
   
    if(sonLas2 == 0){
        var[state1, transition1, alphabet1] = simplificar(neoEstados, neoTransiciones, neoAlfabeto);
    }else{
        var[estado1AFND, transicion1AFND] = convertirAFND(neoEstados, neoTransiciones);
        var[state1, transition1, alphabet1] = simplificar(estado1AFND, transicion1AFND, neoAlfabeto);
    }


    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = '';
    // Lo imprime a la pagina
    var concatenacionHTML= document.getElementById('mostrar-calculoC');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Concatenación simplificada';
    concatenacionHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+state1;
    concatenacionHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Alfabeto:  '+alphabet1;
    concatenacionHTML.appendChild(alfabeto);
    // Transiciones
    var transiciones = document.createElement("h3");
    transiciones.textContent = 'Transiciones: '+transition1;
    concatenacionHTML.appendChild(transiciones);
    
    /** ---- */
    // Retornamos el nuevo Automata.
    console.log("Después de todos los cambios, así queda nuestro Automata : ");
    console.log("[" + neoEstados + "], [" + neoAlfabeto + "], [" + neoTransiciones + "]");
    return [neoEstados, neoAlfabeto, neoTransiciones];
}

/** 2.c.4 Intersección */ 
function InterseccionC (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2) {
    // limpia la zona para mostrarlo
    document.getElementById('mostrar-calculoC').innerHTML = '';

    var Automata_neo = [], Estados_neo = [], Alfabeto_neo = [], Transicion_neo = [];
    
    // Para obtener la intersección debemos calcular lo siguiente:
    // (L1 ∩ L2) = (L1^c ∪ L2^c)^c
    // Obtenemos los complementos de ambos Estados.
    Estado_1 = complemento(Estado_1);
    console.log("Estos son los elementos del Estado 1 : [" + Estado_1 + "]");

    Estado_2 = complemento(Estado_2);
    console.log("Estos son los elementos del Estado 2 : [" + Estado_2 + "]");

    // Luego, calculamos la Unión.
    Automata_neo = union (Estado_1, Estado_2, Alfabeto, Transicion_1, Transicion_2);
    Estados_neo = Automata_neo[0];
    
    // Para finaliza, obtenemos el complemento del Automata Final.
    Estados_neo = complemento(Estados_neo);
    Alfabeto_neo = Automata_neo[1];
    Transicion_neo = Automata_neo[2];

    var sonLas3 = esafnd1(Transicion_neo,Estados_neo,Alfabeto_neo);
   
    if(sonLas3 == 0){
        var[state1, transition1, alphabet1] = simplificar(Estados_neo, Transicion_neo, Alfabeto_neo);
    }else{
        var[estado1AFND, transicion1AFND] = convertirAFND(Estados_neo, Transicion_neo);
        var[state1, transition1, alphabet1] = simplificar(estado1AFND, transicion1AFND, Alfabeto_neo);
    }

     // limpia la zona para mostrarlo
     document.getElementById('mostrar-calculoC').innerHTML = '';
    // Lo imprime a la pagina
    var interseccionHTML= document.getElementById('mostrar-calculoC');
    var titulo = document.createElement("h1");
    titulo.textContent = 'Intersección simplificada';
    interseccionHTML.appendChild(titulo);
    // Estados
    var estados = document.createElement("h3");
    estados.textContent = 'Estados: '+state1;
    interseccionHTML.appendChild(estados);
    // Alfabeto
    var alfabeto = document.createElement("h3");
    alfabeto.textContent = 'Alfabeto:  '+alphabet1;
    interseccionHTML.appendChild(alfabeto);
    // Transiciones
    var transiciones = document.createElement("h3");
    transiciones.textContent = 'Transiciones: '+transition1;
    interseccionHTML.appendChild(transiciones);

    return [Estados_neo, Alfabeto_neo, Transicion_neo];
}
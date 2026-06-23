// Generador de etiquetas numéricas para sectores
export function crearTexturaNumero(numero) {
    const canvasTextura = document.createElement('canvas');
    canvasTextura.width = 128; 
    canvasTextura.height = 128;
    const ctxTextura = canvasTextura.getContext('2d');
    ctxTextura.clearRect(0, 0, 128, 128);
    ctxTextura.fillStyle = 'rgba(90, 70, 50, 0.35)';
    ctxTextura.font = 'Bold 70px monospace';
    ctxTextura.textAlign = 'center'; 
    ctxTextura.textBaseline = 'middle';
    ctxTextura.fillText(numero, 64, 64);
    
    const textura = new THREE.CanvasTexture(canvasTextura);
    return new THREE.MeshBasicMaterial({ map: textura, transparent: true, depthWrite: false });
}

// Generador de Contenedores Inteligentes
export function crearTachoInteligente(colorContenedor, colorLedEmisor) {
    const grupoTacho = new THREE.Group();

    // Cuerpo (3x3x4.5 cm)
    const geomCuerpo = new THREE.BoxGeometry(3, 4.5, 3);
    const matCuerpo = new THREE.MeshStandardMaterial({ color: colorContenedor, roughness: 0.5 });
    const cuerpo = new THREE.Mesh(geomCuerpo, matCuerpo);
    cuerpo.position.y = 2.25;
    cuerpo.castShadow = true;
    cuerpo.receiveShadow = true;
    grupoTacho.add(cuerpo);

    // Tapa
    const geomTapa = new THREE.BoxGeometry(3.2, 0.4, 3.2);
    const matTapa = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.4 });
    const tapa = new THREE.Mesh(geomTapa, matTapa);
    tapa.position.y = 4.6;
    tapa.castShadow = true;
    grupoTacho.add(tapa);

    // LED IoT
    const geomLed = new THREE.SphereGeometry(0.25, 8, 8);
    const matLed = new THREE.MeshBasicMaterial({ color: colorLedEmisor });
    const led = new THREE.Mesh(geomLed, matLed);
    led.position.set(0, 5.0, 0);
    grupoTacho.add(led);

    return grupoTacho;
}

// Generador de Camión Recolector Estilizado con Tolva en Reposo (Escala robusta para electrónica)
export function crearCamionRecolector() {
    const grupoCamion = new THREE.Group();

    // --- Materiales Técnicos Avanzados ---
    const matChasis = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    const matCabina = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3, metalness: 0.1 });
    const matCuerpo = new THREE.MeshStandardMaterial({ color: 0x007722, roughness: 0.5, metalness: 0.1 }); 
    const matMecanismo = new THREE.MeshStandardMaterial({ color: 0x3a3d40, roughness: 0.5, metalness: 0.4 }); 
    const matPiston = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.1, metalness: 0.9 }); 
    const matRueda = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const matRin = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.3, metalness: 0.7 });
    const matVidrio = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 1 });
    const matNegroDetalle = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7 });

    // ============================================================================
    // 1. CHASIS Y PARACHOQUES INDUSTRIAL
    // ============================================================================
    const geomChasis = new THREE.BoxGeometry(17.0, 0.8, 7.5);
    const chasis = new THREE.Mesh(geomChasis, matChasis);
    chasis.position.y = 1.0;
    chasis.castShadow = true;
    grupoCamion.add(chasis);

    // Parachoques delantero integrado con spoiler inferior
    const geomParachoques = new THREE.BoxGeometry(0.8, 1.4, 7.8);
    const parachoques = new THREE.Mesh(geomParachoques, matChasis);
    parachoques.position.set(-8.8, 1.0, 0);
    grupoCamion.add(parachoques);

    // Tanque de combustible cilíndrico lateral
    const geomTanque = new THREE.CylinderGeometry(0.6, 0.6, 4.0, 16);
    geomTanque.rotateZ(Math.PI / 2);
    const tanqueIzq = new THREE.Mesh(geomTanque, matMecanismo);
    tanqueIzq.position.set(-1.0, 0.9, 3.85);
    grupoCamion.add(tanqueIzq);

    // ============================================================================
    // 2. CABINA DETALLADA (Corregida con vidrios 3D visibles)
    // ============================================================================
    const grupoCabina = new THREE.Group();

    // Cuerpo base de la cabina (ancho 4.5, alto 5.0, largo 7.4)
    const geomCuerpoCabina = new THREE.BoxGeometry(4.5, 5.0, 7.4);
    const cuerpoCabina = new THREE.Mesh(geomCuerpoCabina, matCabina);
    cuerpoCabina.position.y = 3.5;
    cuerpoCabina.castShadow = true;
    grupoCabina.add(cuerpoCabina);

    // PARABRISAS FRONTAL: Ahora es un Box delgado que sobresale 0.05 hacia el frente (X negativo)
    const geomParabrisas = new THREE.BoxGeometry(0.1, 2.0, 6.6);
    const parabrisas = new THREE.Mesh(geomParabrisas, matVidrio);
    // Posicionado exactamente en la cara frontal (-2.25 es el límite de la cabina en X, lo sacamos a -2.3)
    parabrisas.position.set(-2.3, 4.3, 0);
    grupoCabina.add(parabrisas);

    // VENTANAS LATERALES: También en formato Box delgado para asegurar visibilidad en Z
    const geomVentanaLat = new THREE.BoxGeometry(1.8, 1.6, 0.1);

    const ventIzq = new THREE.Mesh(geomVentanaLat, matVidrio);
    ventIzq.position.set(-0.4, 4.3, 3.71); // Sobresale en Z positivo

    const ventDer = new THREE.Mesh(geomVentanaLat, matVidrio);
    ventDer.position.set(-0.4, 4.3, -3.71); // Sobresale en Z negativo
    grupoCabina.add(ventIzq, ventDer);

    // Rejilla de radiador frontal negra
    const geomRejilla = new THREE.BoxGeometry(0.1, 1.4, 4.5);
    const rejilla = new THREE.Mesh(geomRejilla, matNegroDetalle);
    rejilla.position.set(-2.3, 2.3, 0);
    grupoCabina.add(rejilla);

    // Faros delanteros integrados
    const geomFaro = new THREE.BoxGeometry(0.15, 0.4, 0.8);
    const faroIzq = new THREE.Mesh(geomFaro, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    faroIzq.position.set(-2.3, 1.6, 2.8);
    const faroDer = faroIzq.clone();
    faroDer.position.z = -2.8;
    grupoCabina.add(faroIzq, faroDer);

    grupoCabina.position.set(-5.5, 0, 0);
    grupoCamion.add(grupoCabina);

    // ============================================================================
    // 3. CAJA COMPACTADORA (Estructura fija simétrica)
    // ============================================================================
    const grupoCaja = new THREE.Group();
    
    // Paneles exteriores de la tolva principal
    const techoCaja = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.2, 7.4), matCuerpo);
    techoCaja.position.y = 5.8;
    
    const paredIzq = new THREE.Mesh(new THREE.BoxGeometry(11.0, 5.6, 0.2), matCuerpo);
    paredIzq.position.set(0, 2.9, 3.6);
    const paredDer = paredIzq.clone();
    paredDer.position.z = -3.6;

    const paredFrontal = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.6, 7.0), matCuerpo);
    paredFrontal.position.set(-5.4, 2.9, 0);

    grupoCaja.add(techoCaja, paredIzq, paredDer, paredFrontal);
    grupoCaja.position.set(2.5, 1.2, 0);
    grupoCamion.add(grupoCaja);

    // Guardabarros trasero plano de protección industrial sobre ruedas gemelas
    const guardabarrosTrasero = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.1, 7.42), matNegroDetalle);
    guardabarrosTrasero.position.set(6.5, 2.7, 0);
    grupoCamion.add(guardabarrosTrasero);

    // ============================================================================
    // 4. TOLVA TRASERA ARTICULADA (Cerrada en reposo: 0°)
    // ============================================================================
    // Guardamos la tolva en una propiedad del grupo para poder rotarla dinámicamente después
    const grupoElevador = new THREE.Group();
    grupoCamion.userData = { portonTrasero: grupoElevador }; 

    // Cuerpo de la tolva de carga trasera
    const geomPortonPrincipal = new THREE.BoxGeometry(3.2, 5.6, 7.38);
    const portonTolva = new THREE.Mesh(geomPortonPrincipal, matMecanismo);
    // Posición local ajustada para que el volumen calce perfectamente debajo del pivote
    portonTolva.position.set(1.6, -2.8, 0);
    portonTolva.castShadow = true;
    grupoElevador.add(portonTolva);

    // Estribo trasero inferior plano para operarios
    const estribo = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 6.4), matChasis);
    estribo.position.set(3.2, -5.55, 0);
    grupoElevador.add(estribo);

    // Pistones Hidráulicos alineados en reposo
    const geomCilindroPiston = new THREE.CylinderGeometry(0.16, 0.16, 3.2, 8);
    geomCilindroPiston.rotateZ(Math.PI / 2.3); // Inclinación natural de reposo estructural
    const camisaPiston = new THREE.Mesh(geomCilindroPiston, matMecanismo);
    camisaPiston.position.set(-0.2, -2.5, 3.75);
    
    const geomEjePiston = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 8);
    geomEjePiston.rotateZ(Math.PI / 2.3);
    const vástagoPiston = new THREE.Mesh(geomEjePiston, matPiston);
    vástagoPiston.position.set(0.6, -1.9, 3.75);
    grupoElevador.add(camisaPiston, vástagoPiston);

    // Duplicar pistón al lado derecho
    const camisaPistonDer = camisaPiston.clone(); camisaPistonDer.position.z = -3.75;
    const vástagoPistonDer = vástagoPiston.clone(); vástagoPistonDer.position.z = -3.75;
    grupoElevador.add(camisaPistonDer, vástagoPistonDer);

    // Luces traseras LED rojas de freno
    const faroStopIzq = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.4, 1.2), new THREE.MeshBasicMaterial({ color: 0xcc0000 }));
    faroStopIzq.position.set(3.21, -4.8, 2.6);
    const faroStopDer = faroStopIzq.clone();
    faroStopDer.position.z = -2.6;
    grupoElevador.add(faroStopIzq, faroStopDer);

    // UBICACIÓN DEL PIVOTE SUPERIOR REAL
    // X=8.0 (final de la caja verde), Y=6.8 (ras del techo)
    grupoElevador.position.set(8.0, 6.8, 0);
    
    // --- CONTROL DE ANIMACIÓN ---
    // En reposo (0 rad), el portón cae recto y sella la caja de basura de forma limpia.
    // Para simular el levantamiento del servo a 70°, cambia este valor a: -1.22
    grupoElevador.rotation.z = 0; 
    
    grupoCamion.add(grupoElevador);

    // ============================================================================
    // 5. EJES Y RUEDAS CON RINES METÁLICOS (Ajuste de escala fina)
    // ============================================================================
    const geomNeumatico = new THREE.CylinderGeometry(1.3, 1.3, 1.1, 32);
    geomNeumatico.rotateX(Math.PI / 2);
    const geomRin = new THREE.CylinderGeometry(0.75, 0.75, 1.15, 16);
    geomRin.rotateX(Math.PI / 2);

    const posicionesRuedas = [
        { x: -5.5, z: 3.35 },  // Delantera Izquierda
        { x: -5.5, z: -3.35 }, // Delantera Derecha
        { x: 3.0, z: 3.35 },   // Trasera 1 Izquierda
        { x: 3.0, z: -3.35 },  // Trasera 1 Derecha
        { x: 5.8, z: 3.35 },   // Trasera 2 Izquierda
        { x: 5.8, z: -3.35 }   // Trasera 2 Derecha
    ];

    posicionesRuedas.forEach(pos => {
        const ruedaCompleta = new THREE.Group();
        const llanta = new THREE.Mesh(geomNeumatico, matRueda);
        llanta.castShadow = true;
        
        const rin = new THREE.Mesh(geomRin, matRin);
        rin.castShadow = true;
        
        ruedaCompleta.add(llanta, rin);
        ruedaCompleta.position.set(pos.x, 1.3, pos.z);
        grupoCamion.add(ruedaCompleta);
    });

    return grupoCamion;
}

// --- CONSTRUCTOR: ÁRBOL FRONDOSO (ESTILO MANGO / REDONDEADO) ---
export function crearArbol() {
    const grupoArbol = new THREE.Group();

    const matTronco = new THREE.MeshStandardMaterial({ color: 0x4e342e, roughness: 0.9 }); // Marrón corteza más denso
    const matHojas = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.7 });  // Verde follaje intenso

    // 1. Tronco principal
    const geomTronco = new THREE.CylinderGeometry(0.25, 0.4, 2.5, 8);
    const tronco = new THREE.Mesh(geomTronco, matTronco);
    tronco.position.y = 1.25; // Centrado a la mitad de su altura
    tronco.castShadow = true;
    grupoArbol.add(tronco);

    // 2. Copa Redondeada (Estilo Dodecaedro Low-Poly)
    // DodecahedronGeometry(radio, detalle). Detalle 0 u 1 mantiene las caras planas tipo maqueta.
    const geomCopa = new THREE.DodecahedronGeometry(2.0, 1); 
    const copa = new THREE.Mesh(geomCopa, matHojas);
    
    // Posicionamiento: Elevado para que cubra la parte superior del tronco
    copa.position.y = 3.5;
    
    // Escalado asimétrico: Los árboles de mango tienden a ensancharse horizontalmente 
    // en lugar de crecer puramente hacia arriba como las coníferas.
    copa.scale.set(1.2, 0.8, 1.2); 
    copa.castShadow = true;
    grupoArbol.add(copa);

    return grupoArbol;
}

// --- CONSTRUCTOR: CASA A DOS AGUAS DE DOS PISOS (SÓLIDA) ---
export function crearCasaResidencial() {
    const grupoCasa = new THREE.Group();

    // --- Materiales Técnicos ---
    const matParedes = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.6 }); 
    const matTejado = new THREE.MeshStandardMaterial({ color: 0x2b2e33, roughness: 0.5 }); // Antracita mate
    const matMarcos = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 }); 
    const matVidrio = new THREE.MeshStandardMaterial({ color: 0x223344, roughness: 0.2, metalness: 0.6 });

    // ============================================================================
    // 1. CÁSCARA PRINCIPAL (Base de la casa: Ancho X=6.5, Alto Y=5.5, Fondo Z=6.0)
    // ============================================================================
    const geomCuerpo = new THREE.BoxGeometry(6.5, 5.5, 6.0);
    const cuerpo = new THREE.Mesh(geomCuerpo, matParedes);
    cuerpo.position.y = 5.5 / 2; // 2.75
    cuerpo.castShadow = true;
    cuerpo.receiveShadow = true;
    grupoCasa.add(cuerpo);

    // ============================================================================
    // 2. RELLENO TRIANGULAR (Prisma de 3 lados que tapa el hueco del tejado)
    // ============================================================================
    // CylinderGeometry(radioSup, radioInf, altura/largo, segmentosRadiales)
    // Usamos 3 segmentos radiales para crear un prisma triangular perfecto
    const geomRelleno = new THREE.CylinderGeometry(2.0, 2.0, 6.0, 5);
    // Lo rotamos para que el largo corra en el eje Z y una de las caras quede plana abajo
    geomRelleno.rotateX(Math.PI / 2);
    geomRelleno.rotateZ(Math.PI); // Voltear la punta hacia arriba

    const rellenoTriangular = new THREE.Mesh(geomRelleno, matParedes);
    // Escalamos el prisma para que calce exactamente con el ancho (X=6.5) y le damos altura (Y=1.3)
    rellenoTriangular.scale.set(1.625, 1.3, 1.0);
    // Se posiciona justo encima del bloque base de la casa
    rellenoTriangular.position.set(0, 4.8, 0);
    rellenoTriangular.castShadow = true;
    grupoCasa.add(rellenoTriangular);

    // ============================================================================
    // 3. CAPAS DEL TEJADO (Faldones protectores que sobresalen como aleros)
    // ============================================================================
    // Faldón Derecho
    const alaDer = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.15, 6.4), matTejado);
    alaDer.position.set(1.7, 0.9, 0);
    alaDer.rotation.z = -Math.PI / 6; // Inclinación simétrica 30°
    alaDer.castShadow = true;

    // Faldón Izquierdo
    const alaIzq = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.15, 6.4), matTejado);
    alaIzq.position.set(-1.7, 0.9, 0);
    alaIzq.rotation.z = Math.PI / 6;
    alaIzq.castShadow = true;

    const grupoTejado = new THREE.Group();
    grupoTejado.add(alaDer, alaIzq);
    grupoTejado.position.set(0, 5.5, 0); // Ubicado en la cumbrera más alta
    grupoCasa.add(grupoTejado);

    // ============================================================================
    // 4. DETALLES SUPERFICIALES (Puerta y Ventanas de 2 Pisos)
    // ============================================================================
    // Piso 1: Puerta Izquierda
    const puerta = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.05), matMarcos);
    puerta.position.set(-1.5, 1.1, 3.01);
    grupoCasa.add(puerta);

    // Piso 1: Ventana Derecha
    const ventP1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.05), matVidrio);
    ventP1.position.set(1.5, 1.4, 3.01);
    grupoCasa.add(ventP1);

    // Piso 2: Ventana Izquierda
    const ventP2Izq = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.05), matVidrio);
    ventP2Izq.position.set(-1.5, 4.0, 3.01);
    grupoCasa.add(ventP2Izq);

    // Piso 2: Ventana Derecha
    const ventP2Der = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.05), matVidrio);
    ventP2Der.position.set(1.5, 4.0, 3.01);
    grupoCasa.add(ventP2Der);

    return grupoCasa;
}

// --- CONSTRUCTOR MODULAR: EDIFICIO PARAMÉTRICO (2, 3 o 4 pisos) ---
export function crearEdificioPlano(numPisos = 3, colorHex = 0x90caf9) {
    const grupoEdificio = new THREE.Group();

    // Constantes de diseño por piso
    const altoPorPiso = 3.5;
    const altoEstructura = numPisos * altoPorPiso + 1.5; // Altura dinámica según los pisos

    const matBloque = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });
    const matTechoPlano = new THREE.MeshStandardMaterial({ color: 0x424242, roughness: 0.8 });
    const matVidrio = new THREE.MeshStandardMaterial({ color: 0x01579b, metalness: 0.7, roughness: 0.2 });

    // 1. Estructura base (Ancho X=7, Alto variable, Fondo Z=7)
    const geomBloque = new THREE.BoxGeometry(7, altoEstructura, 7);
    const bloque = new THREE.Mesh(geomBloque, matBloque);
    bloque.position.y = altoEstructura / 2;
    bloque.castShadow = true;
    bloque.receiveShadow = true;
    grupoEdificio.add(bloque);

    // 2. Techo cuadrado plano (Borde superior)
    const geomTecho = new THREE.BoxGeometry(7.2, 0.4, 7.2);
    const techo = new THREE.Mesh(geomTecho, matTechoPlano);
    techo.position.y = altoEstructura + 0.2;
    techo.castShadow = true;
    grupoEdificio.add(techo);

    // 3. Matriz dinámica de ventanas frontales
    const geomVentana = new THREE.BoxGeometry(1.2, 1.8, 0.1);
    
    for (let piso = 0; piso < numPisos; piso++) {
        for (let col = 0; col < 2; col++) {
            const ventana = new THREE.Mesh(geomVentana, matVidrio);
            const posX = (col === 0) ? -1.8 : 1.8;
            // Cálculo de altura relativo a cada nivel
            const posY = 2.2 + (piso * altoPorPiso);
            ventana.position.set(posX, posY, 3.51); // Fachada frontal (Z positivo)
            grupoEdificio.add(ventana);
        }
    }

    return grupoEdificio;
}

// --- CONSTRUCTOR: AUTOMÓVIL COMÚN SEDÁN (ESTILO LOW-POLY MAQUETA) ---
export function crearAutomovil(colorHex = 0xd32f2f) {
    const grupoAuto = new THREE.Group();

    // --- Materiales Técnicos ---
    const matChasis = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    const matCarroceria = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.4, metalness: 0.2 });
    const matVidrio = new THREE.MeshStandardMaterial({ color: 0x112233, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.85 });
    const matRueda = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
    const matRin = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.4, metalness: 0.6 });
    const matDetalle = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6 });

    // ============================================================================
    // 1. BASE / CHASIS INTERIOR
    // ============================================================================
    const chasis = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.2, 2.3), matChasis);
    chasis.position.y = 0.3;
    chasis.castShadow = true;
    grupoAuto.add(chasis);

    // ============================================================================
    // 2. CARROCERÍA (Cuerpo Bajo: Largo X=6.0, Alto Y=0.8, Ancho Z=2.4)
    // ============================================================================
    const cuerpoBajo = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.8, 2.4), matCarroceria);
    cuerpoBajo.position.y = 0.7;
    cuerpoBajo.castShadow = true;
    cuerpoBajo.receiveShadow = true;
    grupoAuto.add(cuerpoBajo);

    // ============================================================================
    // 3. CABINA / HABITÁCULO (Estilo de 3 Volúmenes Sedán)
    // ============================================================================
    const cabina = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.7, 2.2), matCarroceria);
    cabina.position.set(-0.2, 1.45, 0); 
    cabina.castShadow = true;
    grupoAuto.add(cabina);

    // Parabrisas Delantero
    const parabrisas = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 2.0), matVidrio);
    parabrisas.position.set(1.21, 1.45, 0); // <- CORREGIDO: Todo en minúsculas
    grupoAuto.add(parabrisas);

    // Luneta Trasera
    const luneta = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.6, 2.0), matVidrio);
    luneta.position.set(-1.61, 1.45, 0);
    grupoAuto.add(luneta);

    // Cristales Laterales
    const vidriosIzq = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 0.05), matVidrio);
    vidriosIzq.position.set(-0.2, 1.45, 1.11);
    const vidriosDer = vidriosIzq.clone();
    vidriosDer.position.z = -1.11;
    grupoAuto.add(vidriosIzq, vidriosDer);

    // Parantes de puertas
    const paranteCentroIzq = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.02), matDetalle);
    paranteCentroIzq.position.set(-0.2, 1.45, 1.12);
    const paranteCentroDer = paranteCentroIzq.clone();
    paranteCentroDer.position.z = -1.12;
    grupoAuto.add(paranteCentroIzq, paranteCentroDer);

    // ============================================================================
    // 4. DETALLES DE MAQUETA (Faros)
    // ============================================================================
    const faroDelIzq = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    faroDelIzq.position.set(3.01, 0.8, 0.9);
    const faroDelDer = faroDelIzq.clone();
    faroDelDer.position.z = -0.9;
    grupoAuto.add(faroDelIzq, faroDelDer);

    const faroTrasIzq = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.5), new THREE.MeshBasicMaterial({ color: 0xcc0000 }));
    faroTrasIzq.position.set(-3.01, 0.8, 0.85);
    const faroTrasDer = faroTrasIzq.clone();
    faroTrasDer.position.z = -0.85;
    grupoAuto.add(faroTrasIzq, faroTrasDer);

    // ============================================================================
    // 5. EJES Y RUEDAS
    // ============================================================================
    const geomNeumatico = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 16);
    geomNeumatico.rotateX(Math.PI / 2);
    const geomRin = new THREE.CylinderGeometry(0.25, 0.25, 0.38, 8);
    geomRin.rotateX(Math.PI / 2);

    const offsetsRuedas = [
        { x: 1.6, z: 1.15 },  
        { x: 1.6, z: -1.15 }, 
        { x: -1.6, z: 1.15 }, 
        { x: -1.6, z: -1.15 } 
    ];

    offsetsRuedas.forEach(offset => {
        const ruedaCompleta = new THREE.Group();
        const llanta = new THREE.Mesh(geomNeumatico, matRueda);
        llanta.castShadow = true;
        
        const rin = new THREE.Mesh(geomRin, matRin);
        
        ruedaCompleta.add(llanta, rin);
        ruedaCompleta.position.set(offset.x, 0.45, offset.z);
        grupoAuto.add(ruedaCompleta);
    });

    return grupoAuto;
}

// --- CONSTRUCTOR OPTIMIZADO: ZONA VERDE FACETADA (ESTILO LOW-POLY MAQUETA) ---
export function crearZonaVerde(anchoX = 7.0, largoZ = 7.0) {
    const grupoZonaVerde = new THREE.Group();

    // Material mate con alta rugosidad, estilo cartón grueso/pasto comprimido
    const matCesped = new THREE.MeshStandardMaterial({ 
        color: 0x4caf50, 
        roughness: 0.9,
        metalness: 0.05,
        flatShading: true // Fuerza el renderizado facetado de los triángulos
    }); 

    // 1. Usamos una caja con subdivisiones para poder alterar sus vértices y darle relieve
    // Ancho, Alto (grosor del bloque de pasto = 0.25), Fondo, y segmentos (6x6)
    const geomCesped = new THREE.BoxGeometry(anchoX, 0.25, largoZ, 6, 1, 6);
    
    // 2. Perturbar los vértices superiores para generar el relieve "low-poly" irregular
    const positionAttribute = geomCesped.attributes.position;
    
    for (let i = 0; i < positionAttribute.count; i++) {
        const y = positionAttribute.getY(i);
        
        // Solo alteramos los vértices de la cara superior (los que tienen Y positiva)
        if (y > 0) {
            // Añadimos una variación sutil y aleatoria en la altura (entre -0.05 y +0.08)
            const desvAlatorio = -0.05 + Math.random() * 0.13;
            positionAttribute.setY(i, y + desvAlatorio);
            
            // Movemos levemente en X y Z para romper las líneas de cuadrícula perfectas
            const desvX = (-0.1 + Math.random() * 0.2);
            const desvZ = (-0.1 + Math.random() * 0.2);
            positionAttribute.setX(i, positionAttribute.getX(i) + desvX);
            positionAttribute.setZ(i, positionAttribute.getZ(i) + desvZ);
        }
    }
    
    // Volvemos a calcular las normales para que la iluminación flatShading responda al nuevo relieve
    geomCesped.computeVertexNormals();

    const bloqueCesped = new THREE.Mesh(geomCesped, matCesped);
    
    // 3. Posicionamiento: Como ahora tiene volumen, su centro Y debe quedar a ras de suelo.
    // El bloque mide 0.25 de alto, así que Y = 0.25 / 2 = 0.125.
    // Añadimos el offset base de 0.015 para alinearlo con tus calles y edificios.
    bloqueCesped.position.y = 0.125; 
    
    bloqueCesped.castShadow = true;   // Ahora proyecta sombras sutiles en sus bordes
    bloqueCesped.receiveShadow = true; // Recibe las sombras de árboles y postes

    grupoZonaVerde.add(bloqueCesped);

    return grupoZonaVerde;
}

export function crearPlazaCivica(anchoX = 13.0, largoZ = 30.0) {
    const grupoPlaza = new THREE.Group();

    // Materiales
    const matBaseConcreto = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.75, flatShading: true });
    const matSueloCentral = new THREE.MeshStandardMaterial({ color: 0xb0bec5, roughness: 0.6 });

    // 1. Plataforma Base
    const basePlaza = new THREE.Mesh(new THREE.BoxGeometry(anchoX, 0.2, largoZ), matBaseConcreto);
    basePlaza.position.y = 0.1;
    basePlaza.receiveShadow = true;
    grupoPlaza.add(basePlaza);

    // 2. Explanada Central
    const explanadaCentro = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 4.2, 0.04, 8), matSueloCentral);
    explanadaCentro.position.y = 0.21;
    grupoPlaza.add(explanadaCentro);

    // 3. Jardineras con Borde (Integración del nuevo componente)
    const anchoJ = anchoX * 0.35;
    const largoJ = largoZ * 0.25;
    
    const offsets = [
        { x: -anchoX * 0.26, z: -largoZ * 0.32 }, { x: anchoX * 0.26, z: -largoZ * 0.32 },
        { x: -anchoX * 0.26, z: largoZ * 0.32 }, { x: anchoX * 0.26, z: largoZ * 0.32 }
    ];

    offsets.forEach(offset => {
        const jardinera = crearJardineraBorde(anchoJ, largoJ);
        jardinera.position.set(offset.x, 0.15, offset.z); 
        grupoPlaza.add(jardinera);
    });

    // 4. Mobiliario
    const bancoN = crearBancoPlaza(); bancoN.position.set(0, 0.21, -5.5); bancoN.rotation.y = 0;
    const bancoS = crearBancoPlaza(); bancoS.position.set(0, 0.21, 5.5); bancoS.rotation.y = Math.PI;
    const bancoE = crearBancoPlaza(); bancoE.position.set(5.0, 0.21, 0); bancoE.rotation.y = -Math.PI / 2;
    const bancoO = crearBancoPlaza(); bancoO.position.set(-5.0, 0.21, 0); bancoO.rotation.y = Math.PI / 2;
    
    grupoPlaza.add(bancoN, bancoS, bancoE, bancoO);

    return grupoPlaza;
}

// --- CONSTRUCTOR: PILETA DE AGUA EN REPOSO (ESTILO LOW-POLY MAQUETA) ---
export function crearPileta() {
    const grupoPileta = new THREE.Group();

    // --- Materiales Técnicos ---
    const matPiedra = new THREE.MeshStandardMaterial({ color: 0xb0bec5, roughness: 0.7, flatShading: true }); // Gris piedra claro
    const matAgua = new THREE.MeshStandardMaterial({ 
        color: 0x4fc3f7, 
        roughness: 0.1, 
        metalness: 0.8, 
        transparent: true, 
        opacity: 0.8 
    }); // Azul agua brillante traslúcido

    // ============================================================================
    // 1. ESTANQUE PRINCIPAL BASE (Borde exterior octagonal)
    // ============================================================================
    const bordeBase = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.4, 8), matPiedra);
    bordeBase.position.y = 0.2;
    bordeBase.castShadow = true;
    bordeBase.receiveShadow = true;
    grupoPileta.add(bordeBase);

    // Superficie del agua del estanque principal
    const aguaBase = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.05, 8), matAgua);
    aguaBase.position.y = 0.36;
    grupoPileta.add(aguaBase);

    // ============================================================================
    // 2. COLUMNA CENTRAL Y PLATO SEGUNDO NIVEL
    // ============================================================================
    const columna = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.2, 6), matPiedra);
    columna.position.y = 0.8;
    columna.castShadow = true;
    grupoPileta.add(columna);

    // Plato Intermedio
    const platoMedio = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.9, 0.15, 8), matPiedra);
    platoMedio.position.y = 1.35;
    platoMedio.castShadow = true;
    grupoPileta.add(platoMedio);

    // Agua del plato intermedio
    const aguaMedia = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.02, 8), matAgua);
    aguaMedia.position.y = 1.41;
    grupoPileta.add(aguaMedia);

    // ============================================================================
    // 3. PUNTA DE LA FUENTE (Pistilo superior)
    // ============================================================================
    const puntaFuente = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 0.4, 6), matPiedra);
    puntaFuente.position.y = 1.6;
    puntaFuente.castShadow = true;
    grupoPileta.add(puntaFuente);

    const chorroCenit = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), matAgua);
    chorroCenit.position.y = 1.85;
    grupoPileta.add(chorroCenit);

    return grupoPileta;
}

// --- CONSTRUCTOR: TIENDA COMERCIAL CONVENIENCIA (ENTRADA DOBLE FRONTAL/POSTERIOR) ---
export function crearTiendaTambo() {
    const grupoTambo = new THREE.Group();

    // --- Materiales ---
    const matMorado = new THREE.MeshStandardMaterial({ color: 0x7B1FA2, roughness: 0.6, flatShading: true });
    const matAmarillo = new THREE.MeshStandardMaterial({ color: 0xFFEB3B, roughness: 0.5 });
    const matVidrio = new THREE.MeshStandardMaterial({ color: 0x263238, roughness: 0.2, metalness: 0.8 });
    const matTecho = new THREE.MeshStandardMaterial({ color: 0x424242, roughness: 0.8 });

    // 1. Estructura Principal
    const geomBase = new THREE.BoxGeometry(5.5, 3.2, 5.0);
    const baseTienda = new THREE.Mesh(geomBase, matMorado);
    baseTienda.position.y = 1.6;
    baseTienda.castShadow = true;
    baseTienda.receiveShadow = true;
    grupoTambo.add(baseTienda);

    // 2. Letrero Amarillo (Perimetral)
    const geomLetrero = new THREE.BoxGeometry(5.52, 0.6, 5.02);
    const letrero = new THREE.Mesh(geomLetrero, matAmarillo);
    letrero.position.y = 3.5;
    grupoTambo.add(letrero);

    // 3. Techo
    const geomTecho = new THREE.BoxGeometry(5.3, 0.05, 4.8);
    const techo = new THREE.Mesh(geomTecho, matTecho);
    techo.position.y = 3.82;
    grupoTambo.add(techo);

    // 4. Fachadas (Frontal y Posterior)
    const geomPuerta = new THREE.BoxGeometry(1.6, 2.0, 0.1);
    
    // --- FACHADA FRONTAL (Z = +2.51) ---
    const puertaFrontal = new THREE.Mesh(geomPuerta, matVidrio);
    puertaFrontal.position.set(0, 1.0, 2.51); // Centrada
    grupoTambo.add(puertaFrontal);

    // --- FACHADA POSTERIOR (Z = -2.51) ---
    const puertaPosterior = new THREE.Mesh(geomPuerta, matVidrio);
    puertaPosterior.position.set(0, 1.0, -2.51); // Centrada en el lado opuesto
    grupoTambo.add(puertaPosterior);

    // Ventanales laterales (para que no se vea tan macizo el edificio)
    const geomVentanaLado = new THREE.BoxGeometry(0.1, 1.2, 2.0);
    
    const ventanaIzq = new THREE.Mesh(geomVentanaLado, matVidrio);
    ventanaIzq.position.set(-2.71, 1.6, 0);
    grupoTambo.add(ventanaIzq);

    const ventanaDer = new THREE.Mesh(geomVentanaLado, matVidrio);
    ventanaDer.position.set(2.71, 1.6, 0);
    grupoTambo.add(ventanaDer);

    return grupoTambo;
}

// --- CONSTRUCTOR: BANCO DE PLAZA URBANO (ESTILO LOW-POLY MAQUETA) ---
export function crearBancoPlaza() {
    const grupoBanco = new THREE.Group();

    // --- Materiales Técnicos ---
    const matMadera = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.8 }); // Listones de madera mate
    const matMetalBanco = new THREE.MeshStandardMaterial({ color: 0x263238, roughness: 0.5 }); // Soportes de metal oscuro

    // 1. Tablón de asiento
    const asiento = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.4), matMadera);
    asiento.position.y = 0.2; // Altura del asiento respecto a su propia base
    asiento.castShadow = true;
    asiento.receiveShadow = true;

    // 2. Respaldo geométrico
    const respaldo = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 0.05), matMadera);
    respaldo.position.set(0, 0.38, -0.2);
    respaldo.castShadow = true;
    respaldo.receiveShadow = true;

    // 3. Patas de metal estructural
    const pataIzq = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.46), matMetalBanco);
    pataIzq.position.set(-0.85, 0.05, -0.02);
    pataIzq.castShadow = true;
    pataIzq.receiveShadow = true;

    const pataDer = pataIzq.clone();
    pataDer.position.x = 0.85;

    // Añadir todos los elementos al grupo local
    grupoBanco.add(asiento, respaldo, pataIzq, pataDer);

    // Ajustamos el offset del grupo para que el punto de anclaje (0,0,0) sea la base de las patas
    // Así se asienta perfectamente a ras del suelo al posicionarlo.
    grupoBanco.position.y = 0.1;

    return grupoBanco;
}

// --- CONSTRUCTOR: MESA DE AJEDREZ PÚBLICA CON ASIENTOS (ESTILO LOW-POLY) ---
export function crearMesaAjedrezUrbana() {
    const grupoMesaJuego = new THREE.Group();

    // --- Materiales Técnicos ---
    const matConcretoMesa = new THREE.MeshStandardMaterial({ color: 0xb0bec5, roughness: 0.7, flatShading: true }); // Gris piedra claro
    const matAsientoConcreto = new THREE.MeshStandardMaterial({ color: 0x90a4ae, roughness: 0.75 }); // Gris un poco más oscuro
    const matMaderaDetalle = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.8 }); // Contorno de madera para las piezas
    const matTableroFaux = new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.6 }); // El patrón oscuro de los escaques

    // ============================================================================
    // 1. LA MESA CENTRAL
    // ============================================================================
    // Pata o soporte central de la mesa
    const pataMesa = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.7, 0.3), matConcretoMesa);
    pataMesa.position.y = 0.35;
    pataMesa.castShadow = true;
    grupoMesaJuego.add(pataMesa);

    // Tablero / Superficie de la mesa (Estructura cuadrada de concreto)
    const superficieMesa = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 1.0), matConcretoMesa);
    superficieMesa.position.y = 0.75;
    superficieMesa.castShadow = true;
    superficieMesa.receiveShadow = true;
    grupoMesaJuego.add(superficieMesa);

    // El recuadro del Tablero de Ajedrez (Simulado con un plano elevado un milímetro)
    // Usamos segmentos para forzar que la iluminación o el relieve denoten la cuadrícula low-poly
    const geomTablero = new THREE.PlaneGeometry(0.7, 0.7, 2, 2); 
    const tableroAjedrez = new THREE.Mesh(geomTablero, matTableroFaux);
    tableroAjedrez.rotation.x = -Math.PI / 2;
    tableroAjedrez.position.set(0, 0.801, 0); // Evitamos Z-fighting levantándolo un pelo
    tableroAjedrez.receiveShadow = true;
    grupoMesaJuego.add(tableroAjedrez);

    // ============================================================================
    // 2. LOS DOS TABURETES / ASIENTOS PEQUEÑOS (Flanqueando la mesa)
    // ============================================================================
    function crearTaburete() {
        const subGrupoTaburete = new THREE.Group();
        // Base de concreto del asiento
        const bloqueAsiento = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.4), matAsientoConcreto);
        bloqueAsiento.position.y = 0.225;
        bloqueAsiento.castShadow = true;
        bloqueAsiento.receiveShadow = true;

        // Cojín o listón superior de madera decorativa
        const topeMadera = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.42), matMaderaDetalle);
        document.position = topeMadera.position.set(0, 0.46, 0);
        topeMadera.castShadow = true;

        subGrupoTaburete.add(bloqueAsiento, topeMadera);
        return subGrupoTaburete;
    }

    // Asiento Jugador 1 (Desplazado en Z negativo)
    const asiento1 = crearTaburete();
    asiento1.position.set(0, 0, -0.8);
    
    // Asiento Jugador 2 (Desplazado en Z positivo)
    const asiento2 = crearTaburete();
    asiento2.position.set(0, 0, 0.8);

    grupoMesaJuego.add(asiento1, asiento2);

    // Ajuste de anclaje base a ras de suelo
    grupoMesaJuego.position.y = 0.0;

    return grupoMesaJuego;
}

export function crearJardineraBorde(ancho, largo) {
    const grupo = new THREE.Group();
    const matCesped = new THREE.MeshStandardMaterial({ color: 0x388e3c, roughness: 0.9, flatShading: true });
    const matBorde = new THREE.MeshStandardMaterial({ color: 0x767F82, roughness: 0.7 });

    // 1. Superficie de césped
    const cesped = new THREE.Mesh(new THREE.BoxGeometry(ancho, 0.06, largo), matCesped);
    cesped.position.y = 0.05;
    grupo.add(cesped);

    // 2. Bordes de concreto (Simulamos un marco)
    const bordeGrosor = 0.15;
    const bordeGeom = new THREE.BoxGeometry(bordeGrosor, 0.12, largo + bordeGrosor * 2);
    
    // Izquierda
    const bIzq = new THREE.Mesh(bordeGeom, matBorde);
    bIzq.position.set(-ancho/2 - bordeGrosor/2, 0.08, 0);
    
    // Derecha
    const bDer = bIzq.clone();
    bDer.position.x = ancho/2 + bordeGrosor/2;
    
    // Frente y Atrás (Ajustamos largo para no solapar esquinas)
    const bordeCrossGeom = new THREE.BoxGeometry(ancho, 0.12, bordeGrosor);
    const bFrente = new THREE.Mesh(bordeCrossGeom, matBorde);
    bFrente.position.set(0, 0.08, largo/2 + bordeGrosor/2);
    
    const bAtras = bFrente.clone();
    bAtras.position.z = -largo/2 - bordeGrosor/2;

    grupo.add(bIzq, bDer, bFrente, bAtras);
    return grupo;
}

export function crearCasaResidencialParam(
    ancho = 6.5, 
    alto = 5.5, 
    fondo = 6.0, 
    colores = {
        paredes: 0xf5f5f5,
        tejado: 0x2b2e33,
        puerta: 0x5D4037
    }
) {
    const grupoCasa = new THREE.Group();

    // ── Materiales Paramétricos ─────────────────────────────────────────────
    const matParedes = new THREE.MeshStandardMaterial({ color: colores.paredes });
    const matTejado = new THREE.MeshStandardMaterial({ color: colores.tejado });
    const matPuerta = new THREE.MeshStandardMaterial({ color: colores.puerta });

    // 1. Cuerpo Extruido
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(ancho, 0);
    shape.lineTo(ancho, alto * 0.7);
    shape.lineTo(0, alto);
    shape.lineTo(0, 0);

    const geomCuerpo = new THREE.ExtrudeGeometry(shape, { depth: fondo, bevelEnabled: false });
    const cuerpo = new THREE.Mesh(geomCuerpo, matParedes);
    cuerpo.position.set(-ancho / 2, 0, fondo / 2);
    grupoCasa.add(cuerpo);

    // 2. Techo
    const pendienteX = ancho;
    const pendienteY = alto - (alto * 0.7);
    const largoTecho = Math.sqrt(pendienteX * pendienteX + pendienteY * pendienteY);
    const angulo = Math.atan(pendienteY / pendienteX);

    const geomTecho = new THREE.BoxGeometry(largoTecho + 0.2, 0.15, fondo + 0.2);
    const techo = new THREE.Mesh(geomTecho, matTejado);
    
    techo.rotation.z = -angulo;
    
    const offsetY = alto - (largoTecho / 2) * Math.sin(angulo);
    techo.position.set(0, offsetY, fondo / 2 + 3); // Ajustado para centrar según el cuerpo
    grupoCasa.add(techo);

    // 3. Puerta
    const puerta = new THREE.Mesh(
        new THREE.BoxGeometry(ancho * 0.2, alto * 0.5, 0.1), 
        matPuerta
    );
    puerta.position.set(-1+ancho/8, alto * 0.25, fondo*1.5 + 0.05);
    grupoCasa.add(puerta);

    return grupoCasa;
}

// --- CONSTRUCTOR MODULAR: EDIFICIO TOTALMENTE PARAMÉTRICO ---
export function crearEdificioParametrico(numPisos = 3, colorHex = 0x90caf9, ancho = 7, fondo = 7) {
    const grupoEdificio = new THREE.Group();

    const altoPorPiso = 3.5;
    const altoEstructura = numPisos * altoPorPiso + 1.5;

    const matBloque = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });
    const matTechoPlano = new THREE.MeshStandardMaterial({ color: 0x424242, roughness: 0.8 });
    const matVidrio = new THREE.MeshStandardMaterial({ color: 0x01579b, metalness: 0.7, roughness: 0.2 });

    // 1. Estructura base paramétrica
    const geomBloque = new THREE.BoxGeometry(ancho, altoEstructura, fondo);
    const bloque = new THREE.Mesh(geomBloque, matBloque);
    bloque.position.y = altoEstructura / 2;
    bloque.castShadow = true;
    bloque.receiveShadow = true;
    grupoEdificio.add(bloque);

    // 2. Techo paramétrico
    const geomTecho = new THREE.BoxGeometry(ancho + 0.2, 0.4, fondo + 0.2);
    const techo = new THREE.Mesh(geomTecho, matTechoPlano);
    techo.position.y = altoEstructura + 0.2;
    techo.castShadow = true;
    grupoEdificio.add(techo);

    // 3. Ventanas proporcionales
    const geomVentana = new THREE.BoxGeometry(ancho * 0.15, altoPorPiso * 0.5, 0.1);
    
    for (let piso = 0; piso < numPisos; piso++) {
        for (let col = 0; col < 2; col++) {
            const ventana = new THREE.Mesh(geomVentana, matVidrio);
            const posX = (col === 0) ? -ancho * 0.25 : ancho * 0.25;
            const posY = 2.2 + (piso * altoPorPiso);
            ventana.position.set(posX, posY, (fondo / 2) + 0.01);
            grupoEdificio.add(ventana);
        }
    }

    return grupoEdificio;
}


/**
 * Construye una superficie plana (quad-strip) siguiendo una curva,
 * desplazada lateralmente entre xInicioOffset y xFinOffset.
 *
 * @param {THREE.CatmullRomCurve3} curva
 * @param {number} xInicioOffset  X local relativa al punto de la curva (inicio del ancho)
 * @param {number} xFinOffset     X local relativa al punto de la curva (fin del ancho)
 * @param {number} altura         Y de la superficie
 * @param {number} numSegmentos
 * @returns {THREE.BufferGeometry}
 */
function crearSuperficieACurvada(curva, xInicioOffset, xFinOffset, altura = 0.01, numSegmentos = 80) {
    const puntos = curva.getPoints(numSegmentos);
    const vertices = [];
    const indices = [];
    const uvs = [];
 
    for (let i = 0; i < puntos.length; i++) {
        const p = puntos[i];
 
        // Tangente local → determina la dirección "lateral" perpendicular a la curva en XZ
        const tIdx = Math.min(i + 1, puntos.length - 1);
        const t0 = i > 0 ? puntos[i - 1] : puntos[i];
        const t1 = puntos[tIdx];
        const tangente = new THREE.Vector3().subVectors(t1, t0).normalize();
        // Normal lateral en el plano XZ (perpendicular a la tangente)
        const lateral = new THREE.Vector3(-tangente.z, 0, tangente.x).normalize();
 
        const u = i / (puntos.length - 1);
 
        // Vértice interior (xInicioOffset)
        const vInner = new THREE.Vector3(
            p.x + lateral.x * xInicioOffset,
            altura,
            p.z + lateral.z * xInicioOffset
        );
        // Vértice exterior (xFinOffset)
        const vOuter = new THREE.Vector3(
            p.x + lateral.x * xFinOffset,
            altura,
            p.z + lateral.z * xFinOffset
        );
 
        vertices.push(vInner.x, vInner.y, vInner.z);
        vertices.push(vOuter.x, vOuter.y, vOuter.z);
        uvs.push(u, 0, u, 1);
    }
 
    // Quad-strip → triángulos
    for (let i = 0; i < puntos.length - 1; i++) {
        const base = i * 2;
        // Tri 1
        indices.push(base, base + 1, base + 2);
        // Tri 2
        indices.push(base + 1, base + 3, base + 2);
    }
 
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv',       new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
}
 
/**
 * Construye una malla tipo "muro" vertical siguiendo la curva,
 * en la posición lateral xOffset.
 *
 * @param {THREE.CatmullRomCurve3} curva
 * @param {number} xOffset  Distancia lateral
 * @param {number} alto     Altura del muro
 * @param {number} numSegmentos
 * @returns {THREE.BufferGeometry}
 */
function crearMuroACurvado(curva, xOffset, alto = 0.5, numSegmentos = 80) {
    const puntos = curva.getPoints(numSegmentos);
    const vertices = [];
    const indices = [];
    const uvs = [];
 
    for (let i = 0; i < puntos.length; i++) {
        const p = puntos[i];
 
        const tIdx = Math.min(i + 1, puntos.length - 1);
        const t0 = i > 0 ? puntos[i - 1] : puntos[i];
        const t1 = puntos[tIdx];
        const tangente = new THREE.Vector3().subVectors(t1, t0).normalize();
        const lateral = new THREE.Vector3(-tangente.z, 0, tangente.x).normalize();
 
        const u = i / (puntos.length - 1);
 
        const base = new THREE.Vector3(
            p.x + lateral.x * xOffset,
            0,
            p.z + lateral.z * xOffset
        );
        const top = base.clone();
        top.y = alto;
 
        vertices.push(base.x, base.y, base.z);
        vertices.push(top.x,  top.y,  top.z);
        uvs.push(u, 0, u, 1);
    }
 
    for (let i = 0; i < puntos.length - 1; i++) {
        const b = i * 2;
        indices.push(b, b + 2, b + 1);
        indices.push(b + 1, b + 2, b + 3);
    }
 
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setAttribute('uv',       new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
}
 
/**
 * Canal ondulado con zona verde configurable por lado.
 *
 * @param {number} longitud        Longitud total del canal
 * @param {number} ancho           Ancho del espejo de agua
 * @param {number} zonaVerdeAncho  Ancho de cada franja de vegetación lateral
 * @param {'ambas'|'derecha'|'izquierda'|'ninguna'} zonaVerde
 *        Controla qué lados reciben zona verde. Default: 'ambas'.
 * @returns {THREE.Group}
 */
export function crearCanalOndulado(longitud = 20, ancho = 10, zonaVerdeAncho = 5, zonaVerde = 'ambas') {
    const grupo = new THREE.Group();
 
    // ── Materiales ──────────────────────────────────────────────────────────
    const matAgua  = new THREE.MeshStandardMaterial({
        color: 0x2196f3, transparent: true, opacity: 0.98,
        roughness: 0.1, metalness: 0.05
    });
    const matBorde = new THREE.MeshStandardMaterial({ color: 0x546e7a, roughness: 0.8 });
    const matVerde = new THREE.MeshStandardMaterial({
        color: 0x4caf50, roughness: 0.9, side: THREE.DoubleSide
    });
 
    // ── Curva central del canal ──────────────────────────────────────────────
    const numSeg = 20;
    const puntosRuta = [];
    for (let i = 0; i <= numSeg; i++) {
        const z = (i / numSeg) * longitud - longitud / 2;
        const x = -Math.sin((i / numSeg) * Math.PI * 2) * 1.5;
        puntosRuta.push(new THREE.Vector3(x, 0, z));
    }
    const curva = new THREE.CatmullRomCurve3(puntosRuta);
 
    // ── 1. Agua (TubeGeometry aplastada) ────────────────────────────────────
    const geomAgua = new THREE.TubeGeometry(curva, 64, ancho / 2, 8, false);
    const agua = new THREE.Mesh(geomAgua, matAgua);
    agua.scale.set(1, 0.04, 1);
    grupo.add(agua);
 
    // ── 2. Bordes / muros del canal ─────────────────────────────────────────
    const xBordeDer =  ancho / 2;
    const xBordeIzq = -ancho / 2;
 
    const geomMuroDer = crearMuroACurvado(curva,  xBordeDer, 0.5);
    const geomMuroIzq = crearMuroACurvado(curva,  xBordeIzq, 0.5);
 
    grupo.add(new THREE.Mesh(geomMuroDer, matBorde));
    grupo.add(new THREE.Mesh(geomMuroIzq, matBorde));
 
    // ── 3. Zonas verdes ──────────────────────────────────────────────────────
    // Valores válidos: 'ambas' | 'derecha' | 'izquierda' | 'ninguna'
    const ladoValido = ['ambas', 'derecha', 'izquierda', 'ninguna'];
    const lado = ladoValido.includes(zonaVerde) ? zonaVerde : 'ambas';
 
    if (lado === 'derecha' || lado === 'ambas') {
        const geomVerdeDer = crearSuperficieACurvada(
            curva,
            xBordeDer,
            xBordeDer + zonaVerdeAncho,
            0.02
        );
        grupo.add(new THREE.Mesh(geomVerdeDer, matVerde));
    }
 
    if (lado === 'izquierda' || lado === 'ambas') {
        const geomVerdeIzq = crearSuperficieACurvada(
            curva,
            xBordeIzq,
            xBordeIzq - zonaVerdeAncho,
            0.02
        );
        grupo.add(new THREE.Mesh(geomVerdeIzq, matVerde));
    }
    // 'ninguna' → no se agrega ningún mesh verde
 
    // ── Orientación final ────────────────────────────────────────────────────
    grupo.rotation.y = Math.PI * 1.09;
 
    return grupo;
}

export function crearPuenteLevadizo(anchoRio = 12, anchoPuente = 4, alturaPilar = 0.5, anguloApertura = 0) {
    const grupoPuente = new THREE.Group();

    const matPilar   = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const matTablero = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const matTensor  = new THREE.MeshStandardMaterial({ color: 0xb0bec5, roughness: 0.3, metalness: 0.7 });
    const matBarrera = new THREE.MeshStandardMaterial({ color: 0xef5350 });

    // Sección cuadrada: misma dimensión en X y Z
    const secPilar  = anchoPuente * 0.5;
    const altoPilar = alturaPilar;
    const xPivote   = -anchoRio / 2 - secPilar / 2;

    // ── Helper: pilar + cabezal ──────────────────────────────────────────────
    function agregarPilar(xPos) {
        const geomP = new THREE.BoxGeometry(secPilar, altoPilar, secPilar);
        const p = new THREE.Mesh(geomP, matPilar);
        p.position.set(xPos, altoPilar / 2, 0);
        grupoPuente.add(p);

        const geomC = new THREE.BoxGeometry(secPilar * 1.4, altoPilar * 0.2, secPilar * 1.4);
        const c = new THREE.Mesh(geomC, matPilar);
        c.position.set(xPos, altoPilar + altoPilar * 0.1, 0);
        grupoPuente.add(c);
    }

    // ── 1. PILARES ───────────────────────────────────────────────────────────
    agregarPilar(xPivote);                          // lado mecanismo (pivote)
    agregarPilar(anchoRio / 2 - secPilar/2);     // extremo opuesto (apoyo libre)

    // ── 2. GRUPO TABLERO ─────────────────────────────────────────────────────
    const grupoTablero = new THREE.Group();
    const longTablero  = anchoRio + secPilar;

    const geomTablero = new THREE.BoxGeometry(longTablero, 0.2, anchoPuente);
    const tablero = new THREE.Mesh(geomTablero, matTablero);
    tablero.position.set(longTablero / 2 - secPilar * 0.5, 0, 0);
    grupoTablero.add(tablero);

    // ── 3. TENSORES ──────────────────────────────────────────────────────────
    const rTensor        = anchoPuente * 0.012;
    const puntosFijacion = [longTablero * 0.55, longTablero * 0.92];
    const zOffset        = anchoPuente / 2 - rTensor;
    const altMastil      = altoPilar * 2.2;

    const geomMastil = new THREE.BoxGeometry(rTensor * 3, altMastil, rTensor * 3);
    [-1, 1].forEach(sz => {
        const mastil = new THREE.Mesh(geomMastil, matTensor);
        mastil.position.set(0, altMastil / 2, sz * zOffset);
        grupoTablero.add(mastil);
    });

    puntosFijacion.forEach(xFij => {
        [-1, 1].forEach(sz => {
            const p1  = new THREE.Vector3(0,    altMastil, sz * zOffset);
            const p2  = new THREE.Vector3(xFij, 0,         sz * zOffset);
            const dir = new THREE.Vector3().subVectors(p2, p1);
            const len = dir.length();
            const mid = p1.clone().addScaledVector(dir.normalize(), len / 2);

            const geomTensor = new THREE.CylinderGeometry(rTensor, rTensor, len, 5);
            const tensor = new THREE.Mesh(geomTensor, matTensor);
            tensor.position.copy(mid);
            tensor.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
            grupoTablero.add(tensor);
        });
    });

    // ── 4. BARRERAS (Duales: una para cada extremo del ancho del puente) ─────
    const longBarrera = anchoPuente * 0.8; // Ajustado al ancho del puente
    const altoPoste   = anchoPuente * 0.35;
    const rBarrera    = anchoPuente * 0.025;

    // Definimos las posiciones Z para los dos lados del puente
    const posicionesZ = [-anchoPuente / 2 + 0.2, anchoPuente / 2 - 0.2];

    posicionesZ.forEach((zPos) => {
        // Poste
        const geomPoste = new THREE.BoxGeometry(rBarrera * 2.5, altoPoste, rBarrera * 2.5);
        const poste = new THREE.Mesh(geomPoste, matBarrera);
        poste.position.set(-secPilar * 0.5, -altoPoste/2, zPos);
        grupoTablero.add(poste);

        // Brazo (el brazo se extiende hacia el centro)
        const geomBrazo = new THREE.CylinderGeometry(rBarrera, rBarrera, longBarrera, 5);
        const brazo = new THREE.Mesh(geomBrazo, matBarrera);
        brazo.rotation.z = Math.PI / 2;
        brazo.rotation.x = Math.PI / 2; // Asegura que el brazo se vea horizontal correctamente
        
        // Si zPos es negativo (lado izquierdo), el brazo se mueve hacia el centro (Z > 0)
        // Si zPos es positivo (lado derecho), el brazo se mueve hacia el centro (Z < 0)
        const direccion = zPos < 0 ? 1 : -1;
        brazo.position.set(-secPilar , -altoPoste, zPos );
        
        grupoTablero.add(brazo);
    });

    // ── Pivote y apertura ────────────────────────────────────────────────────
    grupoTablero.position.set(xPivote, altoPilar + altoPilar * 0.2, 0);
    grupoTablero.rotation.z = anguloApertura;
    grupoPuente.add(grupoTablero);

    return grupoPuente;
}
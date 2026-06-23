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

// --- CONSTRUCTOR: TACHO DE RECICLAJE PARAMETRIZADO ---
export function crearTacho(radio = 1.0, alto = 2.8, color = 0x2e7d32, rotar_flecha = -Math.PI / 4) {
    const grupoTacho = new THREE.Group();
    
    // Calcular proporciones
    const escala = radio / 1.0;
    const altoEscalado = alto * escala;
    
    // --- MATERIALES ---
    const matCuerpo = new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.5, 
        metalness: 0.1 
    });
    
    // Color de tapa (ligeramente más claro)
    const colorTapa = new THREE.Color(color);
    colorTapa.offsetHSL(0, 0, 0.05);
    const matTapa = new THREE.MeshStandardMaterial({ 
        color: colorTapa, 
        roughness: 0.4, 
        metalness: 0.15 
    });
    
    const matRueda = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a, 
        roughness: 0.9 
    });
    
    const matDetalle = new THREE.MeshStandardMaterial({ 
        color: 0x444444, 
        roughness: 0.5, 
        metalness: 0.2 
    });

    const matFlecha = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        roughness: 0.3, 
        metalness: 0.1,
        emissive: 0xffffff,
        emissiveIntensity: 0.05
    });

    // ─── 1. CUERPO PRINCIPAL (tronco cónico) ──────────────────────────────
    const geomCuerpo = new THREE.CylinderGeometry(
        radio * 1.0,        // radioTop
        radio * 0.75,       // radioBottom
        altoEscalado,       // height
        12                  // segments
    );
    const cuerpo = new THREE.Mesh(geomCuerpo, matCuerpo);
    cuerpo.position.y = altoEscalado / 2;
    cuerpo.castShadow = true;
    cuerpo.receiveShadow = true;
    grupoTacho.add(cuerpo);

    // ─── 2. TAPA ────────────────────────────────────────────────────────────
    const geomTapa = new THREE.CylinderGeometry(
        radio * 1.12,
        radio * 1.05,
        0.18 * escala,
        12
    );
    const tapa = new THREE.Mesh(geomTapa, matTapa);
    tapa.position.y = altoEscalado + 0.09 * escala;
    tapa.castShadow = true;
    grupoTacho.add(tapa);

    // ─── 3. BORDE DE TAPA ──────────────────────────────────────────────────
    const geomBordeTapa = new THREE.TorusGeometry(
        radio * 1.08,
        0.045 * escala,
        8,
        24
    );
    const bordeTapa = new THREE.Mesh(geomBordeTapa, matCuerpo);
    bordeTapa.position.y = altoEscalado + 0.02 * escala;
    bordeTapa.rotation.x = Math.PI / 2;
    grupoTacho.add(bordeTapa);

    // ─── 4. MANIJA SUPERIOR ────────────────────────────────────────────────
    const geomManija = new THREE.TorusGeometry(
        0.28 * escala,
        0.055 * escala,
        8,
        16,
        Math.PI
    );
    const manija = new THREE.Mesh(geomManija, matTapa);
    manija.position.set(0, altoEscalado + 0.28 * escala, 0);
    manija.rotation.x = Math.PI;
    grupoTacho.add(manija);

    // ─── 5. RUEDAS ──────────────────────────────────────────────────────────
    const geomRueda = new THREE.CylinderGeometry(
        0.22 * escala,
        0.22 * escala,
        0.14 * escala,
        16
    );

    [-0.55 * radio, 0.55 * radio].forEach((offsetX) => {
        const rueda = new THREE.Mesh(geomRueda, matRueda);
        rueda.rotation.z = Math.PI / 2;
        rueda.position.set(offsetX, 0.22 * escala, -0.62 * radio);
        rueda.castShadow = true;
        grupoTacho.add(rueda);
    });

    // ─── 6. EJE DE RUEDAS ──────────────────────────────────────────────────
    const geomEje = new THREE.CylinderGeometry(
        0.04 * escala,
        0.04 * escala,
        1.24 * radio,
        8
    );
    const eje = new THREE.Mesh(geomEje, matRueda);
    eje.rotation.z = Math.PI / 2;
    eje.position.set(0, 0.22 * escala, -0.62 * radio);
    grupoTacho.add(eje);

    // ─── 7. PIE FRONTAL ─────────────────────────────────────────────────────
    const geomPie = new THREE.BoxGeometry(
        0.9 * radio,
        0.10 * escala,
        0.18 * radio
    );
    const pie = new THREE.Mesh(geomPie, matCuerpo);
    pie.position.set(0, 0.05 * escala, 0.68 * radio);
    grupoTacho.add(pie);

    // ─── 8. TRES FLECHAS PLANAS (símbolo de reciclaje) ────────────────────
    const grupoSimbolo = new THREE.Group();
    const tamañoFlecha = 0.35 * escala;
    
    // --- FLECHA 1 (original) ---
    const grupoFlecha1 = new THREE.Group();
    
    const geomCuerpoFlecha = new THREE.BoxGeometry(
        tamañoFlecha * 0.7,
        tamañoFlecha * 0.12,
        0.02
    );
    const cuerpoFlecha1 = new THREE.Mesh(geomCuerpoFlecha, matFlecha);
    cuerpoFlecha1.position.set(-tamañoFlecha * 0.25, 0, 0);
    cuerpoFlecha1.rotation.z = Math.PI / 4;
    grupoFlecha1.add(cuerpoFlecha1);

    const geomPunta = new THREE.ConeGeometry(
        tamañoFlecha * 0.2,
        tamañoFlecha * 0.2,
        3
    );
    const punta1 = new THREE.Mesh(geomPunta, matFlecha);
    punta1.position.set(tamañoFlecha * 0.1, 0.1, 0);
    punta1.rotation.z = -Math.PI / 3;
    grupoFlecha1.add(punta1);
    grupoFlecha1.position.set(tamañoFlecha * 0.8, -tamañoFlecha*0.4, 0)
    grupoSimbolo.add(grupoFlecha1);

    // --- FLECHA 2 (rotada 120°) ---
    const grupoFlecha2 = new THREE.Group();
    
    const cuerpoFlecha2 = new THREE.Mesh(geomCuerpoFlecha, matFlecha);
    cuerpoFlecha2.position.set(-tamañoFlecha * 0.25, 0, 0);
    cuerpoFlecha2.rotation.z = Math.PI / 4;
    grupoFlecha2.add(cuerpoFlecha2);

    const punta2 = new THREE.Mesh(geomPunta, matFlecha);
    punta2.position.set(tamañoFlecha * 0.1, 0.1, 0);
    punta2.rotation.z = -Math.PI / 3;
    grupoFlecha2.add(punta2);
    
    grupoFlecha2.rotation.z = (2 * Math.PI) / 3;
    grupoFlecha2.position.set(tamañoFlecha * 0.15, tamañoFlecha*0.5, 0)
    grupoSimbolo.add(grupoFlecha2);

    // --- FLECHA 3 (rotada 240°) ---
    const grupoFlecha3 = new THREE.Group();
    
    const cuerpoFlecha3 = new THREE.Mesh(geomCuerpoFlecha, matFlecha);
    cuerpoFlecha3.position.set(-tamañoFlecha * 0.25, 0, 0);
    cuerpoFlecha3.rotation.z = Math.PI / 4;
    grupoFlecha3.add(cuerpoFlecha3);

    const punta3 = new THREE.Mesh(geomPunta, matFlecha);
    punta3.position.set(tamañoFlecha * 0.1, 0.1, 0);
    punta3.rotation.z = -Math.PI / 3;
    grupoFlecha3.position.set(-tamañoFlecha * 0.2, -tamañoFlecha*0.4, 0)
    grupoFlecha3.add(punta3);
    
    grupoFlecha3.rotation.z = (4 * Math.PI) / 3;
    grupoSimbolo.add(grupoFlecha3);

    // Posicionar el símbolo en la cara frontal del tacho
    grupoSimbolo.position.set(0, altoEscalado / 1.7, radio * 0.9);
    grupoSimbolo.rotation.z = rotar_flecha;
    grupoTacho.add(grupoSimbolo);

    // ─── 9. FRANJA DECORATIVA HORIZONTAL ──────────────────────────────────
    const geomFranja = new THREE.TorusGeometry(
        radio * 0.98,
        0.03 * escala,
        6,
        24
    );
    const franja = new THREE.Mesh(geomFranja, matTapa);
    franja.position.y = altoEscalado * 0.66;
    franja.rotation.x = Math.PI / 2;
    grupoTacho.add(franja);

    // ─── 10. SEGUNDA FRANJA DECORATIVA (inferior) ──────────────────────────
    const geomFranjaInf = new THREE.TorusGeometry(
        radio * 0.85,
        0.025 * escala,
        6,
        24
    );
    const franjaInf = new THREE.Mesh(geomFranjaInf, matDetalle);
    franjaInf.position.y = altoEscalado * 0.33;
    franjaInf.rotation.x = Math.PI / 2;
    grupoTacho.add(franjaInf);

    // ─── 11. Sombra proyectada ─────────────────────────────────────────────
    const geomSombra = new THREE.CircleGeometry(radio * 1.2, 16);
    const matSombra = new THREE.MeshStandardMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    const sombra = new THREE.Mesh(geomSombra, matSombra);
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = 0.01;
    grupoTacho.add(sombra);

    return grupoTacho;
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
            const desvAlatorio = -0.05 + Math.random() * 0.02;
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

export function crearPistaConRampa(
  ancho = 7,
  largoTotal = 15,
  alturaFinal = 6,
  largoCurva = 10,
  anguloCurva = Math.PI / 2.1,
  segmentosCurva = 20
) {
  const grupoPista = new THREE.Group();

  const matPista   = new THREE.MeshStandardMaterial({ color: 0x555555, side: THREE.DoubleSide });
  const matSoporte = new THREE.MeshStandardMaterial({ color: 0x444444 });

  // ── 1. PERFIL LATERAL (Shape) ──────────────────────────────
  const largoBase  = largoTotal * 0.3;
  const largoRampa = largoTotal * 0.7;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(largoBase, 0);
  shape.lineTo(largoTotal, alturaFinal);
  shape.lineTo(largoTotal, alturaFinal - 0.2);
  shape.lineTo(largoBase, -0.2);
  shape.lineTo(0, -0.2);
  shape.lineTo(0, 0);

  // ── 2. GEOMETRÍA EXTRUIDA (rampa) ──────────────────────────
  const extrudeSettings = { depth: ancho, bevelEnabled: false };
  const geomPista = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const pista = new THREE.Mesh(geomPista, matPista);
  pista.position.z = -ancho / 2;
  grupoPista.add(pista);

  // ── 3. SOPORTES PARAMÉTRICOS ───────────────────────────────
  const numSoportes = 3;
  for (let i = 1; i <= numSoportes; i++) {
    const xPos = largoBase + (largoRampa / numSoportes) * i - 0.5;
    const alturaActual = (xPos - largoBase) / largoRampa * alturaFinal;
    if (alturaActual > 0.2) {
      const geomSoporte = new THREE.BoxGeometry(0.5, alturaActual, ancho * 0.8);
      const soporte = new THREE.Mesh(geomSoporte, matSoporte);
      soporte.position.set(xPos, alturaActual / 2 - 0.2, 0);
      grupoPista.add(soporte);
    }
  }

  // ── 4. CURVA DE SALIDA CON TUBEGEOMETRY ────────────────────
  const pInicio = new THREE.Vector3(largoTotal, alturaFinal, 0);
  const dirRampa = new THREE.Vector3(largoRampa, alturaFinal, 0).normalize();
  const pControl = pInicio.clone().addScaledVector(dirRampa, largoCurva * 0.5);

  const pFin = new THREE.Vector3(
    pInicio.x + largoCurva * Math.cos(anguloCurva),
    alturaFinal,
    pInicio.z - largoCurva * Math.sin(anguloCurva)
  );

  const curvaBezier = new THREE.QuadraticBezierCurve3(pInicio, pControl, pFin);

  // Creamos la sección transversal de la pista (un rectángulo de ancho x 0.2 de grosor)
  // pero con orientación controlada
  const puntos = curvaBezier.getPoints(segmentosCurva);
  
  // Generamos la geometría de la curva manualmente
  const vertices = [];
  const indices = [];
  const normals = [];
  const uvs = [];

  const grosor = 0.2;
  const mitadAncho = ancho / 2;
  
  // Vector "arriba" global para mantener la superficie plana
  const up = new THREE.Vector3(0, 1, 0);
  
  for (let i = 0; i <= segmentosCurva; i++) {
    const t = i / segmentosCurva;
    const punto = curvaBezier.getPoint(t);
    
    // Calculamos la tangente
    const tangente = curvaBezier.getTangent(t).normalize();
    
    // Calculamos el vector "derecha" (perpendicular a la tangente y a up)
    const derecha = new THREE.Vector3().crossVectors(tangente, up).normalize();
    
    // Si la tangente es casi vertical, usamos el eje Z como referencia
    if (derecha.length() < 0.001) {
      const zAxis = new THREE.Vector3(0, 0, 1);
      derecha.crossVectors(tangente, zAxis).normalize();
    }
    
    // Calculamos el vector "arriba" corregido
    const upCorregido = new THREE.Vector3().crossVectors(derecha, tangente).normalize();
    
    // Cuatro vértices de la sección: esquinas del rectángulo
    // Mantenemos el ancho en el eje "derecha" y el grosor en el eje "upCorregido"
    const p1 = punto.clone().addScaledVector(derecha, -mitadAncho).addScaledVector(upCorregido, 0);
    const p2 = punto.clone().addScaledVector(derecha, mitadAncho).addScaledVector(upCorregido, 0);
    const p3 = punto.clone().addScaledVector(derecha, mitadAncho).addScaledVector(upCorregido, -grosor);
    const p4 = punto.clone().addScaledVector(derecha, -mitadAncho).addScaledVector(upCorregido, -grosor);
    
    const baseIndex = i * 4;
    vertices.push(p1.x, p1.y, p1.z);
    vertices.push(p2.x, p2.y, p2.z);
    vertices.push(p3.x, p3.y, p3.z);
    vertices.push(p4.x, p4.y, p4.z);
    
    // UVs
    const u = i / segmentosCurva;
    uvs.push(u, 0);
    uvs.push(u, 0.5);
    uvs.push(u, 0.5);
    uvs.push(u, 1);
    
    // Normales (aproximadas)
    if (i > 0) {
      // Añadimos triángulos para conectar con la sección anterior
      const prev = (i - 1) * 4;
      const curr = i * 4;
      
      // Cara superior
      indices.push(prev, curr, prev + 1);
      indices.push(curr, curr + 1, prev + 1);
      
      // Cara frontal
      indices.push(prev + 1, curr + 1, prev + 2);
      indices.push(curr + 1, curr + 2, prev + 2);
      
      // Cara inferior
      indices.push(prev + 2, curr + 2, prev + 3);
      indices.push(curr + 2, curr + 3, prev + 3);
      
      // Cara trasera
      indices.push(prev + 3, curr + 3, prev);
      indices.push(curr + 3, curr, prev);
    }
  }

  const geomCurva = new THREE.BufferGeometry();
  geomCurva.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geomCurva.setIndex(indices);
  geomCurva.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geomCurva.computeVertexNormals();

  const meshCurva = new THREE.Mesh(geomCurva, matPista);
  grupoPista.add(meshCurva);

  // ── 5. SOPORTES BAJO LA CURVA ──────────────────────────────
  const numSoportesCurva = Math.max(2, Math.round(segmentosCurva / 5));
  const puntosCurva = curvaBezier.getPoints(numSoportesCurva + 1);

  for (let i = 1; i < puntosCurva.length - 1; i++) {
    const p = puntosCurva[i];
    const altSoporte = p.y - 0.2;
    if (altSoporte <= 0.2) continue;

    const geomSopCurva = new THREE.BoxGeometry(0.4, altSoporte, ancho * 0.8);
    const sopCurva = new THREE.Mesh(geomSopCurva, matSoporte);
    sopCurva.position.set(p.x, altSoporte / 2 -0.4, p.z);
    grupoPista.add(sopCurva);
  }

  return grupoPista;
}

export function crearFajaSelectora(largoFaja = 20, anchoFaja = 3, alturaFaja = 1.5) {
    const grupoFaja = new THREE.Group();

    // Materiales básicos
    const matFaja   = new THREE.MeshStandardMaterial({ color: 0x3B3B3A });
    const matPaleta = new THREE.MeshStandardMaterial({ color: 0xFF6A4F });
    const matRampa  = new THREE.MeshStandardMaterial({ color: 0x777777 });

    // ── 1. CINTA TRANSPORTADORA ─────────────────────────────────────────────
    const grosorFaja = 1.1;
    const geomFaja = new THREE.BoxGeometry(largoFaja, grosorFaja, anchoFaja);
    const faja = new THREE.Mesh(geomFaja, matFaja);
    // Elevamos la base de la faja a la altura deseada
    faja.position.y = alturaFaja + grosorFaja / 2-1.5;
    grupoFaja.add(faja);

    // ── 2. PALETAS Y RAMPAS ────────────────────────────────────────────────
    const posiciones = [ -largoFaja/4, 0, largoFaja/4 ];
    
    posiciones.forEach((posX) => {
        // Paleta: ajustada a la altura de la faja
        const geomPaleta = new THREE.BoxGeometry(0.6, anchoFaja*1.2, 0.2);
        const paleta = new THREE.Mesh(geomPaleta, matPaleta);
        paleta.position.set(posX, alturaFaja*0.95, -anchoFaja/20);
        paleta.rotation.y = -Math.PI / 3.5;
        paleta.rotation.z = Math.PI / 2;
        grupoFaja.add(paleta);

        // Rampa: ajustada para que el inicio coincida con la altura de la faja
        const geomRampa = new THREE.BoxGeometry(2, 0.2, largoFaja/5);
        const rampa = new THREE.Mesh(geomRampa, matRampa);
        
        // Rotación y altura
        rampa.rotation.y = -Math.PI/2;
        rampa.rotation.z = -Math.PI / 6;
        // Calculamos la posición para que toque el borde de la faja
        rampa.position.set(posX, alturaFaja/3, anchoFaja/1.3);
        grupoFaja.add(rampa);
    });

    return grupoFaja;
}

/**
 * Crea una superficie plana (suelo) paramétrica
 * @param {number} largo - Dimensión en el eje Z
 * @param {number} ancho - Dimensión en el eje X
 * @param {number} colorHex - Color en formato hex (ej: 0xcccccc para plomo claro)
 */
export function crearSuelo(largo = 10, ancho = 10, colorHex = 0xcccccc) {
    const geomSuelo = new THREE.PlaneGeometry(ancho, largo);
    
    // Usamos DoubleSide para evitar problemas si la cámara mira desde abajo
    const matSuelo = new THREE.MeshStandardMaterial({ 
        color: colorHex, 
        side: THREE.DoubleSide,
        roughness: 0.9 
    });

    const suelo = new THREE.Mesh(geomSuelo, matSuelo);
    
    // Rotamos para que esté en el plano XZ (suelo) en lugar de XY (pared)
    suelo.rotation.x = -Math.PI / 2;
    
    return suelo;
}

export function crearCentroAcopio(ancho = 20, profundo = 20, alto = 6) {
    const grupo = new THREE.Group();

    // ── PALETA DE COLORES INDUSTRIAL ──
    const colores = {
        piso:       0x4a4a4a,
        pisoLineas: 0x616161,
        muros:      0xd4c9b8,
        murosInt:   0xe8e0d5,
        techo:      0xc9c0b0,
        vigas:      0x8a7a6a,
        columnas:   0x9e8e7e,
        enrollado:  0x6a7a7a,      // Gris metálico para el rollo
        marco:      0x5a6a7a,      // Gris oscuro para el marco
        metal:      0x889898,
        acento:     0xc0392b,
    };

    // ── MATERIALES ──
    const matPiso = new THREE.MeshStandardMaterial({ 
        color: colores.piso, 
        roughness: 0.8,
        metalness: 0.1
    });
    
    const matMuros = new THREE.MeshStandardMaterial({ 
        color: colores.muros, 
        roughness: 0.7,
        metalness: 0.05
    });
    
    const matTecho = new THREE.MeshStandardMaterial({ 
        color: colores.techo, 
        roughness: 0.6,
        metalness: 0.1
    });
    
    const matVigas = new THREE.MeshStandardMaterial({ 
        color: colores.vigas, 
        roughness: 0.5,
        metalness: 0.3
    });
    
    const matColumnas = new THREE.MeshStandardMaterial({ 
        color: colores.columnas, 
        roughness: 0.4,
        metalness: 0.2
    });

    const matEnrollado = new THREE.MeshStandardMaterial({ 
        color: colores.enrollado, 
        roughness: 0.4,
        metalness: 0.6
    });

    const matMarco = new THREE.MeshStandardMaterial({ 
        color: colores.marco, 
        roughness: 0.5,
        metalness: 0.3
    });

    const matMetal = new THREE.MeshStandardMaterial({ 
        color: colores.metal, 
        roughness: 0.3,
        metalness: 0.8
    });

    // ── 1. PISO DE CONCRETO ──
    const piso = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, 0.3, profundo),
        matPiso
    );
    piso.position.y = 0.15;
    grupo.add(piso);

    // Líneas de división en el piso
    const matLineas = new THREE.MeshStandardMaterial({ 
        color: colores.pisoLineas, 
        roughness: 0.9 
    });
    
    for (let i = -ancho/2 + 2; i < ancho/2 - 1; i += 4) {
        const linea = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.02, profundo - 1),
            matLineas
        );
        linea.position.set(i, 0.31, 0);
        grupo.add(linea);
    }

    // ── 2. MUROS ──
    // Pared trasera
    const paredTrasera = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, alto, 0.3),
        matMuros
    );
    paredTrasera.position.set(0, alto/2, -profundo/2);
    grupo.add(paredTrasera);

    // Pared izquierda
    const paredIzq = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, alto, profundo),
        matMuros
    );
    paredIzq.position.set(-ancho/2, alto/2, 0);
    grupo.add(paredIzq);

    // Pared derecha
    const paredDer = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, alto, profundo),
        matMuros
    );
    paredDer.position.set(ancho/2, alto/2, 0);
    grupo.add(paredDer);

    // ── 3. TECHO PLANO ──
    const techo = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, 0.2, profundo),
        matTecho
    );
    techo.position.set(0, alto, 0);
    grupo.add(techo);

    // ── 4. ESTRUCTURA DE VIGAS ──
    // Vigas principales
    for (let i = -ancho/2 + 2; i < ancho/2 - 1; i += 5) {
        const viga = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.25, profundo - 1),
            matVigas
        );
        viga.position.set(i, alto - 0.1, 0);
        grupo.add(viga);
    }

    // Vigas secundarias
    for (let i = -profundo/2 + 2; i < profundo/2 - 1; i += 5) {
        const viga = new THREE.Mesh(
            new THREE.BoxGeometry(ancho - 1, 0.25, 0.15),
            matVigas
        );
        viga.position.set(0, alto - 0.1, i);
        grupo.add(viga);
    }

    // ── 5. COLUMNAS ESTRUCTURALES ──
    const posColumnas = [
        [-ancho/2 + 1, -profundo/2 + 1],
        [ancho/2 - 1, -profundo/2 + 1],
        [-ancho/2 + 1, profundo/2 - 1],
        [ancho/2 - 1, profundo/2 - 1]
    ];

    posColumnas.forEach(([x, z]) => {
        const columna = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, alto, 0.4),
            matColumnas
        );
        columna.position.set(x, alto/2, z);
        grupo.add(columna);
        
        const base = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.1, 0.6),
            matVigas
        );
        base.position.set(x, 0.05, z);
        grupo.add(base);
    });

    // ── 6. MARCO PARA PUERTA ENROLLABLE (SIN PUERTA) ──
    const anchoPuerta = ancho*0.95;
    const altoPuerta = alto*0.9;
    
    // 6.1 MARCO SUPERIOR (dintel)
    const dintel = new THREE.Mesh(
        new THREE.BoxGeometry(anchoPuerta + 0.6, 0.3, 0.4),
        matMarco
    );
    dintel.position.set(0, altoPuerta, profundo/2);
    grupo.add(dintel);

    // 6.2 MARCO LATERAL IZQUIERDO (jamba)
    const jambaIzq = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, altoPuerta, 0.4),
        matMarco
    );
    jambaIzq.position.set(-anchoPuerta/2 - 0.15, altoPuerta/2, profundo/2);
    grupo.add(jambaIzq);

    // 6.3 MARCO LATERAL DERECHO (jamba)
    const jambaDer = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, altoPuerta, 0.4),
        matMarco
    );
    jambaDer.position.set(anchoPuerta/2 + 0.15, altoPuerta/2, profundo/2);
    grupo.add(jambaDer);

    // 6.4 MARCO INFERIOR (umbral)
    const umbral = new THREE.Mesh(
        new THREE.BoxGeometry(anchoPuerta + 0.6, 0.15, 0.4),
        matMarco
    );
    umbral.position.set(0, 0.075, profundo/2);
    grupo.add(umbral);

    // 6.5 RIELES LATERALES (guías metálicas)
    const rielIzq = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, altoPuerta, 0.08),
        matMetal
    );
    rielIzq.position.set(-anchoPuerta/2, altoPuerta/2, profundo/2 + 0.15);
    grupo.add(rielIzq);

    const rielDer = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, altoPuerta, 0.08),
        matMetal
    );
    rielDer.position.set(anchoPuerta/2, altoPuerta/2, profundo/2 + 0.15);
    grupo.add(rielDer);

    // 6.6 ROLLO DE LA PUERTA ENROLLADO (arriba)
    const rolloPuerta = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, anchoPuerta + 0.2, 16),
        matEnrollado
    );
    rolloPuerta.rotation.z = Math.PI / 2;
    rolloPuerta.position.set(0, altoPuerta + 0.2, profundo/2 + 0.1);
    grupo.add(rolloPuerta);

    // 6.7 TAPAS LATERALES DEL ROLLO
    const tapaIzq = new THREE.Mesh(
        new THREE.CircleGeometry(0.5, 16),
        matMetal
    );
    tapaIzq.position.set(-anchoPuerta/2 - 0.1, altoPuerta + 0.2, profundo/2 + 0.1);
    tapaIzq.rotation.y = Math.PI / 2;
    grupo.add(tapaIzq);

    const tapaDer = new THREE.Mesh(
        new THREE.CircleGeometry(0.5, 16),
        matMetal
    );
    tapaDer.position.set(anchoPuerta/2 + 0.1, altoPuerta + 0.2, profundo/2 + 0.1);
    tapaDer.rotation.y = -Math.PI / 2;
    grupo.add(tapaDer);

    // 6.8 MOTOR DEL ENROLLADOR (detalle)
    const motor = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.25, 0.25),
        new THREE.MeshStandardMaterial({ 
            color: 0x3a4a5a, 
            roughness: 0.3,
            metalness: 0.7
        })
    );
    motor.position.set(anchoPuerta/2 + 0.4, altoPuerta + 0.2, profundo/2 + 0.1);
    grupo.add(motor);

    // 6.9 CABLE DE SEGURIDAD (simulado)
    const cable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, altoPuerta + 0.3, 4),
        matMetal
    );
    cable.position.set(-anchoPuerta/2 - 0.15, (altoPuerta + 0.3)/2, profundo/2 + 0.15);
    grupo.add(cable);

    const cable2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, altoPuerta + 0.3, 4),
        matMetal
    );
    cable2.position.set(anchoPuerta/2 + 0.15, (altoPuerta + 0.3)/2, profundo/2 + 0.15);
    grupo.add(cable2);

    // 6.10 SOPORTES DEL ROLLO
    const soporteIzq = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.15, 0.15),
        matMetal
    );
    soporteIzq.position.set(-anchoPuerta/2 - 0.1, altoPuerta + 0.2, profundo/2 + 0.3);
    grupo.add(soporteIzq);

    const soporteDer = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.15, 0.15),
        matMetal
    );
    soporteDer.position.set(anchoPuerta/2 + 0.1, altoPuerta + 0.2, profundo/2 + 0.3);
    grupo.add(soporteDer);

    // ── 7. DETALLES DE SEGURIDAD ──
    const matSeguridad = new THREE.MeshStandardMaterial({ 
        color: colores.acento, 
        roughness: 0.5,
        metalness: 0.1
    });

    posColumnas.forEach(([x, z]) => {
        for (let y = 0.5; y < alto; y += 1.2) {
            const franja = new THREE.Mesh(
                new THREE.BoxGeometry(0.45, 0.15, 0.45),
                matSeguridad
            );
            franja.position.set(x, y, z);
            grupo.add(franja);
        }
    });

    // ── 8. SEÑALÉTICA ──
    const cartel = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.8, 0.05),
        new THREE.MeshStandardMaterial({ 
            color: 0x2c3e50, 
            roughness: 0.4,
            metalness: 0.1
        })
    );
    cartel.position.set(0, alto*1.06, profundo/2);
    grupo.add(cartel);

    // ── 9. ILUMINACIÓN ──
    const matLuz = new THREE.MeshStandardMaterial({
        color: 0xfff8e7,
        emissive: 0xfff8e7,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.6
    });

    for (let i = -ancho/2 + 4; i < ancho/2 - 3; i += 6) {
        for (let j = -profundo/2 + 4; j < profundo/2 - 3; j += 6) {
            const lampara = new THREE.Mesh(
                new THREE.PlaneGeometry(1.5, 1.5),
                matLuz
            );
            lampara.position.set(i, alto - 0.1, j);
            lampara.rotation.x = -Math.PI / 2;
            grupo.add(lampara);
        }
    }

    return grupo;
}

export function crearCabinaRecepcion(ancho = 6, profundo = 4, alto = 3.5) {
    const grupo = new THREE.Group();

    // ── PALETA DE COLORES MINIMALISTA ──
    const colores = {
        exterior:   0xe8e0d5,      // Beige claro
        techo:      0xd4ccc0,      // Gris claro
        base:       0x8a7a6a,      // Gris madera
        marco:      0x5a6a7a,      // Gris acero
        vidrio:     0xadd8e6,      // Azul claro translúcido
        puerta:     0x6d5f4f,      // Marrón oscuro
        pomo:       0xc0a050,      // Bronce
        acento:     0x2c3e50,      // Azul oscuro
        detalle:    0x7a8a8a,      // Gris metálico
    };

    // ── MATERIALES ──
    const matExterior = new THREE.MeshStandardMaterial({ 
        color: colores.exterior, 
        roughness: 0.7,
        metalness: 0.05
    });

    const matTecho = new THREE.MeshStandardMaterial({ 
        color: colores.techo, 
        roughness: 0.6,
        metalness: 0.1
    });

    const matBase = new THREE.MeshStandardMaterial({ 
        color: colores.base, 
        roughness: 0.8,
        metalness: 0.05
    });

    const matMarco = new THREE.MeshStandardMaterial({ 
        color: colores.marco, 
        roughness: 0.4,
        metalness: 0.5
    });

    const matVidrio = new THREE.MeshStandardMaterial({ 
        color: colores.vidrio, 
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.35
    });

    const matPuerta = new THREE.MeshStandardMaterial({ 
        color: colores.puerta, 
        roughness: 0.6,
        metalness: 0.1
    });

    const matPomo = new THREE.MeshStandardMaterial({ 
        color: colores.pomo, 
        roughness: 0.3,
        metalness: 0.8
    });

    const matAcento = new THREE.MeshStandardMaterial({ 
        color: colores.acento, 
        roughness: 0.5,
        metalness: 0.1
    });

    const matDetalle = new THREE.MeshStandardMaterial({ 
        color: colores.detalle, 
        roughness: 0.4,
        metalness: 0.4
    });

    // ── 1. BASE (plataforma elevada) ──
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(ancho + 0.4, 0.2, profundo + 0.4),
        matBase
    );
    base.position.y = 0.1;
    grupo.add(base);

    // ── 2. PAREDES ──
    // Pared trasera
    const paredTrasera = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, alto, 0.15),
        matExterior
    );
    paredTrasera.position.set(0, alto/2 + 0.1, -profundo/2);
    grupo.add(paredTrasera);

    // Pared izquierda
    const paredIzq = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, alto, profundo),
        matExterior
    );
    paredIzq.position.set(-ancho/2, alto/2 + 0.1, 0);
    grupo.add(paredIzq);

    // Pared derecha
    const paredDer = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, alto, profundo),
        matExterior
    );
    paredDer.position.set(ancho/2, alto/2 + 0.1, 0);
    grupo.add(paredDer);

    // Pared frontal (con puerta y ventana)
    const paredFrontal = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, alto, 0.15),
        matExterior
    );
    paredFrontal.position.set(0, alto/2 + 0.1, profundo/2);
    grupo.add(paredFrontal);

    // ── 3. TECHO ──
    const techo = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, 0.1, profundo),
        matTecho
    );
    techo.position.set(0, alto + 0.1, 0);
    grupo.add(techo);

    // ── 4. PUERTA (en pared frontal) ──
    const anchoPuerta = 1.2;
    const altoPuerta = 2.4;
    const posPuertaX = -1.5; // Desplazada a la izquierda
    
    // Marco de la puerta
    const marcoPuerta = new THREE.Mesh(
        new THREE.BoxGeometry(anchoPuerta + 0.15, altoPuerta + 0.15, 0.2),
        matMarco
    );
    marcoPuerta.position.set(posPuertaX, altoPuerta/2 + 0.1, profundo/2 + 0.02);
    grupo.add(marcoPuerta);

    // Hoja de la puerta
    const puerta = new THREE.Mesh(
        new THREE.BoxGeometry(anchoPuerta - 0.05, altoPuerta - 0.05, 0.1),
        matPuerta
    );
    puerta.position.set(posPuertaX, altoPuerta/2 + 0.1, profundo/2 + 0.07);
    grupo.add(puerta);

    // Pomo de la puerta
    const pomo = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        matPomo
    );
    pomo.position.set(posPuertaX + 0.45, 1.0 + 0.1, profundo/2 + 0.12);
    grupo.add(pomo);

    // ── 5. VENTANA GRANDE (en pared frontal) ──
    const anchoVentana = 2.5;
    const altoVentana = 1.8;
    const posVentanaX = 1.8; // Desplazada a la derecha
    
    // Marco de la ventana
    const marcoVentana = new THREE.Mesh(
        new THREE.BoxGeometry(anchoVentana + 0.15, altoVentana + 0.15, 0.2),
        matMarco
    );
    marcoVentana.position.set(posVentanaX, altoVentana/2 + 0.7 + 0.1, profundo/2 + 0.02);
    grupo.add(marcoVentana);

    // Vidrio de la ventana (panel principal)
    const vidrio = new THREE.Mesh(
        new THREE.BoxGeometry(anchoVentana - 0.05, altoVentana - 0.05, 0.05),
        matVidrio
    );
    vidrio.position.set(posVentanaX, altoVentana/2 + 0.7 + 0.1, profundo/2 + 0.07);
    grupo.add(vidrio);

    // Divisiones de la ventana (estilo industrial)
    const divisionVentana = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, altoVentana - 0.1, 0.06),
        matMarco
    );
    divisionVentana.position.set(posVentanaX, altoVentana/2 + 0.7 + 0.1, profundo/2 + 0.07);
    grupo.add(divisionVentana);

    const divisionVentanaH = new THREE.Mesh(
        new THREE.BoxGeometry(anchoVentana - 0.1, 0.04, 0.06),
        matMarco
    );
    divisionVentanaH.position.set(posVentanaX, altoVentana/2 + 0.7 + 0.1, profundo/2 + 0.07);
    grupo.add(divisionVentanaH);

    // ── 6. VENTANA LATERAL (pared derecha) ──
    const anchoVentanaLat = 1.5;
    const altoVentanaLat = 1.2;
    
    const marcoVentanaLat = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, altoVentanaLat + 0.15, anchoVentanaLat + 0.15),
        matMarco
    );
    marcoVentanaLat.position.set(ancho/2 + 0.02, altoVentanaLat/2 + 1.0 + 0.1, 0);
    grupo.add(marcoVentanaLat);

    const vidrioLat = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, altoVentanaLat - 0.05, anchoVentanaLat - 0.05),
        matVidrio
    );
    vidrioLat.position.set(ancho/2 + 0.07, altoVentanaLat/2 + 1.0 + 0.1, 0);
    grupo.add(vidrioLat);

    // ── 7. RÓTULO "RECEPCIÓN" ──
    const rotulo = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 0.4, 0.05),
        matAcento
    );
    rotulo.position.set(0, alto*1.07, profundo/2 + 0.02);
    grupo.add(rotulo);

    // ── 8. DETALLES EXTERIORES ──
    // Canaleta de agua (techo)
    const canaleta = new THREE.Mesh(
        new THREE.BoxGeometry(ancho - 0.5, 0.05, 0.1),
        matDetalle
    );
    canaleta.position.set(0, alto + 0.15, profundo/2 + 0.05);
    grupo.add(canaleta);

    // Bajante de agua (esquina)
    const bajante = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, alto + 0.1, 6),
        matDetalle
    );
    bajante.position.set(ancho/2 - 0.3, (alto + 0.1)/2, profundo/2 - 0.3);
    grupo.add(bajante);

    // ── 9. ESCALÓN DE ENTRADA ──
    const escalon = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.1, 0.4),
        matBase
    );
    escalon.position.set(posPuertaX, 0.25, profundo/2 + 0.2);
    grupo.add(escalon);

    // ── 10. JARDINERA (detalle exterior) ──
    const jardinera = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.3, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x5a6a5a, roughness: 0.9 })
    );
    jardinera.position.set(ancho/2 - 1.0, 0.35, profundo/2 + 0.3);
    grupo.add(jardinera);

    // Plantas (simples)
    for (let i = 0; i < 3; i++) {
        const planta = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 6, 6),
            new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.9 })
        );
        planta.position.set(ancho/2 - 1.0 + (i - 1) * 0.35, 0.5, profundo/2 + 0.3);
        grupo.add(planta);
    }

    return grupo;
}

export function crearEstacionRenovable(ancho = 3, profundo = 2.5, alto = 2.8) {
    const grupo = new THREE.Group();

    // ── PALETA DE COLORES ──
    const colores = {
        exterior:    0x8a9a7a,      // Verde grisáceo (eco-friendly)
        techo:       0x6a7a5a,      // Verde oscuro
        base:        0x5a6a5a,      // Gris verdoso
        marco:       0x4a5a4a,      // Verde oscuro metálico
        panel:       0x2a3a5a,      // Azul oscuro (paneles)
        vidrio:      0x88bbdd,      // Azul claro translúcido
        puerta:      0x5a6a5a,      // Verde grisáceo
        acento:      0x4caf50,      // Verde renovable
        detalles:    0x78909c,      // Gris metal
        iluminacion: 0x66bb6a,      // Verde claro LED
        techoPanel:  0x1a2a4a,      // Azul muy oscuro
    };

    // ── MATERIALES ──
    const matExterior = new THREE.MeshStandardMaterial({ 
        color: colores.exterior, 
        roughness: 0.7,
        metalness: 0.1
    });

    const matTecho = new THREE.MeshStandardMaterial({ 
        color: colores.techo, 
        roughness: 0.6,
        metalness: 0.1
    });

    const matBase = new THREE.MeshStandardMaterial({ 
        color: colores.base, 
        roughness: 0.8,
        metalness: 0.05
    });

    const matMarco = new THREE.MeshStandardMaterial({ 
        color: colores.marco, 
        roughness: 0.5,
        metalness: 0.3
    });

    const matPanel = new THREE.MeshStandardMaterial({ 
        color: colores.panel, 
        roughness: 0.3,
        metalness: 0.1
    });

    const matVidrio = new THREE.MeshStandardMaterial({ 
        color: colores.vidrio, 
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.3
    });

    const matPuerta = new THREE.MeshStandardMaterial({ 
        color: colores.puerta, 
        roughness: 0.6,
        metalness: 0.2
    });

    const matAcento = new THREE.MeshStandardMaterial({ 
        color: colores.acento, 
        roughness: 0.5,
        metalness: 0.1
    });

    const matDetalles = new THREE.MeshStandardMaterial({ 
        color: colores.detalles, 
        roughness: 0.4,
        metalness: 0.4
    });

    const matIluminacion = new THREE.MeshStandardMaterial({
        color: colores.iluminacion,
        emissive: colores.iluminacion,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.5
    });

    const matTechoPanel = new THREE.MeshStandardMaterial({ 
        color: colores.techoPanel, 
        roughness: 0.3,
        metalness: 0.1
    });

    // ── 1. BASE ──
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(ancho + 0.3, 0.15, profundo + 0.3),
        matBase
    );
    base.position.y = 0.075;
    grupo.add(base);

    // ── 2. PAREDES (estructura cerrada) ──
    // Pared trasera
    const paredTrasera = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, alto, 0.1),
        matExterior
    );
    paredTrasera.position.set(0, alto/2 + 0.15, -profundo/2);
    grupo.add(paredTrasera);

    // Pared izquierda
    const paredIzq = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, alto, profundo),
        matExterior
    );
    paredIzq.position.set(-ancho/2, alto/2 + 0.15, 0);
    grupo.add(paredIzq);

    // Pared derecha
    const paredDer = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, alto, profundo),
        matExterior
    );
    paredDer.position.set(ancho/2, alto/2 + 0.15, 0);
    grupo.add(paredDer);

    // Pared frontal (con puerta)
    const paredFrontal = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, alto, 0.1),
        matExterior
    );
    paredFrontal.position.set(0, alto/2 + 0.15, profundo/2);
    grupo.add(paredFrontal);

    // ── 3. TECHO ──
    const techo = new THREE.Mesh(
        new THREE.BoxGeometry(ancho, 0.08, profundo),
        matTecho
    );
    techo.position.set(0, alto + 0.15, 0);
    grupo.add(techo);

    // ── 4. PANELES SOLARES EN EL TECHO ──
    const numPanelesX = 3;
    const numPanelesZ = 2;
    const anchoPanel = 0.8;
    const profundoPanel = 0.8;
    const separacion = 0.1;

    for (let i = 0; i < numPanelesX; i++) {
        for (let j = 0; j < numPanelesZ; j++) {
            // Base del panel
            const basePanel = new THREE.Mesh(
                new THREE.BoxGeometry(anchoPanel, 0.02, profundoPanel),
                matMarco
            );
            const x = -ancho/2 + anchoPanel/2 + i * (anchoPanel + separacion) + 0.2;
            const z = -profundo/2 + profundoPanel/2 + j * (profundoPanel + separacion) + 0.2;
            basePanel.position.set(x, alto + 0.17, z);
            basePanel.rotation.x = 0.1; // Ligera inclinación
            grupo.add(basePanel);

            // Panel solar (vidrio)
            const panel = new THREE.Mesh(
                new THREE.BoxGeometry(anchoPanel - 0.05, 0.015, profundoPanel - 0.05),
                matVidrio
            );
            panel.position.set(x, alto + 0.19, z);
            panel.rotation.x = 0.1;
            grupo.add(panel);

            // Celdas (simuladas)
            for (let ci = -0.25; ci <= 0.25; ci += 0.5) {
                for (let cj = -0.25; cj <= 0.25; cj += 0.5) {
                    const celda = new THREE.Mesh(
                        new THREE.BoxGeometry(0.2, 0.01, 0.2),
                        matTechoPanel
                    );
                    celda.position.set(x + ci, alto + 0.2, z + cj);
                    celda.rotation.x = 0.1;
                    grupo.add(celda);
                }
            }
        }
    }

    // ── 5. PUERTA (en pared frontal) ──
    const anchoPuerta = 0.9;
    const altoPuerta = 2.0;
    
    // Marco de la puerta
    const marcoPuerta = new THREE.Mesh(
        new THREE.BoxGeometry(anchoPuerta + 0.1, altoPuerta + 0.1, 0.15),
        matMarco
    );
    marcoPuerta.position.set(0, altoPuerta/2 + 0.15, profundo/2 + 0.02);
    grupo.add(marcoPuerta);

    // Hoja de la puerta
    const puerta = new THREE.Mesh(
        new THREE.BoxGeometry(anchoPuerta - 0.02, altoPuerta - 0.02, 0.08),
        matPuerta
    );
    puerta.position.set(0, altoPuerta/2 + 0.15, profundo/2 + 0.07);
    grupo.add(puerta);

    // Pomo
    const pomo = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0xc0a050, 
            roughness: 0.3,
            metalness: 0.8
        })
    );
    pomo.position.set(0.35, 0.9 + 0.15, profundo/2 + 0.1);
    grupo.add(pomo);

    // ── 6. VENTANA PEQUEÑA (para ventilación) ──
    const anchoVentana = 0.6;
    const altoVentana = 0.4;
    
    const marcoVentana = new THREE.Mesh(
        new THREE.BoxGeometry(anchoVentana + 0.08, altoVentana + 0.08, 0.15),
        matMarco
    );
    marcoVentana.position.set(0.8, 1.6 + 0.15, profundo/2 + 0.02);
    grupo.add(marcoVentana);

    const vidrio = new THREE.Mesh(
        new THREE.BoxGeometry(anchoVentana - 0.02, altoVentana - 0.02, 0.05),
        matVidrio
    );
    vidrio.position.set(0.8, 1.6 + 0.15, profundo/2 + 0.07);
    grupo.add(vidrio);

    // ── 7. SÍMBOLO DE RENOVABLE (en la pared frontal) ──
    // Círculo
    const circulo = new THREE.Mesh(
        new THREE.RingGeometry(0.2, 0.28, 24),
        matAcento
    );
    circulo.position.set(-0.8, 1.8 + 0.15, profundo/2 + 0.06);
    grupo.add(circulo);

    // Triángulo
    const formaTriangulo = new THREE.Shape();
    formaTriangulo.moveTo(0, 0.28);
    formaTriangulo.lineTo(-0.22, -0.16);
    formaTriangulo.lineTo(0.22, -0.16);
    formaTriangulo.closePath();

    const triangulo = new THREE.Mesh(
        new THREE.ShapeGeometry(formaTriangulo),
        matAcento
    );
    triangulo.position.set(-0.8, 1.65 + 0.15, profundo/2 + 0.06);
    grupo.add(triangulo);

    // Línea horizontal
    const linea = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.04, 0.01),
        matAcento
    );
    linea.position.set(-0.8, 1.5 + 0.15, profundo/2 + 0.06);
    grupo.add(linea);

    // ── 8. REJILLA DE VENTILACIÓN ──
    const rejilla = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.15, 0.02),
        matDetalles
    );
    rejilla.position.set(-0.5, 0.4 + 0.15, profundo/2 + 0.06);
    grupo.add(rejilla);

    // Líneas de la rejilla
    for (let i = 0; i < 4; i++) {
        const lineaRejilla = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 0.01, 0.03),
            matMarco
        );
        lineaRejilla.position.set(-0.5, 0.35 + i * 0.04 + 0.15, profundo/2 + 0.07);
        grupo.add(lineaRejilla);
    }

    // ── 9. PLACA IDENTIFICATIVA ──
    const placa = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.08, 0.02),
        matDetalles
    );
    placa.position.set(0.8, 0.4 + 0.15, profundo/2 + 0.06);
    grupo.add(placa);

    // ── 10. BASE DE CONCRETO (alrededor) ──
    const bordeConcreto = new THREE.Mesh(
        new THREE.BoxGeometry(ancho + 0.5, 0.04, profundo + 0.5),
        new THREE.MeshStandardMaterial({ color: 0x6a7a7a, roughness: 0.9 })
    );
    bordeConcreto.position.y = 0.01;
    grupo.add(bordeConcreto);

    // ── 11. LUZ LED DE ESTADO (en el techo) ──
    const ledVerde = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 8, 8),
        matIluminacion
    );
    ledVerde.position.set(0, alto + 0.25 + 0.15, 0);
    grupo.add(ledVerde);

    // ── 12. ANTENA DE COMUNICACIÓN (detalle) ──
    const antena = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.015, 0.3, 6),
        matDetalles
    );
    antena.position.set(0.5, alto + 0.4 + 0.15, 0.5);
    grupo.add(antena);

    const baseAntena = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 6, 6),
        matDetalles
    );
    baseAntena.position.set(0.5, alto + 0.55 + 0.15, 0.5);
    grupo.add(baseAntena);

    return grupo;
}
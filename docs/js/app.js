import { crearTexturaNumero, crearCamionRecolector, crearArbol, crearCasaResidencial, crearEdificioPlano, crearAutomovil, crearZonaVerde, crearPlazaCivica, crearPileta, crearTiendaTambo, crearBancoPlaza, crearMesaAjedrezUrbana, crearJardineraBorde, crearCasaResidencialParam, crearEdificioParametrico, crearCanalOndulado, crearPuenteLevadizo, crearPistaConRampa, crearFajaSelectora, crearSuelo, crearCentroAcopio, crearCabinaRecepcion, crearEstacionRenovable, crearTacho} from './components.js';
import { inicializarRegla } from './medicion.js';

// --- 1. CONFIGURACIÓN DE ESCENA Y RENDER ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(-35, 60, 75);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxPolarAngle = Math.PI / 2 - 0.01;
controls.target.set(-20, 0, 25); // Ajustado ligeramente el enfoque al centro del nuevo macro-campo

// --- 2. ILUMINACIÓN ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight.position.set(40, 120, 40);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

// --- 3. BASE DE CARTÓN ---
const baseWidth = 120;
const baseHeight = 80;
const baseThickness = 5;

const geometryBase = new THREE.BoxGeometry(baseWidth, baseThickness, baseHeight);
const materialBase = new THREE.MeshStandardMaterial({ color: 0xb59a75, roughness: 0.9 });
const baseCarton = new THREE.Mesh(geometryBase, materialBase);
baseCarton.position.y = -baseThickness / 2;
baseCarton.receiveShadow = true;
scene.add(baseCarton);

// --- 4. CÁLCULO DE GRIDS Y CALLES ---
const numFilas = 2;
const numColumnas = 6;
const anchoPista = 4;
const materialPista = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });

const filasZ = [-baseHeight / 2];
const columnasX = [-baseWidth / 2];

for (let i = 0; i < numFilas; i++) {
    const zPos = -baseHeight / 2 + (baseHeight / (numFilas + 1)) * (i + 1);
    filasZ.push(zPos);
    const geomFila = new THREE.PlaneGeometry(baseWidth, anchoPista);
    const pistaFila = new THREE.Mesh(geomFila, materialPista);
    pistaFila.rotation.x = -Math.PI / 2;
    pistaFila.position.set(0, 0.01, zPos);
    pistaFila.receiveShadow = true;
    scene.add(pistaFila);
}

for (let j = 0; j < numColumnas; j++) {
    const xPos = -baseWidth / 2 + (baseWidth / (numColumnas + 1)) * (j + 1);
    columnasX.push(xPos);
    const geomCol = new THREE.PlaneGeometry(anchoPista, baseHeight);
    const pistaCol = new THREE.Mesh(geomCol, materialPista);
    pistaCol.rotation.x = -Math.PI / 2;
    pistaCol.position.set(xPos, 0.01, 0);
    pistaCol.receiveShadow = true;
    scene.add(pistaCol);
}
filasZ.push(baseHeight / 2);
columnasX.push(baseWidth / 2);

// --- 5. POBLAR MAPA POR SECTORES ---

// Dibujar sectores guía numéricos (Omitiendo la gran zona industrial de recolección 15, 16, 17 y 18)
let contadorSector = 1;
for (let f = 0; f < filasZ.length - 1; f++) {
    for (let c = 0; c < columnasX.length - 1; c++) {
        const centroX = (columnasX[c] + columnasX[c + 1]) / 2;
        const centroZ = (filasZ[f] + filasZ[f + 1]) / 2;

        if (contadorSector !== 15 && contadorSector !== 16 && contadorSector !== 17 && contadorSector !== 18) {
            const geomEtiqueta = new THREE.PlaneGeometry(10, 10);
            const meshEtiqueta = new THREE.Mesh(geomEtiqueta, crearTexturaNumero(contadorSector));
            meshEtiqueta.rotation.x = -Math.PI / 2;
            meshEtiqueta.position.set(centroX, 0.02, centroZ);
            scene.add(meshEtiqueta);
        }
        contadorSector++;
    }
}

// ============================================================================
// URBANIZACIÓN: SECTOR 1 (Esquina Residencial Superior Izquierda)
// ============================================================================
const centroSector1X = -1+(columnasX[0] + columnasX[1]) / 2;
const centroSector1Z = -1+(filasZ[0] + filasZ[1]) / 2;

// --- 0. Base del Sector 1 (Estilo Sector 10) ---
const anchoSector1 = columnasX[1] - columnasX[0]+2;
const largoSector1 = filasZ[1] - filasZ[0]+2;

const geomBase1 = new THREE.PlaneGeometry(anchoSector1 - 4, largoSector1 - 4);
const matBase = new THREE.MeshStandardMaterial({ color: 0x8C8787 });
const baseSector1 = new THREE.Mesh(geomBase1, matBase);

baseSector1.rotation.x = -Math.PI / 2;
baseSector1.position.set(centroSector1X, 0.01, centroSector1Z);
baseSector1.receiveShadow = true;
scene.add(baseSector1);

// --- 1. Instanciar Casa de 2 pisos ---
const casaConTejado = crearCasaResidencial();
casaConTejado.position.set(centroSector1X-3, 0.015, centroSector1Z+5);
scene.add(casaConTejado);

// --- 2. Jardinera con Borde ---
const jardinS1 = crearJardineraBorde(6, 4);
jardinS1.position.set(centroSector1X-3.5, 0.016, centroSector1Z -4);
scene.add(jardinS1);

// --- 3. Instanciar el Arbolito (Sobre la jardinera) ---
const arbolJardin = crearArbol();
arbolJardin.position.set(centroSector1X - 3.5, 0.15, centroSector1Z -4);
scene.add(arbolJardin);

// --- 4. Instanciar Edificio de 3 pisos ---
const edificioPlano = crearEdificioPlano(3, 0x90caf9, 5, 5);
edificioPlano.position.set(centroSector1X +4, 0.015, centroSector1Z - 3);
scene.add(edificioPlano);

// ============================================================================
// URBANIZACIÓN: SECTOR 2 (Zona Comercial / Residencial Media)
// ============================================================================
const centroSector2X = (columnasX[1] + columnasX[2]) / 2;
const centroSector2Z = (-2 + filasZ[0] + filasZ[1]) / 2;

// --- 0. Base del Sector 2 ---
const anchoSector2 = columnasX[2] - columnasX[1] + 2;
const largoSector2 = filasZ[1] - filasZ[0] + 4;

const geomBase2 = new THREE.PlaneGeometry(anchoSector2 - 6, largoSector2 - 6);
const matBase2 = new THREE.MeshStandardMaterial({ color: 0x8C8787 });
const baseSector2 = new THREE.Mesh(geomBase2, matBase2);

baseSector2.rotation.x = -Math.PI / 2;
baseSector2.position.set(centroSector2X, 0.01, centroSector2Z);
baseSector2.receiveShadow = true;
scene.add(baseSector2);

// --- 1. Instanciar Edificio de 4 pisos (Paramétrico) ---
const edificioCuatroPisos = crearEdificioParametrico(4, 0x78909c, 6.7, 5);
edificioCuatroPisos.position.set(centroSector2X - 3.1, 0.015, centroSector2Z - 2);
scene.add(edificioCuatroPisos);

// --- 2. Instanciar el "Edificio" de 2 pisos (Paramétrico) ---
const edificioDosPisos = crearEdificioParametrico(2, 0x9e8a78, 5, 5);
edificioDosPisos.position.set(centroSector2X + 3.5, 0.015, centroSector2Z + 1);
scene.add(edificioDosPisos);

// --- 3. Añadimos un toque verde (Jardinera) ---
const jardinS2 = crearJardineraBorde(4, 4);
jardinS2.position.set(centroSector2X + 3, 0.016, centroSector2Z - 7);
scene.add(jardinS2);

const arbolS2 = crearArbol();
arbolS2.position.set(centroSector2X + 3, 0.15, centroSector2Z - 7);
scene.add(arbolS2);

// ============================================================================
// URBANIZACIÓN: SECTOR 3 (Zona Comercial / Residencial Media Ampliada)
// ============================================================================
const centroSector3X = (columnasX[2] + columnasX[3]) / 2;
const centroSector3Z = -1+(filasZ[0] + filasZ[1]) / 2;

// --- 0. Base del Sector 3 (Estilo unificado) ---
const anchoSector3 = columnasX[3] - columnasX[2] + 2;
const largoSector3 = filasZ[1] - filasZ[0] + 4;

const geomBase3 = new THREE.PlaneGeometry(anchoSector3 - 6, largoSector3 - 6);
const matBase3 = new THREE.MeshStandardMaterial({ color: 0x8C8787 });
const baseSector3 = new THREE.Mesh(geomBase3, matBase3);

baseSector3.rotation.x = -Math.PI / 2;
baseSector3.position.set(centroSector3X, 0.01, centroSector3Z);
baseSector3.receiveShadow = true;
scene.add(baseSector3);

// --- 1. Instanciar Edificio de 4 pisos (Paramétrico) ---
// Usamos crearEdificioParametrico para mantener consistencia con el constructor modular
const edificioCuatroPisosS3 = crearEdificioParametrico(4, 0xdcedc8, 6.5, 5);
edificioCuatroPisosS3.position.set(centroSector3X - 3.3, 0.015, centroSector3Z - 2);
scene.add(edificioCuatroPisosS3);

// --- 2. Instanciar el Edificio de 2 pisos (Paramétrico) ---
const edificioDosPisosS3 = crearEdificioParametrico(2, 0xB3766B, 6, 5);
edificioDosPisosS3.position.set(centroSector3X + 3.5, 0.015, centroSector3Z + 1);
scene.add(edificioDosPisosS3);

// --- 3. Jardín de acompañamiento ---
const jardinS3 = crearJardineraBorde(4, 4);
jardinS3.position.set(centroSector3X-3, 0.016, centroSector3Z + 6);
scene.add(jardinS3);

const arbolS3 = crearArbol();
arbolS3.position.set(centroSector3X-3, 0.15, centroSector3Z + 6);
scene.add(arbolS3);

// ============================================================================
// URBANIZACIÓN: SECTORES 4 Y 5 RECONFIGURADOS (Parking y Complejo Urbano)
// ============================================================================

// El Sector 4 y 5 combinados abarcan desde columnasX[3] hasta columnasX[5]
const inicioS4X = columnasX[3];
const finS5X = columnasX[5]+1;
const centroMacroZ = (filasZ[0] + filasZ[1]*1.2) / 2+0.7; // Fila superior

// --- SUB-ZONA: ESTACIONAMIENTO RESIDENCIAL/COMERCIAL (Aproximadamente Sector 4 al 4.5) ---
const finParkingX = 20+columnasX[3] + (columnasX[4] - columnasX[3]+4) / 2;
const centroParkingUrbanX = (inicioS4X + finParkingX+4) / 2;

// Única gran plataforma de concreto para el parking
const geomParkingPlataforma = new THREE.PlaneGeometry((finParkingX - inicioS4X), (filasZ[1] - filasZ[0]) * 0.9+1.5);
const matParkingPlataforma = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.8 });
const plataformaParkingUrban = new THREE.Mesh(geomParkingPlataforma, matParkingPlataforma);
plataformaParkingUrban.rotation.x = -Math.PI / 2;
plataformaParkingUrban.position.set(centroParkingUrbanX, 0.016, centroMacroZ);
plataformaParkingUrban.receiveShadow = true;
scene.add(plataformaParkingUrban);

// --- INSTANCIACIÓN DEL AUTOMÓVIL ---
const autoSedan = crearAutomovil(0xd32f2f); // Rojo maqueta
autoSedan.position.set(-12.5+centroParkingUrbanX, 0.015, centroMacroZ+8);
autoSedan.rotation.y = Math.PI / 2;
scene.add(autoSedan);

// --- Instanciar Edificio Comercial Medio (3 pisos) ---
const edificioMedioUrb = crearEdificioPlano(3, 0x90a4ae, 5 , 5);
edificioMedioUrb.position.set(-8+finParkingX + 5.5, 0.015, centroMacroZ);
scene.add(edificioMedioUrb);

// --- Instanciar Edificio Comercial Bajo (2 pisos) ---
const edificioBajoUrb = crearEdificioPlano(2, 0xd7ccc8,5,5);
edificioBajoUrb.position.set(-14.7 + finS5X - 3.5, 0.015, centroMacroZ );
scene.add(edificioBajoUrb);

// --- Un Mango en el espacio entre edificios ---
const arbolRelleno = crearArbol();
arbolRelleno.position.set(-23 + (finParkingX  + finS5X) / 2, 0.015, centroMacroZ-5);
scene.add(arbolRelleno);

// ============================================================================
// URBANIZACIÓN: SECTOR 6 (Zona Verde / Pasto Puro)
// ============================================================================
const centroSector6X = -6.8 + (columnasX[5] + columnasX[6]) / 2;
const centroSector6Z = 6.7 + (filasZ[0] + filasZ[1]) / 2;

// Instanciamos la superficie de pasto puro optimizada
const sectorVerde = crearZonaVerde(6.8, 30.0);
sectorVerde.position.set(centroSector6X-0.2, 0.015, centroSector6Z+7);
scene.add(sectorVerde);

// --- INSTANCIACIÓN DE ÁRBOLES EN LA ZONA VERDE ---
// Primer árbol: Desplazado hacia la esquina superior izquierda del bloque de pasto
const arbolPasto1 = crearArbol();
arbolPasto1.position.set(centroSector6X , 0.015, centroSector6Z - 6.0);
scene.add(arbolPasto1);

// Segundo árbol: Desplazado hacia la zona inferior derecha para romper la simetría
const arbolPasto2 = crearArbol();
arbolPasto2.position.set(centroSector6X-2, 0.015, centroSector6Z + 10.0);
// Escalado sutil opcional para que no se vean idénticos (rompiendo el patrón repetitivo)
arbolPasto2.scale.set(0.9, 1.1, 0.9); 
scene.add(arbolPasto2);

// --- URBANIZACIÓN: CANAL CENTRAL (Zonas 6 y 7) ---
// Asumiendo que el canal ocupa el centro de estas zonas
const centroCanalX = (columnasX[5] + columnasX[6]) / 2;
const centroCanalZ = (filasZ[0] + filasZ[1]) / 2;

// Ejemplos de uso
//crearCanalOndulado(20, 10, 5, 'ambas')      // default — ambos lados
//crearCanalOndulado(20, 10, 5, 'derecha')    // solo franja derecha
//crearCanalOndulado(20, 10, 5, 'izquierda') // solo franja izquierda
//crearCanalOndulado(20, 10, 5, 'ninguna')   // canal limpio sin vegetación

const canalOndulado = crearCanalOndulado(35, 10, 6.8, 'ambas');
canalOndulado.position.set(centroCanalX+4, 0.02, centroCanalZ+3.5);
canalOndulado.rotation.y = (Math.PI)*1.074;
scene.add(canalOndulado);

const canalOndulado2 = crearCanalOndulado(32, 10, 6.7, 'ambas');
canalOndulado2.position.set(centroCanalX+10.5, 0.02, centroCanalZ+18.5);
canalOndulado2.rotation.y = (Math.PI/2)*1.2;
scene.add(canalOndulado2);

// ============================================================================
// URBANIZACIÓN: SECTOR 7 (extremeo de puente y pasto)
// ============================================================================
const centroSector7X = 1.25*columnasX[6];
const centroSector7Z = 0.75*filasZ[0];

const rampaSalida = crearPistaConRampa(7,6,5,9,0, 10);
rampaSalida.rotation.y = -(Math.PI)*0.5;
rampaSalida.position.set(centroSector7X-2, 0, centroSector7Z-8.5);
scene.add(rampaSalida);

// Instanciamos la superficie de pasto puro optimizada
const sectorVerde7 = crearZonaVerde(14, 16.0);
sectorVerde7.position.set(centroSector7X-0.5, 0.015, centroSector7Z-2);
scene.add(sectorVerde7);

// ============================================================================
// URBANIZACIÓN: SECTOR 8 (Zona Residencial/Comercial de Baja Altura)
// ============================================================================
// El Sector 8 está delimitado entre columnasX[0] a columnasX[1] y filasZ[1] a filasZ[2]
const centroSector8X = (-2+columnasX[0] + columnasX[1]) / 2;
const centroSector8Z = (filasZ[1] + filasZ[2]) / 2;

// --- 0. Superficie de Concreto (Base de la Manzana) ---
const anchoManzanaX = (columnasX[1] - columnasX[0]) * 0.88;
const largoManzanaZ = (filasZ[2] - filasZ[1]) * 0.85;

const geomBaseCemento = new THREE.PlaneGeometry(anchoManzanaX, largoManzanaZ);
const matBaseCemento = new THREE.MeshStandardMaterial({ color: 0x767F82, roughness: 0.75 }); // Gris concreto maqueta
const plataformaSector8 = new THREE.Mesh(geomBaseCemento, matBaseCemento);
plataformaSector8.rotation.x = -Math.PI / 2;
plataformaSector8.position.set(centroSector8X, 0.016, centroSector8Z);
plataformaSector8.receiveShadow = true;
scene.add(plataformaSector8);

// --- 0.5. Superficie de Jardín Lateral (Zona Verde para los Árboles) ---
// Ocupa el 30% del ancho de la manzana en el lado izquierdo
const anchoJardinX = anchoManzanaX * 0.3;
const largoJardinZ = largoManzanaZ * 0.95; // Casi todo el largo de la acera
const jardinSector8 = crearZonaVerde(anchoJardinX, largoJardinZ);

// Posicionado en el borde izquierdo de la plataforma de concreto
// Restamos la mitad del concreto y sumamos la mitad del jardín para alinearlo al borde
const posJardinX = centroSector8X - (anchoManzanaX / 2) + (anchoJardinX / 2) + 0.3;
jardinSector8.position.set(posJardinX, 0.016, centroSector8Z);
scene.add(jardinSector8);

// --- 1. Estructura "Cuadrada" (Edificio plano de 1 piso) ---
const edificioUnPiso = crearEdificioPlano(1, 0xe0a96d,5,5); 
edificioUnPiso.position.set(centroSector8X + 1.5, 0.015, centroSector8Z + 5.0); // Movido ligeramente en X para dar espacio
scene.add(edificioUnPiso);

// --- 2. Casa de 1 piso con tejado a dos aguas ---
const casaBajaTejado = crearCasaResidencial(); 
casaBajaTejado.scale.set(0.9, 0.65, 0.9); 
casaBajaTejado.position.set(centroSector8X + 1.5, 0.015, centroSector8Z - 6.0); // Movido ligeramente en X para dar espacio
casaBajaTejado.rotation.y = 0; 
scene.add(casaBajaTejado);

// --- ÁRBOL 1 (Esquina superior izquierda, ahora dentro del jardín) ---
const arbolPasto8_1 = crearArbol();
arbolPasto8_1.position.set(posJardinX, 0.015, centroSector8Z - 4.0);
arbolPasto8_1.scale.set(0.9, 1.1, 0.9); 
scene.add(arbolPasto8_1);              

// --- ÁRBOL 2 (Esquina inferior izquierda, ahora dentro del jardín) ---
const arbolPasto8_2 = crearArbol();
arbolPasto8_2.position.set(posJardinX, 0.015, centroSector8Z + 5.0);
arbolPasto8_2.scale.set(1.1, 0.9, 1.1); 
scene.add(arbolPasto8_2);

// ============================================================================
// URBANIZACIÓN: SECTOR 9 (Tienda TAMBO + Zona Verde Recreativa)
// ============================================================================
// Ajustamos los índices a [1] y [2] (o los que correspondan a tu Sector 9)
const centroSector9X = (columnasX[1] + columnasX[2]) / 2;
const centroSector9Z = (filasZ[1] + filasZ[2]) / 2;

const anchoM9X = (columnasX[2] - columnasX[1]) * 0.78;
const largoM9Z = (filasZ[2] - filasZ[1]) * 0.85;

// --- 1. Plataforma Base de Concreto ---
const geomPlataforma9 = new THREE.PlaneGeometry(anchoM9X, largoM9Z);
const matPlataforma9 = new THREE.MeshStandardMaterial({ color: 0x767F82, roughness: 0.75 });
const aceraSector9 = new THREE.Mesh(geomPlataforma9, matPlataforma9);
aceraSector9.rotation.x = -Math.PI / 2;
aceraSector9.position.set(centroSector9X, 0.016, centroSector9Z);
scene.add(aceraSector9);

// --- 2. Superficie de Jardín con Borde ---
const anchoJardin9X = (anchoM9X * 0.38) - 2;
const largoJardin9Z = largoM9Z - 17;
const jardinSector9 = crearJardineraBorde(anchoJardin9X, largoJardin9Z);

// Ubicado en el centro 9
jardinSector9.position.set(-7 + centroSector9X + (anchoM9X * 0.3), 0.016, centroSector9Z - 6);
scene.add(jardinSector9);

// --- 3. Instanciar el Tambo ---
const tiendaTambo = crearTiendaTambo();
tiendaTambo.rotation.y = Math.PI / 2;
tiendaTambo.position.set(centroSector9X + 2, 0.015, centroSector9Z - 6.0);
scene.add(tiendaTambo);

// --- 4. Bancas y Mesas ---
const bancaTambo1 = crearBancoPlaza();
bancaTambo1.rotation.y = -Math.PI/2;
bancaTambo1.position.set(centroSector9X - 5.2, 0.015, centroSector9Z - 7.5);
scene.add(bancaTambo1);

const bancaTambo2 = crearBancoPlaza();
bancaTambo2.rotation.y = -Math.PI/2;
bancaTambo2.position.set(centroSector9X - 5.2, 0.015, centroSector9Z - 4);
scene.add(bancaTambo2);

const posMesaX = centroSector9X + (anchoM9X * 0.3);
const mesaAjedrez1 = crearMesaAjedrezUrbana();
mesaAjedrez1.position.set(posMesaX, 0.016, centroSector9Z - 1.0);
scene.add(mesaAjedrez1);

const mesaAjedrez2 = crearMesaAjedrezUrbana();
mesaAjedrez2.position.set(posMesaX, 0.016, centroSector9Z + 3.0);
scene.add(mesaAjedrez2);

// --- 5. Automóvil ---
const autoSedan9 = crearAutomovil(0xD6D2D2);
autoSedan9.position.set(centroSector9X - 1.5, 0.015, centroSector9Z + 7.0);
autoSedan9.rotation.y = Math.PI;
scene.add(autoSedan9);

// ============================================================================
// URBANIZACIÓN: SECTOR 10 (Residencia con Jardín y Árbol)
// ============================================================================
const centroSector10X = (columnasX[2] + columnasX[3]) / 2;
const centroSector10Z = (filasZ[1] + filasZ[2]) / 2;

// --- 0. Asfalto del Sector 10 ---
const anchoSector10 = columnasX[3] - columnasX[2];
const largoSector10 = filasZ[2] - filasZ[1];

const geomAsfalto10 = new THREE.PlaneGeometry(anchoSector10-4, largoSector10-4);
const matAsfalto = new THREE.MeshStandardMaterial({ color: 0x8C8787 }); // Color de asfalto
const asfaltoSector10 = new THREE.Mesh(geomAsfalto10, matAsfalto);

asfaltoSector10.rotation.x = -Math.PI / 2;
asfaltoSector10.position.set(centroSector10X, 0.01, centroSector10Z);
asfaltoSector10.receiveShadow = true;
scene.add(asfaltoSector10);

// --- 1. La Casa (Usando la versión Paramétrica con escala ajustada al sector) ---
const casa10 = crearCasaResidencialParam(6.5, 5.5, 6.0, {
    paredes: 0x333333,
    tejado: 0x990000,
    puerta: 0xffffff
});
casa10.position.set(centroSector10X - 1.5, 0.015, centroSector10Z-9);
scene.add(casa10);

// --- 2. Jardín con Borde (Al lado de la casa) ---
// Dimensiones calculadas para que sea un espacio verde proporcional
const jardinSector10 = crearJardineraBorde(10, 6);
jardinSector10.position.set(centroSector10X, 0.016, centroSector10Z+5);
scene.add(jardinSector10);

// --- 3. Árbol (Ubicado sobre la jardinera) ---
// Nota: Si crearArbol() ya incluye su propio tronco/copa, solo ajustamos su Y
const arbol10 = crearArbol();
arbol10.position.set(centroSector10X, 0.15, centroSector10Z+5);
scene.add(arbol10);

// ============================================================================
// URBANIZACIÓN: SECTOR 11 y 12 (Plaza Cívica Central con Bancas)
// ============================================================================
const centroPlazaX = -42.8 + (columnasX[6] + columnasX[7]) / 2; 
const centroPlazaZ = 26.7+(filasZ[0] + filasZ[1]) / 2;

const plazaCentral = crearPlazaCivica(30.5, 22.5);
plazaCentral.position.set(centroPlazaX, 0.015, centroPlazaZ);
scene.add(plazaCentral);

// --- INSTANCIACIÓN DE LA PILETA CENTRAL ---
const piletaCentro = crearPileta();
// Se posiciona exactamente en las coordenadas de la plaza
// El constructor interno ya maneja los offsets en Y para asentarse sobre el adoquín
piletaCentro.position.set(centroPlazaX, 0.015, centroPlazaZ);
scene.add(piletaCentro);

// ============================================================================
// URBANIZACIÓN: SECTOR 13 y 14  PUENTE SOBRE EL CANAL
// ============================================================================
// Asumiendo que las zonas 13 y 14 se definen por filasZ[1] y filasZ[2]
const centroPuenteX = (columnasX[6] + columnasX[7]) / 2;
const centroPuenteZ = (filasZ[1]) / 2;
//crearPuenteLevadizo(anchoRio, anchoPuente, alturaPilar, anguloApertura)
const puenteLevadizo = crearPuenteLevadizo(24, 8, 4,0); // 30 grados de apertura
puenteLevadizo.rotation.y = Math.PI/2;
puenteLevadizo.position.set(centroPuenteX, 0.02, centroPuenteZ-5);
scene.add(puenteLevadizo);

const centroRampaX = columnasX[6]-columnasX[6]/5;
const centroRampaZ = (filasZ[1]+filasZ[2]);
const rampaAcceso = crearPistaConRampa(7,15,5,9,Math.PI / 2.9, 8);
rampaAcceso.rotation.y = 0;
rampaAcceso.position.set(centroRampaX-2.2, 0, centroRampaZ + 12);
scene.add(rampaAcceso);

const pistacurva1 = crearPistaConRampa(7,15,0.1,9,Math.PI / 2.9, 8);
pistacurva1.position.set(centroRampaX-2.2, 0, centroRampaZ + 12);
scene.add(pistacurva1);

const pistacurva2 = crearPistaConRampa(7,45,0.1,9,Math.PI / 4, 8);
pistacurva2.position.set(centroRampaX+20.2, 0, centroRampaZ + 12);
pistacurva2.rotation.y = Math.PI;
scene.add(pistacurva2);

// Instanciamos la superficie de pasto puro optimizada
const sectorVerde14 = crearZonaVerde(15.5, 18.0);
sectorVerde14.position.set(centroPuenteX+1, 0.015, centroPuenteZ+13.8);
scene.add(sectorVerde14);

// Instanciamos la superficie de pasto puro optimizada
const sectorVerde14_2 = crearZonaVerde(25, 7.0);
sectorVerde14_2.position.set(centroPuenteX-15, 0.015, centroPuenteZ+11.8);
scene.add(sectorVerde14_2);

// ============================================================================
// MACRO-CAMPO DE RECOLECCIÓN INTEGRADA (Sectores 15, 16, 17 y 18 Unificados)
// ============================================================================

// Límites globales de la gran plataforma continua
const inicioCampoX = columnasX[0];
const finCampoX = columnasX[4] - anchoPista / 2;
const centroCampoX = (inicioCampoX + finCampoX) / 2;
const centroCampoZ = (filasZ[2] + filasZ[3]) / 2 + anchoPista / 4;

const anchoCampoX = finCampoX - inicioCampoX;
const largoCampoZ = (filasZ[3] - filasZ[2] - anchoPista / 2);

// Única gran vereda de concreto limpio que unifica estéticamente la zona
const geomCampo = new THREE.PlaneGeometry(anchoCampoX, largoCampoZ);
const matCampo = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.65 });
const plataformaRecoleccion = new THREE.Mesh(geomCampo, matCampo);
plataformaRecoleccion.rotation.x = -Math.PI / 2;
plataformaRecoleccion.position.set(centroCampoX, 0.015, centroCampoZ);
plataformaRecoleccion.receiveShadow = true;
scene.add(plataformaRecoleccion);

const tacho = crearTacho(1.1,2.8, 0x3E59AD);
tacho.position.set(inicioCampoX+6, 0.05, centroCampoZ);
scene.add(tacho);

// Tacho verde con flecha blanca
const tachoVerde = crearTacho(1.0, 2.8, 0x2e7d32);
tachoVerde.position.set(inicioCampoX+10, 0.05, centroCampoZ);
scene.add(tachoVerde);
// Tacho azul con flecha blanca
const tachoAzul = crearTacho(1.2, 3.0, 0x1565c0);
tachoAzul.position.set(inicioCampoX+14, 0.05, centroCampoZ);
scene.add(tachoAzul);
// Tacho rojo con flecha blanca
const tachoRojo = crearTacho(0.8, 2.5, 0xc62828);
tachoRojo.position.set(inicioCampoX+18, 0.05, centroCampoZ);
scene.add(tachoRojo);

// Ejemplo: Crear una zona de suelo plomo claro (0xcccccc)
// Tamaño 20x20
const zonaSuelo = crearSuelo(20, 20, 0xcccccc);

// Ubicación
zonaSuelo.position.set(0, 0, 0); 
scene.add(zonaSuelo);

// ============================================================================
// URBANIZACIÓN: SECTOR 19, 20, 21 SERVICIOS  - CENTRO DE ACOPIO CON FAJA SELECTORA DE RESIDUOS Y 
// ============================================================================
const centroFajaX = (columnasX[3] + columnasX[6]);
const centroFajaZ = (filasZ[3]); 

// 1. Crear el suelo (plomo claro: 0xcccccc)
// Usamos dimensiones ligeramente mayores a la faja (14 x 4) para crear un efecto de "área de trabajo"
const sueloFaja = crearSuelo(24.5, 50, 0x525252);
sueloFaja.position.set(centroFajaX+0.8, 0.05, centroFajaZ-12.2); // Ligeramente elevado para evitar z-fighting
scene.add(sueloFaja);

// 2. Crear e instanciar la faja (altura 0.5 para que esté sobre el suelo)
// Definimos los desplazamientos en X para cada faja
const offsetsX = [15, 8, 2]; // Puedes añadir más aquí en el futuro

offsetsX.forEach((offsetX) => {
    const faja = crearFajaSelectora(13, 2.7, 1.2); 
    faja.rotation.y = Math.PI / 2; 
    faja.position.set(centroFajaX + offsetX, 0, centroFajaZ - 12);
    
    // Si también quieres el suelo para cada una:
    const suelo = crearSuelo(14, 4, 0xcccccc);
    suelo.position.set(centroFajaX + offsetX, 0.01, centroFajaZ - 12);
    
    scene.add(suelo);
    scene.add(faja);
});

// ============================================================================
// URBANIZACIÓN: INSTANCIACIÓN DEL CENTRO DE ACOPIO
// ============================================================================

// Calculamos el centro del área ocupada por las fajas
// Promedio de los offsets (15, 8, 2) = 8.33
const centroEdificioX = centroFajaX + 8.5; 
const centroEdificioZ = centroFajaZ - 12;

// Instanciamos el edificio
// Ancho: debe cubrir desde offset 2 hasta 15 (aprox 18 unidades)
// Profundo: debe cubrir la longitud de las fajas (13 unidades)
const centroAcopio = crearCentroAcopio(22, 16, 8); 

centroAcopio.position.set(centroEdificioX, 0, centroEdificioZ);
scene.add(centroAcopio);

const cabina = crearCabinaRecepcion(9, 10, 5);
cabina.position.set(centroFajaX-9, 0, 25); // Colocarla a un lado
scene.add(cabina)


const arbolJardin20 = crearArbol();
arbolJardin20.position.set(centroEdificioX - 30, 0.15, centroEdificioX -8);
scene.add(arbolJardin20);

const estacionRenovable = crearEstacionRenovable(4, 12, 5);
estacionRenovable.position.set(centroEdificioX+14, 0, centroEdificioZ);
scene.add(estacionRenovable);

// --- SUB-ZONA DE TACHOS (Manteniendo lógica estricta en Sectores 15-16) ---
const finEstacionX = columnasX[2] - anchoPista / 2;
const anchoEstacionX = finEstacionX - inicioCampoX;
const separacionX = anchoEstacionX / 5;




// --- SUB-ZONA DE ESTACIONAMIENTO LONGITUDINAL (Sectores 17-18) ---
const inicioParkingX = columnasX[2] + anchoPista / 2;
const centroParkingX = (inicioParkingX + finCampoX) / 2;

// Línea horizontal amarilla para el encuadre del camión a lo largo de la calzada
const geomLineaGuia = new THREE.PlaneGeometry(16, 0.3);
const matLineaGuia = new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 0.5 });

const lineaEstacionamiento = new THREE.Mesh(geomLineaGuia, matLineaGuia);
lineaEstacionamiento.rotation.x = -Math.PI / 2;
// Centrado en el espacio de parking (17-18) y desplazado ligeramente en Z hacia la pista
lineaEstacionamiento.position.set(centroParkingX, 0.017, centroCampoZ + 2); 
scene.add(lineaEstacionamiento);

// --- INSTANCIACIÓN DEL CAMIÓN RECOLECTOR MODERNO ---
const camion = crearCamionRecolector();
// Posicionar sobre la línea de demarcación amarilla
camion.position.set(centroParkingX, 0.015, centroCampoZ + 2);
camion.rotation.y = 0; 
scene.add(camion);

// --- 6. INICIALIZACIONES EXTRA Y BUCLE DE RENDER ---
inicializarRegla(scene, camera, renderer, baseCarton, controls);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
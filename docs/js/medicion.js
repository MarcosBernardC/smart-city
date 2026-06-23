export function inicializarRegla(scene, camera, renderer, baseCarton, controls) {
    let reglaActiva = false; 
    let puntosMarcados = 0; 
    let pA = null, pB = null;
    
    const esferaGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const matPuntoA = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const matPuntoB = new THREE.MeshBasicMaterial({ color: 0x00a8ff });
    const marcadorA = new THREE.Mesh(esferaGeo, matPuntoA);
    const marcadorB = new THREE.Mesh(esferaGeo, matPuntoB);
    marcadorA.visible = false; 
    marcadorB.visible = false;
    scene.add(marcadorA, marcadorB);

    const materialLinea = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
    const geometriaLinea = new THREE.BufferGeometry();
    const posicionesLinea = new Float32Array(6);
    geometriaLinea.setAttribute('position', new THREE.BufferAttribute(posicionesLinea, 3));
    const lineaMedicion = new THREE.Line(geometriaLinea, materialLinea);
    lineaMedicion.visible = false;
    scene.add(lineaMedicion);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm') {
            reglaActiva = !reglaActiva;
            document.getElementById('modo-regla').style.display = reglaActiva ? 'block' : 'none';
            document.body.style.cursor = reglaActiva ? 'crosshair' : 'default';
            controls.enablePan = !reglaActiva;
            controls.enableRotate = !reglaActiva;
            if (!reglaActiva) resetMedicion();
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (!reglaActiva) return;
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersecciones = raycaster.intersectObject(baseCarton);
        if (intersecciones.length > 0 && puntosMarcados === 1) {
            const puntoActual = intersecciones[0].point;
            posicionesLinea[3] = puntoActual.x; posicionesLinea[4] = 0.1; posicionesLinea[5] = puntoActual.z;
            lineaMedicion.geometry.attributes.position.needsUpdate = true;
            const dist = pA.distanceTo(puntoActual);
            document.getElementById('txt-distancia').innerText = `Distancia: ${dist.toFixed(2)} cm`;
        }
    });

    window.addEventListener('click', (e) => {
        if (!reglaActiva) return;
        raycaster.setFromCamera(mouse, camera);
        const intersecciones = raycaster.intersectObject(baseCarton);
        if (intersecciones.length > 0) {
            const puntoInterseccion = intersecciones[0].point;
            if (puntosMarcados === 0) {
                pA = puntoInterseccion.clone();
                marcadorA.position.set(pA.x, 0.4, pA.z); marcadorA.visible = true;
                posicionesLinea[0] = pA.x; posicionesLinea[1] = 0.1; posicionesLinea[2] = pA.z;
                posicionesLinea[3] = pA.x; posicionesLinea[4] = 0.1; posicionesLinea[5] = pA.z;
                lineaMedicion.geometry.attributes.position.needsUpdate = true;
                lineaMedicion.visible = true;
                puntosMarcados = 1;
            } else if (puntosMarcados === 1) {
                pB = puntoInterseccion.clone();
                marcadorB.position.set(pB.x, 0.4, pB.z); marcadorB.visible = true;
                posicionesLinea[3] = pB.x; posicionesLinea[4] = 0.1; posicionesLinea[5] = pB.z;
                lineaMedicion.geometry.attributes.position.needsUpdate = true;
                const distFinal = pA.distanceTo(pB);
                document.getElementById('txt-distancia').innerHTML = `<strong style="color:#00ff00;">Medición final: ${distFinal.toFixed(2)} cm</strong>`;
                puntosMarcados = 2;
            } else {
                resetMedicion();
                pA = puntoInterseccion.clone();
                marcadorA.position.set(pA.x, 0.4, pA.z); marcadorA.visible = true;
                posicionesLinea[0] = pA.x; posicionesLinea[1] = 0.1; posicionesLinea[2] = pA.z;
                posicionesLinea[3] = pA.x; posicionesLinea[4] = 0.1; posicionesLinea[5] = pA.z;
                lineaMedicion.geometry.attributes.position.needsUpdate = true;
                lineaMedicion.visible = true;
                puntosMarcados = 1;
            }
        }
    });

    function resetMedicion() {
        puntosMarcados = 0; pA = null; pB = null;
        marcadorA.visible = false; marcadorB.visible = false; lineaMedicion.visible = false;
        document.getElementById('txt-distancia').innerText = "Distancia: --";
    }
}
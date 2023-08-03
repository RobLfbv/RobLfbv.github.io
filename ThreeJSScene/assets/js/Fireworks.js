import * as THREE from "three";
import * as TWEEN from 'tween';

export function createFireworkRocket(scene, position, sphereColor, trailColor, explosionSize, explosionDuration, particleSize) {
    const particleGeometry = new THREE.SphereGeometry(2, 16, 16);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: sphereColor });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.copy(position);
    scene.add(particle);

    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = [];
    trailPositions.push(0, 0, 0); // Starting point of the trail (same as particle position)
    trailPositions.push(0, 0, 0); // Ending point of the trail, will be updated later

    const trailMaterial = new THREE.LineBasicMaterial({ color: trailColor });
    const trail = new THREE.Line(trailGeometry, trailMaterial);
    trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
    particle.add(trail);

    const destination = new THREE.Vector3(position.x, position.y + getRandomPosition(100, 300), position.z);
    const tween = new TWEEN.Tween(particle.position)
        .to(destination, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            // Update the ending point of the trail as the particle moves
            trailPositions[3] = particle.position.x;
            trailPositions[4] = particle.position.y;
            trailPositions[5] = particle.position.z;
            trailGeometry.attributes.position.needsUpdate = true;
        })
        .onComplete(() => {
            createFireworkExplosion(scene, destination, sphereColor, explosionSize, explosionDuration, particleSize);
            scene.remove(particle);
        });

    tween.start();
}

function createFireworkExplosion(scene, position, sphereColor, explosionSize, explosionDuration, particleSize) {
    const particleCount = 100;
    const explosionSpeed = 0.5;

    // Créer un conteneur pour les particules de l'explosion
    const explosion = new THREE.Group();
    explosion.position.copy(position); // Positionner l'explosion à l'endroit souhaité
    explosion.scale.set(explosionSize, explosionSize, explosionSize); // Ajuster l'échelle du conteneur d'explosion
    scene.add(explosion);

    // Géométrie et matériau pour les particules
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleMaterial = new THREE.PointsMaterial({ color: sphereColor, size: particleSize });

    // Positionner toutes les particules au centre de l'explosion
    for (let i = 0; i < particleCount; i++) {
        const index = i * 3;
        particlePositions[index] = 0;
        particlePositions[index + 1] = 0;
        particlePositions[index + 2] = 0;
    }

    // Ajouter les positions au buffer de la géométrie des particules
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Créer l'objet Points pour les particules
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    explosion.add(particles);

    // Animer les particules pour les propulser vers l'extérieur
    const particleVelocities = [];
    for (let i = 0; i < particleCount; i++) {
        // Générer des directions et des vitesses aléatoires pour les particules
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * explosionSpeed,
            (Math.random() - 0.5) * explosionSpeed,
            (Math.random() - 0.5) * explosionSpeed
        );
        particleVelocities.push(velocity);
    }

    function animateParticles() {
        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            particlePositions[index] += particleVelocities[i].x;
            particlePositions[index + 1] += particleVelocities[i].y;
            particlePositions[index + 2] += particleVelocities[i].z;
        }

        particleGeometry.attributes.position.needsUpdate = true;
    }

    // Ajouter la fonction d'animation à la boucle de rendu
    function render() {
        requestAnimationFrame(render);
        animateParticles();
        // Autres mises à jour de l'animation Three.js si nécessaire
        // renderer.render(scene, camera);
    }
    render();

    // Supprimer le conteneur de l'explosion après la durée spécifiée
    setTimeout(() => {
        scene.remove(explosion);
    }, explosionDuration);
}

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}

function createRandomFirework(scene) {
    const x = getRandomPosition(-50, 50); // Coordonnée x aléatoire entre -50 et 50
    const y = getRandomPosition(0, 100);  // Coordonnée y aléatoire entre 0 et 100
    const z = getRandomPosition(-50, 50); // Coordonnée z aléatoire entre -50 et 50
    const explosionSize = getRandomPosition(1, 5); // Taille de l'explosion aléatoire entre 1 et 5
    const explosionDuration = 2000; // Durée de l'explosion (en millisecondes)
    const color = getRandomColor();
    createFireworkRocket(scene, new THREE.Vector3(x, y, z), color, color, explosionSize, explosionDuration, 3);
}
// Envoyer des feux d'artifice aléatoires toutes les 2 à 5 secondes
export function sendRandomFireworks(scene) {
    const minInterval = 500;
    const maxInterval = 2000;

    createRandomFirework(scene); // Envoyer un feu d'artifice dès le début

    setInterval(() => {
        createRandomFirework(scene);
    }, Math.random() * (maxInterval - minInterval) + minInterval);
}

function getRandomColor() {
    var h = rand(1, 360);
    var s = rand(80, 100);
    var l = rand(50, 70);
    return hslToHex(h,s,l);
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}


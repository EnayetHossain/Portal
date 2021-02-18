let scene;
let camera;
let dLight;
let renderer;
let clock;
let portalParticle = [];
let centerLight;
let smokeParticle = [];

function init() {
    scene = new THREE.Scene();

    dLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dLight.position.set(0, 0, 1);
    scene.add(dLight);

    centerLight = new THREE.PointLight(0x062d89, 50, 550, 1.5);
    centerLight.position.set(0, 0, 250);
    scene.add(centerLight);

    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 10000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1000;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    particleSetup();
}

function particleSetup() {
    let loader = new THREE.TextureLoader();
    loader.load('../texture/texture.png', (texture) => {
        portalGeo = new THREE.PlaneBufferGeometry(350, 350);
        portalMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        });

        smokeGeo = new THREE.PlaneBufferGeometry(350, 350);
        smokeMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 880; p > 250; p--) {
            let particle = new THREE.Mesh(portalGeo, portalMaterial);
            particle.position.set(
                0.5 * p * Math.cos((4 * p * Math.PI) / 180),
                0.5 * p * Math.sin((4 * p * Math.PI) / 180),
                0.1 * p
            );

            particle.rotation.z = Math.random() * 360;
            portalParticle.push(particle);
            scene.add(particle)
        }

        for (let p = 0; p < 40; p++) {
            let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
            particle.position.set(
                Math.random() * 1000 - 500,
                Math.random() * 400 - 200,
                25
            );

            particle.rotation.z = Math.random() * 360;
            particle.material.opacity = 0.7;
            portalParticle.push(particle);
            scene.add(particle)
        }

        clock = new THREE.Clock();
        animate();
    });
}

function animate() {
    let delta = clock.getDelta();
    portalParticle.forEach(p =>{
        p.rotation.z -= delta * 1.5;
    });

    smokeParticle.forEach(p =>{
        p.rotation.z -= delta * 0.5;
    });


    if(Math.random() > 0.7){
        centerLight.power = 350 + Math.random() * 150;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
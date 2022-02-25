import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let mixer = new THREE.AnimationMixer();
let mixer1 = new THREE.AnimationMixer();
let mixer2 = new THREE.AnimationMixer();


// GLTFLoader
const loader = new GLTFLoader();
loader.load(
	'models/kda_evelynn_dance_stage_moonlight_edition/scene.gltf',
	(gltf) => {
        gltf.scene.translateY( -15.4 );
		scene.add( gltf.scene );
	},
	( xhr ) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
	( error ) => { console.log( 'An error happened' ); }
);
loader.load(
	'models/danceur.gltf',
	(gltf) => {
	gltf.scene.translateX(-2);
        gltf.scene.translateZ(1);
        gltf.scene.rotateY(0.8);
        scene.add( gltf.scene );
        mixer = new THREE.AnimationMixer(gltf.scene)
        mixer.clipAction((gltf).animations[0]).play()
        animate()
	},
	( xhr ) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
	( error ) => { console.log( 'An error happened' ); }
);
loader.load(
	'models/astronaut.gltf',
	(gltf) => {
        gltf.scene.translateX(-2);
        gltf.scene.translateZ(-2);
        gltf.scene.rotateY(1);
        scene.add( gltf.scene );
        mixer1 = new THREE.AnimationMixer(gltf.scene)
        mixer1.clipAction((gltf).animations[0]).play()
        animate1()
	},
	( xhr ) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
	( error ) => { console.log( 'An error happened' ); }
);
loader.load(
	'models/singe1.gltf',
	(gltf) => {
        gltf.scene.translateX(-8);
        gltf.scene.translateZ(0);
        gltf.scene.rotateY(1.5);
        gltf.scene.scale.set(0.3,0.3,0.3)
        scene.add( gltf.scene );
        mixer2 = new THREE.AnimationMixer(gltf.scene)
        mixer2.clipAction((gltf).animations[0]).play()
        animate2()
	},
	( xhr ) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
	( error ) => { console.log( 'An error happened' ); }
);

// Lights
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 6
camera.position.y = 2
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Audio
 */

// create a global audio source
const listener = new THREE.AudioListener();
camera.add( listener );
const audio = new THREE.Audio( listener );
const loaderAudio = new THREE.AudioLoader();

loaderAudio.load('audio/musique.ogg', function( buffer ) {
	audio.setBuffer( buffer );
    audio.setLoop(true);
	audio.setVolume( 1 );
	audio.play();
});

/**
 * Animate
 */

const clock = new THREE.Clock()

function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    mixer.update( delta );

    renderer.render( scene, camera );

}

const clock1 = new THREE.Clock()

function animate1() {

    requestAnimationFrame( animate1 );

    const delta = clock1.getDelta();

    mixer1.update( delta );

    renderer.render( scene, camera );

}

const clock2 = new THREE.Clock()

function animate2() {

    requestAnimationFrame( animate2 );

    const delta = clock2.getDelta();

    mixer2.update( delta );

    renderer.render( scene, camera );

}
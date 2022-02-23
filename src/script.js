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

let texture = new THREE.Texture();
let mixer = new THREE.AnimationMixer();

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
	'models/danceur_matthieu.glb',
	(gltf) => {
        scene.add( gltf.scene );
        mixer = new THREE.AnimationMixer(gltf.scene)
        mixer.clipAction((gltf).animations[0]).play()
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
camera.position.z = 2
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
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
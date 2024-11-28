import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertex from "../Shaders/vertex.glsl";
import fragment from "../Shaders/fragment.glsl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 6;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const geo = new THREE.IcosahedronGeometry(2, 20, 20);
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uColorChange: { value: 0 },
  },
});
const mesh = new THREE.Mesh(geo, material);
mesh.position.y = -2.5;
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

var tl = gsap.timeline({
  scrollTrigger :{
    trigger: ".landing",
    start: "top center",
    end: "bottom center",
    scrub:2,
  }
}, "a");
tl.to(mesh.position, {
  y: .0199,
  z: -8,
  ease: "power2.inOut"
} , "a");
tl.to(material.uniforms.uColorChange, {
  value: 1,
  ease: "power2.inOut"
} , "a");
tl.to(".heading",{
  opacity: 0,
  ease: "power2.inOut"
}, "a")
tl.to(".sub",{
  opacity: 0.9,
})
 
 

function animate() {
  window.requestAnimationFrame(animate);
  material.uniforms.uTime.value += 0.01;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

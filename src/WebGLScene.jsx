import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function WebGLScene() {
 const mount = useRef(null);
 useEffect(() => {
  const host=mount.current;
  let renderer;
  try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); } catch { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,1,.1,40); camera.position.z=6;
  const geometry=new THREE.TorusGeometry(1.25,.34,14,72);
  const material=new THREE.MeshBasicMaterial({color:0x9c70ff,wireframe:true,transparent:true,opacity:.17});
  const ring=new THREE.Mesh(geometry,material);ring.rotation.set(.5,.65,.4);scene.add(ring);
  const clock=new THREE.Clock();let frame=0, visible=false,disposed=false;let pointerX=0,pointerY=0;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  function render(){if(disposed)return;frame=0;const time=clock.getElapsedTime();if(!motion.matches){ring.rotation.y=.65+time*.055;ring.rotation.x+=(.5+pointerY*.15-ring.rotation.x)*.025;ring.rotation.z+=(.4+pointerX*.12-ring.rotation.z)*.025;}renderer.render(scene,camera);if(visible&&!document.hidden&&!motion.matches)frame=requestAnimationFrame(render);}
  function start(){if(!frame&&!disposed)render();}
  function update(){cancelAnimationFrame(frame);frame=0;if(visible&&!document.hidden)start();}
  const resize=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(visible)start();});resize.observe(host);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});observer.observe(host);
  const move=e=>{const rect=host.getBoundingClientRect();pointerX=(e.clientX-rect.left)/rect.width-.5;pointerY=(e.clientY-rect.top)/rect.height-.5;};
  window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',update);motion.addEventListener('change',update);
  const contextLost=e=>{e.preventDefault();visible=false;update();host.classList.add('webgl-fallback');};renderer.domElement.addEventListener('webglcontextlost',contextLost);
  return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',update);motion.removeEventListener('change',update);renderer.domElement.removeEventListener('webglcontextlost',contextLost);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <div ref={mount} className="webgl-scene" aria-hidden="true"/>;
}

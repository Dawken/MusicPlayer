import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import textureImg from '../../../assets/NormalMap.png'

const threejs = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		const textureLoader = new THREE.TextureLoader()

		const normalTexture = textureLoader.load(textureImg)
		// Canvas
		const canvas = canvasRef.current
		// Scene
		const scene = new THREE.Scene()
		// Objects
		const geometry = new THREE.SphereGeometry(0.65, 64, 64)
		// Materials
		const material = new THREE.MeshStandardMaterial()
		material.metalness = 0.7
		material.roughness = 0.2
		material.normalMap = normalTexture

		material.color = new THREE.Color(0x292929)
		// Mesh
		const sphere = new THREE.Mesh(geometry, material)
		scene.add(sphere)
		// Lights
		const pointLight = new THREE.PointLight(0xfffff, 0.1)
		pointLight.position.x = 2
		pointLight.position.y = 3
		pointLight.position.z = 4
		scene.add(pointLight)
		//LIGHT 2
		const pointLight2 = new THREE.PointLight(0xff00, 2)
		pointLight2.position.set(-1.86, 1, -1.65)
		pointLight2.intensity = 5
		scene.add(pointLight2)
		//LIGHT3
		const pointLight3 = new THREE.PointLight(0xffff, 2)
		pointLight3.position.set(1.3, -1.2, -1)
		pointLight3.intensity = 5
		scene.add(pointLight3)

		//Sizes
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		}
		window.addEventListener('resize', () => {
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

		// Base camera
		const camera = new THREE.PerspectiveCamera(
			75,
			sizes.width / sizes.height,
			0.1,
			100
		)
		camera.position.x = 0
		camera.position.y = 0
		camera.position.z = 2
		scene.add(camera)

		const renderer = new THREE.WebGLRenderer({
			canvas: canvas as HTMLCanvasElement,
			alpha: true,
		})
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		//Animate

		const onDocumentMouseMove = (event: MouseEvent) => {
			mouseX = event.clientX - windowX
			mouseY = event.clientY - windowY
		}

		document.addEventListener('mousemove', onDocumentMouseMove)
		let mouseX = 0
		let mouseY = 0
		let targetX = 0
		let targetY = 0

		const windowX = window.innerWidth / 2
		const windowY = window.innerHeight / 2

		const updateSphere = () => {
			sphere.position.y = window.scrollY * 0.001
		}
		window.addEventListener('scroll', updateSphere)

		const clock = new THREE.Clock()

		const tick = async () => {
			targetX = mouseX * 0.0004
			targetY = mouseY * 0.0004

			const elapsedTime = clock.getElapsedTime()
			// Update objects
			sphere.rotation.y = 0.5 * elapsedTime
			sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
			sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
			sphere.position.z += -0.05 * (targetY - sphere.rotation.x)

			// Render
			renderer.render(scene, camera)

			window.requestAnimationFrame(tick)
		}

		tick()
	}, [])
	return canvasRef
}
export default threejs

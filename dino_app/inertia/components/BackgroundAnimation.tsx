import { useEffect, useRef } from 'react'

export function BackgroundAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        class Bola {
            x: number
            y: number
            radio: number
            direX: number
            direY: number
            speed: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.radio = 10
                this.direX = (Math.random() * 2) - 1
                this.direY = (Math.random() * 2) - 1
                this.speed = 5
            }

            dibujar() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
            }

            mover() {
                this.x += this.direX * this.speed
                this.y += this.direY * this.speed

                if (this.x + this.radio > canvas!.width || this.x < 0) {
                    this.direX *= -1
                }
                if (this.y + this.radio > canvas!.height || this.y < 0) {
                    this.direY *= -1
                }
            }
        }

        let bolas: Bola[] = []
        for (let i = 0; i < 10; i++) {
            bolas.push(new Bola(canvas.width / 2, canvas.height / 2))
        }

        let animationFrameId: number

        function animar() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            bolas.forEach(bola => {
                bolas.forEach(bola2 => {
                    let dx = bola2.x - bola.x
                    let dy = bola2.y - bola.y
                    let dist = Math.sqrt(dx ** 2 + dy ** 2)

                    if (dist < 400) {
                        ctx.beginPath()
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
                        ctx.moveTo(bola.x, bola.y)
                        ctx.lineTo(bola2.x, bola2.y)
                        ctx.stroke()
                        ctx.closePath()
                    }
                })

                ctx.fillStyle = 'white'
                bola.dibujar()
                bola.mover()
            })

            animationFrameId = requestAnimationFrame(animar)
        }

        animar()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    )
}

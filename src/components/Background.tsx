import { useEffect, useRef } from 'react';

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drawStars();
            };

            const drawStars = () => {
                const numStars = 100;
                context.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < numStars; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const radius = 5;
                    context.beginPath();
                    context.arc(x, y, radius, 0, Math.PI * 2);
                    context.fillStyle = 'white';
                    context.fill();
                }
            };

            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            return () => {
                window.removeEventListener('resize', resizeCanvas);
            };
        }
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-[-1]" />;
};

export default Background;
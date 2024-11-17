import { useEffect, useRef, useState } from 'react';

export default function useRenderTracker(dependencies: any[]) {
    const [fps, setFps] = useState<number>(0);
    const lastRenderTime = useRef<number>(performance.now());

    useEffect(() => {
        const now = performance.now();
        const delta = now - lastRenderTime.current;

        // update fps using (last render time - current render time)
        if (delta > 0) {
            setFps(1000 / delta); // delta in ms
        }

        lastRenderTime.current = now;
    }, dependencies);

    return Math.round(fps);
}

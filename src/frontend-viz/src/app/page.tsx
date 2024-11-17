'use client';

import Visualizer from '@/components/Visualizer/Visualizer';
import { ChartProvider } from '@/context/ChartContext';

export default function Home() {
    return (
        <ChartProvider>
            <div className="container mx-auto py-8">
                <Visualizer />
            </div>
        </ChartProvider>
    );
}

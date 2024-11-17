import { SignalData, Props } from '@/types/schema';

export function rechartsProcessing(renderData: SignalData[]): Props[] {
    if (!renderData) return [];

    return renderData.map((entry: SignalData) => ({
        time: new Date(entry.time).toLocaleTimeString(),
        signal1: entry.signals[0] || 0,
        signal2: entry.signals[1] || 0,
        signal3: entry.signals[2] || 0,
        signal4: entry.signals[3] || 0,
        signal5: entry.signals[4] || 0,
    }));
}

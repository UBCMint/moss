export interface SignalData {
    time: string;
    signal1: number;
    signal2: number;
    signal3: number;
    signal4: number;
    signal5: number;
}

export interface ChartProps {
    renderData: SignalData[];
}

export interface SlidersProps {
    batchesPerSecond: number;
    setBatchesPerSecond: (value: number) => void;
    chartSize: number;
    setChartSize: (value: number) => void;
}

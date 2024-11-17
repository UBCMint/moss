import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { ChartProps } from '@/types/schema';
import { useChartContext } from '@/context/ChartContext';
import useRenderTracker from '@/hooks/useRenderTracker';

export default function SyncChart({ renderData = [] }: ChartProps) {
    const { signalsOn, trackFps } = useChartContext();
    const fps = useRenderTracker([renderData]);

    return (
        <>
            {signalsOn[0] && (
                <ResponsiveContainer width="90%" height={100}>
                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`}
                        />
                        <Tooltip />
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="signal1"
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}

            {signalsOn[1] && (
                <ResponsiveContainer width="90%" height={100}>
                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`}
                        />
                        <Tooltip />

                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="signal2"
                            stroke="#82ca9d"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}

            {signalsOn[2] && (
                <ResponsiveContainer width="90%" height={100}>
                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`}
                        />
                        <Tooltip />
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="signal3"
                            stroke="#ffc658"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}

            {signalsOn[3] && (
                <ResponsiveContainer width="90%" height={100}>
                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`}
                        />
                        <Tooltip />
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="signal4"
                            stroke="#ff7300"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}

            {signalsOn[4] && (
                <ResponsiveContainer width="90%" height={100}>
                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`}
                        />
                        <Tooltip />
                        <Line
                            isAnimationActive={false}
                            type="monotone"
                            dataKey="signal5"
                            stroke="#f66a69"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
            {trackFps && <p>FPS: {fps}</p>}
        </>
    );
}

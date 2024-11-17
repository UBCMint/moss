import MenuBar from './MenuBar';
import { Button } from '@/components/ui/button';
import { useChartContext } from '@/context/ChartContext';

export default function Settings() {
    const { isStreaming, setIsStreaming } = useChartContext();

    const handleStartStream = () => {
        setIsStreaming(!isStreaming);
    };

    return (
        <div className="flex justify-between">
            <MenuBar />
            <div className="flex space-x-2">
                <Button onClick={handleStartStream}>
                    {isStreaming ? 'Stop Data Stream' : 'Start Data Stream'}{' '}
                </Button>
                <Button>Reset</Button>
                <Button>Save</Button>
            </div>
        </div>
    );
}

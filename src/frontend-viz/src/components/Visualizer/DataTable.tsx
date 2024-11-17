import { Props } from '@/types/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable: React.FC<{ renderData: Props[] }> = ({ renderData }) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Signal 1</TableHead>
                <TableHead>Signal 2</TableHead>
                <TableHead>Signal 3</TableHead>
                <TableHead>Signal 4</TableHead>
                <TableHead>Signal 5</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {renderData.map((row, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.signal1}</TableCell>
                    <TableCell>{row.signal2}</TableCell>
                    <TableCell>{row.signal3}</TableCell>
                    <TableCell>{row.signal4}</TableCell>
                    <TableCell>{row.signal5}</TableCell>
                </TableRow>
                ))}
        </TableBody>
    </Table>
  );
};

export default DataTable;
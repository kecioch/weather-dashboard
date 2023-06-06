import styles from "./DayDiagramm.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  Legend,
} from "recharts";

const DayDiagramm = ({ data }) => {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" maxHeight={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis yAxisId="temp" />
          <YAxis yAxisId="rain" orientation="right" />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            dot={false}
            yAxisId="temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DayDiagramm;

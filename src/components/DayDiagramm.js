import CustomTooltip from "./CustomTooltip";
import styles from "./DayDiagramm.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Placeholder from "./Placeholder";
import Container from "./Container";

const DayDiagramm = ({ data, isLoading }) => {
  return (
    <Container className={styles.container} style={{padding: isLoading && "1em"}}>
      {!isLoading && <ResponsiveContainer width="100%">
        <LineChart
          data={data?.chart}
          margin={{ top: 20, right: 0, bottom: 5, left: 0 }}
        >
          <XAxis
            dataKey="date"
            style={{ stroke: "var(--highlight-secondary)" }}
            tickFormatter={(value) => value.substr(11)}
            tick={{ dx: -10, dy: 5 }}
          />
          <YAxis
            yAxisId="temp"
            style={{ stroke: "var(--highlight-secondary)" }}
            tickFormatter={(value) => `${value}${data?.units.temp}`}
            tick={{ dx: -5 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              borderRadius: "1em",
            }}
            content={({ payload, label }) => (
              <CustomTooltip
                label={label}
                payload={payload}
                unit={data?.units.temp}
              />
            )}
            labelFormatter={(label) => label.substr(11)}
            formatter={(value) => `${value}${data?.units.temp}`}
          />
          <Line
            type="monotone"
            dataKey="temp"
            style={{ stroke: "var(--highlight-primary)" }}
            dot={false}
            yAxisId="temp"
          />
        </LineChart>
      </ResponsiveContainer>}
        {isLoading && <Placeholder style={{height: "15em", width: "100%"}} />}
    </Container>
  );
};

export default DayDiagramm;

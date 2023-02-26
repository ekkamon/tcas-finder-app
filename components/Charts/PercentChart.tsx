import { FC } from 'react';
import { PieChart as PieChartLib, Pie, Cell } from 'recharts';

interface Props {
  data: Array<{
    name: any;
    value: any;
  }>;
  className?: string;
}

export const PIE_COLORS = ['#227BD4', '#DC4545'];

export const PercentChart: FC<Props> = ({ data, className }) => {
  return (
    <PieChartLib width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        className={className}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={PIE_COLORS[index % PIE_COLORS.length]}
          />
        ))}
      </Pie>
    </PieChartLib>
  );
};

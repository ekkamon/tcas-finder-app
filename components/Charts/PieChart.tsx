import { FC } from 'react';
import { PieChart as PieChartLib, Pie, Cell } from 'recharts';

interface Props {
  data: Array<{
    name: any;
    value: any;
  }>;
}

export const PIE_COLORS = [
  '#0088FE',
  '#D4225B',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#247559',
  '#78BB6C',
  '#482130',
  '#476D8C',
  '#DB5051',
  '#DEC0CC',
  '#F0E1D7',
];

export const PieChart: FC<Props> = ({ data }) => {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChartLib width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={90}
        fill="#8884d8"
        dataKey="value"
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

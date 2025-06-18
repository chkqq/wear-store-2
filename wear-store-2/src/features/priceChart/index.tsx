import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

interface PriceData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: PriceData[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Форматируем дату для корректного отображения
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU'); // или другой формат
  };

  return (
    <div>
      <h2 className="text-center">История изменения цены</h2>
      
      <VictoryChart
        width={800}
        height={400}
        containerComponent={<VictoryVoronoiContainer />} // Для Tooltip при наведении
      >
        <VictoryAxis
          tickFormat={(x) => formatDate(x)} // Форматируем даты на оси X
          style={{
            tickLabels: { fontSize: 14, textAnchor: 'end' }, // Наклонные подписи
          }}
        />
        <VictoryAxis dependentAxis /> {/* Ось Y */}
        <VictoryLine
          data={data}
          x="date"
          y="price"
          style={{
            data: { stroke: "#333333" }, // Цвет линии
          }}
          labels={({ datum }) => `$${datum.price} (${formatDate(datum.date)})`} // Подсказка
          labelComponent={<VictoryTooltip />} // Всплывающая подсказка
        />
      </VictoryChart>
    </div>
  );
};

export default PriceChart;
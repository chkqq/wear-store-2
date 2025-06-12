import styles from './style.module.scss';
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
    <div className={styles.priceChartBox}>
      <h2 className={styles.title}>История изменения цены</h2>
      
      <VictoryChart
        width={800}
        height={400}
        containerComponent={<VictoryVoronoiContainer />} // Для Tooltip при наведении
      >
        <VictoryAxis
          tickFormat={(x) => formatDate(x)} // Форматируем даты на оси X
          style={{
            tickLabels: { fontSize: 10, angle: -45, textAnchor: 'end' }, // Наклонные подписи
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
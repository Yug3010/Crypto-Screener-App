import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartOptions } from "chart.js";

const colors = {
  purple: {
    default: "rgba(20, 255, 236, 1)",

    half: "rgba(20, 255, 236, 0.5)",
    quarter: "rgba(20, 255, 236, 0.25)",
    zero: "rgba(20, 255, 236, 0)",
  },
  indigo: {
    default: "rgba(80, 102, 120, 1)",
    quarter: "rgba(80, 102, 120, 0.25)",
  },
};

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const LineChart = ({ graphData }: any) => {
  // chart gradient background fill color setup
  const gradientBackground: any = document
    .createElement("canvas")
    .getContext("2d");
  const gradient = gradientBackground.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colors.purple.half);
  gradient.addColorStop(0.35, colors.purple.quarter);
  gradient.addColorStop(1, colors.purple.zero);

  const data = {
    labels: graphData.yaxis,
    datasets: [
      {
        fill: true,
        backgroundColor: gradient,
        pointBackgroundColor: colors.purple.default,
        borderColor: colors.purple.default,
        data: graphData.xaxis,
        pointRadius: 0,
      },
    ],
  };

  // Pointer show custom point style by Image setting
  const pointImage = new Image();
  pointImage.src = "point.png";

  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    stacked: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        pointStyle: pointImage, // custom pointer
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      pointer: {
        enabled: false,
        mode: "nearest",
      },
      tooltip: {
        displayColors: false,
        backgroundColor: "white",
        titleColor: "black",
        titleFont: {
          size: 12,
          weight: 600,
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 5,
          left: 10,
        },
        caretSize: 0,
        callbacks: {
          title: (yDatapoint: any) => {
            return yDatapoint[0].raw;
          },
          label: () => {
            return "";
          },
        },
        mode: "index",
        intersect: false,
        cornerRadius: 5,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

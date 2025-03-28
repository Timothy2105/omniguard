'use client';

import { useState, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  LineController,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

interface KeyMoment {
  videoName: string;
  timestamp: string;
  description: string;
  isDangerous: boolean;
}

export default function StatisticsPage() {
  const [keyMoments, setKeyMoments] = useState<KeyMoment[]>([]);
  const [chartData, setChartData] = useState<{
    dangerousMomentsByVideo: any;
    dangerTypeDistribution: any;
    dangerTrend: any;
  }>({
    dangerousMomentsByVideo: null,
    dangerTypeDistribution: null,
    dangerTrend: null,
  });

  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem('savedVideos') || '[]');
    const moments: KeyMoment[] = savedVideos.flatMap((video: any) =>
      video.timestamps.map((ts: any) => ({
        videoName: video.name,
        timestamp: ts.timestamp,
        description: ts.description,
        isDangerous: ts.isDangerous || false,
      }))
    );
    console.log('Processed Moments:', moments);
    setKeyMoments(moments);

    console.log('Saved Videos:', savedVideos);

    const getDangerType = (description: string) => {
      const dangerTypes = {
        posture: ['posture', 'leaning', 'balance'],
        proximity: ['close', 'near', 'proximity', 'distance'],
        movement: ['sudden', 'rapid', 'quick', 'fast'],
        equipment: ['tool', 'machine', 'equipment', 'device'],
        environmental: ['slip', 'trip', 'fall', 'spill'],
      };

      for (const [type, keywords] of Object.entries(dangerTypes)) {
        if (keywords.some((keyword) => description.toLowerCase().includes(keyword))) {
          return type;
        }
      }
      return 'other';
    };

    const dangerousMoments = moments.filter((moment) => moment.isDangerous);

    const dangerousByVideo = dangerousMoments.reduce((acc: { [key: string]: number }, moment) => {
      acc[moment.videoName] = (acc[moment.videoName] || 0) + 1;
      return acc;
    }, {});

    const dangerTypes = dangerousMoments.reduce((acc: { [key: string]: number }, moment) => {
      const type = getDangerType(moment.description);
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const trendData = dangerousMoments.reduce((acc: { [key: string]: number }, moment) => {
      const [hours, minutes] = moment.timestamp.split(':').map(Number);
      const interval = `${hours.toString().padStart(2, '0')}:${Math.floor(minutes / 15) * 15}`.padEnd(5, '0');
      acc[interval] = (acc[interval] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      dangerousMomentsByVideo: {
        labels: Object.keys(dangerousByVideo),
        datasets: [
          {
            label: 'Dangerous Moments per Video',
            data: Object.values(dangerousByVideo),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      dangerTypeDistribution: {
        labels: Object.keys(dangerTypes),
        datasets: [
          {
            label: 'Types of Dangerous Moments',
            data: Object.values(dangerTypes),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // Red for posture
              'rgba(54, 162, 235, 0.6)', // Blue for proximity
              'rgba(255, 206, 86, 0.6)', // Yellow for movement
              'rgba(75, 192, 192, 0.6)', // Teal for equipment
              'rgba(153, 102, 255, 0.6)', // Purple for environmental
              'rgba(255, 159, 64, 0.6)', // Orange for other
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      dangerTrend: {
        labels: Object.keys(trendData).sort(),
        datasets: [
          {
            label: 'Dangerous Moments Over Time',
            data: Object.keys(trendData)
              .sort()
              .map((key) => trendData[key]),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
    });
  }, []);

  const columnHelper = createColumnHelper<KeyMoment>();

  const columns = [
    columnHelper.accessor('videoName', {
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Video Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('timestamp', {
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Timestamp
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: keyMoments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-8 items-center p-8">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Dangerous Moments by Video</h2>
            {chartData.dangerousMomentsByVideo && (
              <Bar
                data={chartData.dangerousMomentsByVideo}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Number of Dangerous Moments Detected',
                    },
                  },
                }}
              />
            )}
          </div>
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Types of Dangerous Moments</h2>
            {chartData.dangerTypeDistribution && (
              <Pie
                data={chartData.dangerTypeDistribution}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right' as const,
                    },
                    title: {
                      display: true,
                      text: 'Distribution of Danger Types',
                    },
                  },
                }}
              />
            )}
          </div>
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Danger Trend Over Time</h2>
            {chartData.dangerTrend && (
              <Line
                data={chartData.dangerTrend}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Dangerous Moments Timeline',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Incidents',
                      },
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Time (15-min intervals)',
                      },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
        <h1 className="text-3xl font-bold">Video Key Moments</h1>

        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 text-left bg-muted/50">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="border-t hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    No key moments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-muted-foreground">
          {keyMoments.length} key moments found across all saved videos
        </div>
      </div>
    </div>
  );
}

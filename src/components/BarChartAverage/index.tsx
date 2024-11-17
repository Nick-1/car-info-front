import React from 'react';
import {BarChart} from '@mui/x-charts';
import {DailyPricingRaw} from '../DailyPricing/types';
import {generateAveragePriceByDayArray} from '../DailyPricing/helpers/generate-average-price-by-day-array.ts';
import {generateDaysInMonthArray} from '../DailyPricing/helpers/generate-days-in-month-array.ts';
import {getUnavailablePercentage} from '../DailyPricing/helpers/generate-percentage-busy-by-day.ts';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface BarChartAverageProps {
    year: number,
    month: number,
    data: DailyPricingRaw[]
}

const BarChartAverage: React.FC<BarChartAverageProps> = (props) => {
    const {data, year, month} = props;
    const days = generateDaysInMonthArray(month, year);
    const prices =  generateAveragePriceByDayArray(data, year, month);
    const percentage = getUnavailablePercentage(data, year, month);

    return (
        <Box className="BarChartAverage">
            <div>
                <Typography variant="h5" gutterBottom>
                    Average price by day
                </Typography>
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: days,
                            scaleType: 'band',
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Середня ціна',
                        },
                    ]}
                    series={[
                        {
                            color: '#59a14f',
                            data: prices,
                        },
                    ]}
                    width={1000}
                    height={300}
                />
            </div>

            <div>
                <Typography variant="h5" gutterBottom>
                    Percentage of rented cars by days
                </Typography>
                <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: days,
                            scaleType: 'band',
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Відсоток зайнятих машин (%)',
                        },
                    ]}
                    series={[
                        {
                            color: '#af7aa1',
                            data: percentage,
                        },
                    ]}
                    width={1000}
                    height={300}
                />
            </div>

        </Box>

    )
}

export default BarChartAverage;

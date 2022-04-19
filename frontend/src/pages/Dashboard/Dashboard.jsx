import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '../../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox from '../../components/summary-box/SummaryBox'
import { colors } from '../../constants'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import OverallList from '../../components/overall-list/OverallList'

import { userRequest } from "../../utils/CallApi";
import { currentChange } from '../../utils/const'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const [summary, setSummary] = useState([]);
    useEffect(() => {
        userRequest().get ('admin/reports/summary').then (res => {
            res.data[0].value = currentChange(res.data[0].value);
            res.data[2].value = currentChange(res.data[2].value);
            setSummary (res.data);
          });
    }, []);
    
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-8 col-md-12">
                        <div className="row">
                            {
                                summary.map((item, index) => (
                                    <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-12">
                        <Box>
                            <RevenueByMonthsChart />
                        </Box>
                    </div>
                </div>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <div className="text-center display-6">Tổng quan</div>
                <div className="mb">
                    <OverallList />
                </div>
                
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Dashboard

const RevenueByMonthsChart = () => {
    const [dataChart, setDataChart] = useState([]);
    useEffect(() => {
        userRequest().get ('admin/reports/getdatachart').then (res => {
            setDataChart (res.data);
          });
    }, []);
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            yAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: colors.orange,
                borderRadius: 20,
                borderSkipped: 'bottom'
            }
        }
    }

    const chartData = {
        labels: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Doanh thu',
                data: dataChart
            }
        ]
    }
    return (
        <>
            <div className="title mb">
                Doanh thu theo tháng (VND)
            </div>
            <div>
                <Bar options={chartOptions} data={chartData} height={`300px`} />
            </div>
        </>
    )
}
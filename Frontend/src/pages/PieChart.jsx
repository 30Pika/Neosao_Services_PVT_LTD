import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const categories = [
    { name: "Salary", color: "#4CAF50" },
    { name: "Investments", color: "#8BC34A" },
    { name: "Business", color: "#FFC107" },
    { name: "Savings", color: "#FF9800" },
    { name: "Rent", color: "#F44336" },
    { name: "Utilities", color: "#E91E63" },
    { name: "Groceries", color: "#9C27B0" },
    { name: "Entertainment", color: "#3F51B5" },
    { name: "Travel", color: "#00BCD4" },
    { name: "Healthcare", color: "#009688" }
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, name, value, total }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percent = ((value / total) * 100).toFixed(2); // Changed to two decimal places

    return (
        <text x={x} y={y} fill="white" fontSize="13px" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${name} (${percent}%)`} {/* Updated label */}
        </text>
    );
};

const aggregateExpenses = (data) => {
    const expenses = data
        .filter(item => item.type.toLowerCase() === 'expense')
        .reduce((acc, item) => {
            const category = acc.find(cat => cat.name === item.category);
            const amount = parseFloat(item.amount);
            if (category) {
                category.value += amount;
            } else {
                acc.push({ name: item.category, value: amount });
            }
            return acc;
        }, []);

    const total = expenses.reduce((sum, entry) => sum + entry.value, 0);
    return { expenses, total };
};

const TransactionPieChart = ({ data }) => {
    const { expenses, total } = aggregateExpenses(data);

    return (
        <div className='pie-chart'>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={expenses}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={props => renderCustomizedLabel({
                            ...props,
                            name: expenses[props.index].name,
                            value: expenses[props.index].value,
                            total
                        })}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {expenses.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={categories.find(cat => cat.name === entry.name)?.color || '#000000'} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionPieChart;

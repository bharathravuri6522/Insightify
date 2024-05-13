import React, { useEffect, useState } from 'react';
import PieDisplay from './PieDisplay.jsx';

function PieChart(props) {
    const [filter, setFilter] = useState('All');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        console.log(props.data);
    }, [props.data]);

    const filteredData = () => {
        if (filter === 'All') {
            return props.data;
        } else {
            return props.data.filter(item => item.nature === filter);
        }
    };
    const PositiveCount = props.data.filter(item => item.nature === 'Positive').length;
    const NegativeCount = props.data.filter(item => item.nature === 'Negative').length;
    console.log(PositiveCount, NegativeCount);

    return (
        <div>
            <PieDisplay positiveCount={PositiveCount} negativeCount={NegativeCount} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="filter">Filter by Nature:</label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                </select>
            </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th className="table-header">ID</th>
                            <th className="table-header">Nature</th>
                            <th className="table-header">Team</th>
                            <th className="table-header">Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData().map((item, index) => (
                            <tr key={index}>
                                <td className="table-cell">{item.id}</td>
                                <td className="table-cell">{item.nature}</td>
                                <td className="table-cell">{item.team}</td>
                                <td className="table-cell">{item.feature}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PieChart;

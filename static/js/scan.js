async function fetchScanResults() {
    const res = await fetch('/api/scan-results');
    const data = await res.json();
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (!data || data.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Create table
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Host</th>
                <th>Status</th>
                <th>Port</th>
                <th>Protocol</th>
                <th>Service</th>
                <th>State</th>
                <th>Risk</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = row.risk_level;  // High, Medium, Low — used for CSS styling

        tr.innerHTML = `
            <td>${row.host}</td>
            <td>${row.status}</td>
            <td>${row.port}</td>
            <td>${row.protocol}</td>
            <td>${row.service}</td>
            <td>${row.state}</td>
            <td>${row.risk_level}</td>
        `;

        tbody.appendChild(tr);
    });

    container.appendChild(table);
}

window.addEventListener('DOMContentLoaded', fetchScanResults);

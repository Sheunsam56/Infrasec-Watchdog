async function fetchScanResults() {
    const res = await fetch('/api/scan-results');
    const data = await res.json();

    const container = document.getElementById('results');
    const tableBody = document.querySelector('#results-table tbody');
    const totalHosts = document.getElementById('total-hosts');
    const openPorts = document.getElementById('open-ports');
    const highRiskDevices = document.getElementById('high-risk');

    // Hide progress bar after scan is fetched
    document.getElementById('progress-bar-container').style.display = 'none';

    if (!data || data.length === 0) {
        container.innerHTML = '<p>No scan results found.</p>';
        return;
    }

    let hostCount = 0;
    let portCount = 0;
    let highRiskCount = 0;

    // Clear table before inserting new rows
    tableBody.innerHTML = '';

    data.forEach(device => {
        hostCount++;
        portCount += device.open_ports.length;
        if (device.risk_level === 'High') highRiskCount++;

        device.open_ports.forEach(port => {
            const row = document.createElement('tr');
            row.className = device.risk_level;

            row.innerHTML = `
                <td>${device.ip}</td>
                <td>up</td>
                <td>${port}</td>
                <td>tcp</td>
                <td>${getServiceName(port)}</td>
                <td>open</td>
                <td>${device.risk_level}</td>
            `;
            tableBody.appendChild(row);
        });
    });

    totalHosts.textContent = hostCount;
    openPorts.textContent = portCount;
    highRiskDevices.textContent = highRiskCount;
}

function getServiceName(port) {
    const services = {
        21: 'ftp', 22: 'ssh', 23: 'telnet', 53: 'domain',
        80: 'http', 135: 'msrpc', 443: 'https', 3306: 'mysql', 3389: 'rdp'
    };
    return services[port] || 'unknown';
}

// Show progress when scan button is clicked
document.querySelectorAll('form[action="/scan"]').forEach(form => {
    form.addEventListener('submit', () => {
        document.getElementById('progress-bar-container').style.display = 'block';
        simulateProgressBar();  // optional fake animation
    });
});

// Call scan results when page is loaded
window.addEventListener('DOMContentLoaded', fetchScanResults);

function simulateProgressBar() {
    const bar = document.getElementById('progress-bar');
    const message = document.getElementById('progress-message');
    bar.style.width = '0%';
    let progress = 0;

    const interval = setInterval(() => {
        progress += 10;
        bar.style.width = progress + '%';
        if (progress >= 100) clearInterval(interval);
    }, 200);
}

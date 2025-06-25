import nmap
import pandas as pd
from datetime import datetime

def get_risk_level(port):
    high_risk_ports = [3389, 23, 445, 5900]     # RDP, Telnet, SMB, VNC
    medium_risk_ports = [21, 22, 80, 139, 1433] # FTP, SSH, HTTP, NetBIOS, SQL
    low_risk_ports = [443, 53]                 # HTTPS, DNS

    if port in high_risk_ports:
        return 'High'
    elif port in medium_risk_ports:
        return 'Medium'
    elif port in low_risk_ports:
        return 'Low'
    else:
        return 'Unknown'  # For ports not in any list

def run_scan(mode='quick'):
    scanner = nmap.PortScanner()
    network = '192.168.43.0/24'  # Update as needed

    print(f"[+] Starting {mode} scan...")
    arguments = '--top-ports 1000' if mode == 'quick' else '-p-'

    scanner.scan(hosts=network, arguments=arguments)
    results = []

    scan_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for host in scanner.all_hosts():
        status = scanner[host].state()
        for proto in scanner[host].all_protocols():
            for port in scanner[host][proto].keys():
                state = scanner[host][proto][port]['state']
                service = scanner[host][proto][port].get('name', 'unknown')
                risk = get_risk_level(port)

                results.append({
                    'Host': host,
                    'Status': status,
                    'Port': port,
                    'Protocol': proto,
                    'Service': service,
                    'State': state,
                    'Risk': risk,
                    'Scan Time': scan_time
                })

    if results:
        pd.DataFrame(results).to_csv('results.csv', index=False)
    else:
        print("[!] No hosts found. CSV not written.")

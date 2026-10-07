#!/usr/bin/env python3
"""
VoltPulse Energy - Secure Backend Computation Engine
This script is executed exclusively on the server side via child_process.
It never leaks to the client browser bundle.
"""

import sys
import json
import datetime
import os

def calculate(int_a: int, int_b: int, email: str):
    total_sum = int_a + int_b
    
    # Domain-specific energy calculation metrics
    abs_capacity = abs(total_sum)
    # Average wholesale base price €70/MWh
    est_daily_eur = total_sum * 24 * 70
    # Average 0.4 metric tons CO2 offset per MWh clean dispatch
    est_co2_offset = round(total_sum * 0.4, 2)

    result = {
        "success": True,
        "sum": total_sum,
        "input_a": int_a,
        "input_b": int_b,
        "email": email,
        "runtime": {
            "engine": "Python 3 Backend Worker",
            "version": sys.version.split()[0],
            "execution_platform": sys.platform,
            "timestamp_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "pid": os.getpid()
        },
        "energy_metrics": {
            "total_aggregated_mw": total_sum,
            "est_daily_settlement_eur": est_daily_eur,
            "co2_impact_tons": est_co2_offset
        }
    }
    return result

def main():
    try:
        # Check if arguments provided via CLI: <int_a> <int_b> <email>
        if len(sys.argv) >= 3:
            raw_a = sys.argv[1].strip()
            raw_b = sys.argv[2].strip()
            email = sys.argv[3].strip() if len(sys.argv) > 3 else "unspecified@domain.com"
        else:
            # Check if input is piped through stdin as JSON
            stdin_data = sys.stdin.read().strip()
            if stdin_data:
                parsed = json.loads(stdin_data)
                raw_a = str(parsed.get("num1", 0)).strip()
                raw_b = str(parsed.get("num2", 0)).strip()
                email = str(parsed.get("email", "")).strip()
            else:
                print(json.dumps({
                    "success": False,
                    "error": "Missing input parameters. Usage: python3 calculate_sum.py <int_a> <int_b> [email]"
                }))
                sys.exit(1)

        # Strict integer parsing
        try:
            int_a = int(raw_a)
            int_b = int(raw_b)
        except ValueError:
            print(json.dumps({
                "success": False,
                "error": f"Invalid integer input: '{raw_a}' or '{raw_b}' is not a valid integer."
            }))
            sys.exit(1)

        output = calculate(int_a, int_b, email)
        print(json.dumps(output))
        sys.exit(0)

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": f"Internal execution error: {str(e)}"
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()

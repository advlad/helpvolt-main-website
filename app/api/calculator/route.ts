import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, num1, num2 } = body;

    // 1. Email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid institutional or personal email address.' },
        { status: 400 }
      );
    }

    // 2. Strict Integer validation for num1 and num2
    if (num1 === undefined || num1 === null || num1 === '') {
      return NextResponse.json(
        { success: false, error: 'First integer field is required.' },
        { status: 400 }
      );
    }

    if (num2 === undefined || num2 === null || num2 === '') {
      return NextResponse.json(
        { success: false, error: 'Second integer field is required.' },
        { status: 400 }
      );
    }

    const parsedNum1 = Number(num1);
    const parsedNum2 = Number(num2);

    if (!Number.isInteger(parsedNum1)) {
      return NextResponse.json(
        { success: false, error: 'First field must be a valid whole integer (e.g., 250, -50).' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(parsedNum2)) {
      return NextResponse.json(
        { success: false, error: 'Second field must be a valid whole integer (e.g., 175, 0).' },
        { status: 400 }
      );
    }

    // 3. Locate Python script securely on backend
    const scriptPath = path.join(process.cwd(), 'scripts', 'calculate_sum.py');

    if (!fs.existsSync(scriptPath)) {
      return NextResponse.json(
        {
          success: false,
          error: `Backend computation script not found at expected path: ${scriptPath}`,
        },
        { status: 500 }
      );
    }

    // 4. Execute python script via child_process.execFile (no shell interpolation for security)
    const pythonExecutors = ['python3', 'python'];
    let resultJson: any = null;
    let executionError: string | null = null;

    for (const pyBin of pythonExecutors) {
      try {
        resultJson = await new Promise((resolve, reject) => {
          execFile(
            pyBin,
            [scriptPath, String(parsedNum1), String(parsedNum2), emailTrimmed],
            {
              timeout: 8000,
              maxBuffer: 1024 * 512,
            },
            (error, stdout, stderr) => {
              if (error) {
                reject(new Error(stderr || error.message));
                return;
              }
              try {
                const parsed = JSON.parse(stdout.trim());
                resolve(parsed);
              } catch (parseErr) {
                reject(new Error(`Failed to parse script output: ${stdout}`));
              }
            }
          );
        });
        // If successful, break out
        if (resultJson) break;
      } catch (err: any) {
        executionError = err.message;
      }
    }

    if (!resultJson) {
      // Fallback with transparent notice if Python binary wasn't found
      return NextResponse.json(
        {
          success: false,
          error: `Python backend execution failed: ${executionError || 'Binary not accessible'}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(resultJson, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: `Server error: ${err.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

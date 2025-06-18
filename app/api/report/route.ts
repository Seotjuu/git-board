import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET(request: NextRequest) {
  const R_EXEC_PATH = `"C:/Program Files/R/R-4.4.3/bin/Rscript.exe"`; // 사용자 환경에 맞게 수정

  const rScriptPath = path.join(process.cwd(), 'report.r');
  const { stdout, stderr } = await execAsync(`${R_EXEC_PATH} ${rScriptPath}`);

  // dplyr 경고는 무시, 실제 에러만 처리
  if (stderr && !stderr.includes("The following objects are masked")) {
    console.error('R Error:', stderr);
    return new Response(JSON.stringify({ error: stderr }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const pdfPath = path.join(process.cwd(), 'Status of commit data by date.pdf');
  const fileName = 'Status of commit data by date.pdf';

  if (!(await fs.access(pdfPath).then(() => true).catch(() => false))) {
    return new Response(JSON.stringify({ error: 'PDF not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const fileBuffer = await fs.readFile(pdfPath);
  
  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}

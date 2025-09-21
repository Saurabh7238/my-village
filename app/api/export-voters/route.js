import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(request) {
  const { voters } = await request.json();

  const worksheet = XLSX.utils.json_to_sheet(voters);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Voters");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=gram-panchayat-voters.xlsx",
    },
  });
}
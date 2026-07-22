import { NextResponse } from "next/server";

export function ok(data: unknown, message = "Operation completed successfully.", status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function fail(message = "Validation failed.", errors: unknown[] = [], status = 400) {
  return NextResponse.json({ success: false, message, errors }, { status });
}

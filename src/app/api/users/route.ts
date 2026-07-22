import { NextRequest } from "next/server";
import { hash } from "bcryptjs";
import User from "@/models/User";
import { userSchema } from "@/validations/collections";
import { createCrudHandlers } from "@/lib/crudFactory";

const base = createCrudHandlers({
  model: User,
  searchableFields: ["fullName", "email"],
  createSchema: userSchema,
});

export const GET = base.GET;
export const DELETE = base.DELETE;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.password) {
      body.password = await hash(body.password, 10);
    }
    const modifiedReq = new NextRequest(req.url, {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify(body),
    });
    return base.POST(modifiedReq);
  } catch (error) {
    // If JSON parsing fails, just pass it to the base handler to return a 400
    return base.POST(req);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.password) {
      body.password = await hash(body.password, 10);
    }
    const modifiedReq = new NextRequest(req.url, {
      method: "PUT",
      headers: req.headers,
      body: JSON.stringify(body),
    });
    return base.PUT(modifiedReq);
  } catch (error) {
    return base.PUT(req);
  }
}

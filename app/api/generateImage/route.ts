import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const prompt = req.prompt;
  let textData;

  try {
    const response = await fetch("http://127.0.0.1:7071/api/generateImage", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    textData = await response.text();
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json(textData);
}

export async function GET(request: Request) {
  let textData = "";
  try {
    const response = await fetch(
      "http://localhost:7071/api/getChatGPTSuggestion",
      {
        cache: "no-store",
      }
    );
    textData = await response.text();
  } catch (error) {
    console.error(error);
  }
  return new Response(JSON.stringify(textData.trim()), { status: 200 });
}

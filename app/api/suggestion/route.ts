export async function GET(request: Request) {
  let textData = "";
  try {
    const response = await fetch(
      "https://ai-image-generator-modev.azurewebsites.net/api/getchatgptsuggestion",
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

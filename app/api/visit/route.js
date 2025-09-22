let visitCount = 0;

export async function GET() {
  visitCount += 1;
  return new Response(JSON.stringify({ count: visitCount }), {
    headers: { "Content-Type": "application/json" },
  });
}
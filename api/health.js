export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow GET method
  if (req.method !== "GET") {
    res.setHeader("Content-Type", "application/json");
    res.status(405).json({
      error: "METHOD_NOT_ALLOWED",
      message: "Only GET method is allowed",
      status: "error",
    });
    return;
  }

  try {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      message: "Hello",
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    console.error("Error in health handler:", error);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      status: "error",
      timestamp: new Date().toISOString(),
    });
  }
}



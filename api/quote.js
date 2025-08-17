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

  // Only allow POST method
  if (req.method !== "POST") {
    res.setHeader("Content-Type", "application/json");
    res.status(405).json({
      error: "METHOD_NOT_ALLOWED",
      message: "Only POST method is allowed",
      status: "error",
    });
    return;
  }

  try {
    const { action, timestamp } = req.body;

    // Validate request
    if (!action || !timestamp) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).json({
        error: "BAD_REQUEST",
        message: "Action and timestamp are required",
        status: "error",
      });
      return;
    }

    // Here you would typically process the quote request
    // For now, we'll just return success
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      message: "Quote request received successfully",
      status: "success",
      action: action,
      timestamp: timestamp,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in quote handler:", error);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      status: "error",
      timestamp: new Date().toISOString(),
    });
  }
}



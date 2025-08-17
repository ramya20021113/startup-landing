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
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes("@")) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).json({
        error: "BAD_REQUEST",
        message: "Valid email is required",
        status: "error",
      });
      return;
    }

    // Here you would typically save to database or send to email service
    // For now, we'll just return success
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      message: "Successfully subscribed",
      email: email,
      status: "success",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in subscribe handler:", error);
    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      status: "error",
      timestamp: new Date().toISOString(),
    });
  }
}



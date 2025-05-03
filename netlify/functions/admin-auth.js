// Optimal version (yours + enhanced security headers)
exports.handler = async (event) => {
  try {
    const user = event.context.clientContext?.user;
    
    if (!user) {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store" // Security best practice
        },
        body: JSON.stringify({ error: "Unauthorized" })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Frame-Options": "DENY" // Clickjacking protection
      },
      body: JSON.stringify({ 
        message: "Authenticated",
        user: user.email // Optional: Return minimal user info
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Internal Server Error",
        details: process.env.NODE_ENV === "development" ? error.message : null
      })
    };
  }
};

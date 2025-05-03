// Simple authentication verifier
exports.handler = async (event) => {
  try {
    // Netlify Identity passes user context automatically
    const user = event.context.clientContext?.user;
    
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Authenticated" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
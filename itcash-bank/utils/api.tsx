const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchData = async (endpoint: string, method: string, body?: any, token?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.msg || "Something went wrong");

    return data;
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

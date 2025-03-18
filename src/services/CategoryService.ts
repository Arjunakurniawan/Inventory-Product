import Api from "./Api/api";

// Get api Category
export const GetCategory = async () => {
  try {
    const response = await Api.get("/category");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create Api category

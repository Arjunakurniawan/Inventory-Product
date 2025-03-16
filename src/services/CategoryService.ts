import API from "../Api/api";

export const GetCategory = async () => {
  try {
    const response = await API.get("/category");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

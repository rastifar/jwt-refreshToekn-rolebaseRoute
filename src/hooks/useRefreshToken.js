import axios from "../api/axios";
import useAuth from "./useAuth";

// for creating refresh token
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async() => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      //override previous access token with the new one
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

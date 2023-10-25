const host = "http://localhost:5000/api";

export const userSignup = async (name, email, password) => {
  try {
    const response = await fetch(`${host}/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error during API request:", error);
  }
};

export const userLogin = async (email, password) => {
  try {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    return response.json();
  } catch (error) {
    console.error("Error during API request:", error);
  }
};

export const fetchUserData = async (authToken) => {
  try {
    const response = await fetch(`${host}/auth/getuser`, {
      method: "GET",
      headers: {
        "auth-token": authToken,
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error during API request:", error);
    if (error.response && error.response.status === 401) {
      console.error(
        "Unauthorized access. Redirect to login page or handle accordingly."
      );
    }
  }
};

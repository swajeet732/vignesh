const { registerUser, loginUser } = require("../services/user.services");
const sendResponse = require("../response/sendresponse");

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);
    sendResponse(res, 201, true, "User registered successfully", user);
  } catch (error) {
    sendResponse(res, 400, false, error.message, {}, [error.message]);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    sendResponse(res, 200, true, "Login successful", { user, token });
  } catch (error) {
    sendResponse(res, 400, false, error.message, {}, [error.message]);
  }
};

module.exports = { register, login };

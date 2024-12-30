import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
	try {
		// Extract token from headers or cookies
		const token = req.headers['token'] || req.cookies['token'];

		// Handle missing token
		if (!token) {
			return res.status(401).send({ status: "fail", message: "Unauthorized: Token not provided" });
		}

		// Decode the token
		const decoded = TokenDecode(token);

		// Handle invalid token
		if (!decoded) {
			return res.status(401).send({ status: "fail", message: "Unauthorized: Invalid token" });
		}

		// Add user data from the token to the request headers
		req.headers.email = decoded.email;
		req.headers.user_id = decoded.user_id;

		// Proceed to the next middleware
		next();
	} catch (err) {
		// Catch unexpected errors and respond
		res.status(401).send({ status: "fail", message: "Unauthorized: Token processing error" });
	}
};

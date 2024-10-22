import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   // Validate the incoming data
//   if (!username || !email || !password) {
//     return res.status(400).header("Content-Type", "application/json").json({
//       message: "Please provide username, email, and password",
//     });
//   }

//   try {
//     // Check if the user already exists (by email)
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).header("Content-Type", "application/json").json({
//         message: "User with this email already exists",
//       });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user instance
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     const savedUser = await newUser.save();

//     // Respond with the new user data (excluding password for security)
//     res
//       .status(201)
//       .header("Content-Type", "application/json")
//       .json({
//         message: "User registered successfully",
//         user: {
//           username: savedUser.username,
//           email: savedUser.email,
//         },
//       });
//   } catch (error) {
//     console.error("Error during user registration:", error);
//     res.status(500).header("Content-Type", "application/json").json({
//       message: "An error occurred during registration",
//     });
//   }
// };

const registerUser = asyncHandler(async (req, res) => {
  //Get data from frontend
  //Is empty any field
  //is alredy exist user: email and username
  //filde handle milter and cloudnary
  // crate user
  // response back make sure password hide

  const { username, email, password } = req.body;
  if ([username, email, password].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "Opps! you missed field to fill...");
  }

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExist) {
    throw new ApiError(410, "username or email already exist! ");
  }
  const localStorageFile = (await req.files?.avatar[0]?.path) || null;

  if (!localStorageFile) {
    throw new ApiError(420, "avatar is required");
  }

  const avatarImg = await uploadOnCloudinary(localStorageFile);
  if (!avatarImg) {
    throw new ApiError(410, "fail ti get from cloudanry avatar is required");
  }
  console.log(username, email, password, avatarImg.url);

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatarImg.url,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    ApiError(500, "user is not register yet!");
  }
  return res
    .status(210)
    .json(new ApiResponse(200, createdUser, "user registered now"));
});

export default registerUser;

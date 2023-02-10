const express = require("express");

const authController = require("../../controllers/auth.controller");
const userController = require("../../controllers/user.controller");
const roomController = require("../../controllers/room.controller.js");
const locationController = require("../../controllers/location.controller");
const commentController = require("../../controllers/comment.controller");
const bookingController = require("../../controllers/bookingRoom.controller");
const authorization = require("../../middleware/authorization");
const upload = require("../../middleware/uploadImages");

// path v1: /api/v1
const v1 = express.Router();

// Auth
v1.post("/auth/login", authController.login());
v1.post("/auth/register", authController.register());
v1.get("/auth/profile", authorization, authController.getProfile());

//User
v1.get("/users", userController.getUsers());
v1.get("/users/:userId", userController.getUserById());
v1.post("/users", userController.createUser());
v1.put("/users/:userId", userController.updateUser());
v1.delete("/users/:userId", userController.deleteUser());
v1.get("/users/search/:name", userController.searchUser());
v1.post(
  "/users/uploadAvatar/:userId",
  upload.single("file"),
  userController.uploadAvatar()
);

//Room
v1.get("/rooms", roomController.getLocations());
v1.get("/rooms/:roomId", roomController.getRoomById());
v1.post("/rooms", roomController.createRoom());
v1.put("/rooms/:roomId", roomController.updateRoom());
v1.delete("/rooms/:roomId", roomController.deleteRoom());
v1.get(
  "/rooms/searchRoomByLocation/:locationId",
  roomController.searchRoomsByLocationId()
);
v1.post(
  "/rooms/uploadImage/:roomId",
  upload.single("file"),
  roomController.uploadImage()
);

//Location
v1.get("/locations", locationController.getLocations());
v1.get("/locations/:locationId", locationController.getLocationById());
v1.post("/locations", locationController.createLocation());
v1.put("/locations/:locationId", locationController.updateLocation());
v1.delete("/locations/:locationId", locationController.deleteLocation());
v1.get("/locations/search/:quocGia", locationController.searchLocation());
v1.post(
  "/locations/uploadImage/:locationId",
  upload.single("file"),
  locationController.uploadImage()
);

// Comment
v1.get("/comments", commentController.getComments());
v1.get("/comments/user/:userId", commentController.getCommentByUser());
v1.get("/comments/room/:roomId", commentController.getCommentByRoom());
v1.post("/comments", commentController.createComment());
v1.put("/comments/:commentId", commentController.updateComment());
v1.delete("/comments/:commentId", commentController.deleteComment());

//booking
v1.get("/booking", bookingController.getBookings());
v1.get("/booking/user/:userId", bookingController.getBookingByUser());
v1.get("/booking/room/:roomId", bookingController.getBookingByRoom());
v1.post("/booking", bookingController.createBooking());
v1.put("/booking/:bookingId", bookingController.updateBooking());
v1.delete("/booking/:bookingId", bookingController.deleteBooking());

module.exports = v1;

const fetch = require("node-fetch");
const catchAsync = require("../utils/catchAsync");

exports.getPhotos = catchAsync(async (req, res, next) => {
  const { keyword, numOfPhotos } = req.query;

  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${keyword || ""}&client_id=${
      process.env.UNSPLASH_KEY
    }&count=${numOfPhotos || 1}`
  );

  const data = await response.json();

  const formattedData = data.map((photo) => ({
    id: photo.id,
    blurHash: photo.blur_hash,
    photoUrl: photo.urls.regular,
  }));

  res.status(200).json({
    status: "success",
    photos: formattedData,
  });
});

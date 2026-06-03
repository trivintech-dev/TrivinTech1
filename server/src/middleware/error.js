export const notFound = (_req, res, _next) => {
  res.status(404).json({ message: "Route not found" });
};

export const errorHandler = (err, _req, res, _next) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Email already registered. Please login or use a different email." });
  }

  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
};

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
      <h1 className="font-heading text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/" className="button-primary mt-6">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;

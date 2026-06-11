import { useEffect, useState } from "react";
import { Star, Upload, Trash2, Edit2, AlertCircle } from "lucide-react";
import api from "../api/api";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    authorName: "",
    authorTitle: "",
    authorCompany: "",
    rating: 5,
    comment: "",
    order: 0,
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get("/testimonials/admin/all");
      setTestimonials(response.data.testimonials || []);
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      setUploadingImage(true);
      const formDataImg = new FormData();
      formDataImg.append("image", imageFile);

      const response = await api.post("/testimonials/upload-image", formDataImg, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setStatusMessage("Image uploaded successfully!");
      return response.data;
    } catch (error) {
      setStatusMessage(`Image upload error: ${error.response?.data?.message || error.message}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete image
  const deleteImage = async (imagePublicId) => {
    try {
      await api.delete("/testimonials/image/delete", {
        data: { imagePublicId }
      });
      setImagePreview(null);
      setImageFile(null);
      setStatusMessage("Image deleted successfully!");
    } catch (error) {
      setStatusMessage(`Error deleting image: ${error.message}`);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = formData.avatarUrl;
      let imagePublicId = formData.imagePublicId;

      // Upload new image if selected
      if (imageFile) {
        const uploadResult = await uploadImage();
        if (uploadResult) {
          imageUrl = uploadResult.imageUrl;
          imagePublicId = uploadResult.imagePublicId;
        }
      }

      const payload = {
        ...formData,
        avatarUrl: imageUrl,
        imagePublicId
      };

      if (editingId) {
        await api.put(`/testimonials/${editingId}`, payload);
        setStatusMessage("Testimonial updated successfully!");
      } else {
        await api.post("/testimonials", payload);
        setStatusMessage("Testimonial created successfully!");
      }

      // Reset form
      setFormData({
        authorName: "",
        authorTitle: "",
        authorCompany: "",
        rating: 5,
        comment: "",
        order: 0,
        isActive: true
      });
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);

      fetchTestimonials();
    } catch (error) {
      setStatusMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setFormData({
      authorName: testimonial.authorName,
      authorTitle: testimonial.authorTitle || "",
      authorCompany: testimonial.authorCompany || "",
      rating: testimonial.rating,
      comment: testimonial.comment,
      order: testimonial.order || 0,
      isActive: testimonial.isActive,
      avatarUrl: testimonial.avatarUrl,
      imagePublicId: testimonial.imagePublicId
    });
    setImagePreview(testimonial.avatarUrl);
    setEditingId(testimonial._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await api.delete(`/testimonials/${id}`);
      setStatusMessage("Testimonial deleted successfully!");
      fetchTestimonials();
    } catch (error) {
      setStatusMessage(`Error deleting testimonial: ${error.message}`);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Testimonials</h1>
        <p className="text-gray-400">Add, edit, and manage customer testimonials and reviews</p>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {statusMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-gray-700/30 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Author Name"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            required
            className="px-4 py-2 rounded-lg bg-slate-800 border border-gray-700/30 text-white placeholder:text-gray-500"
          />
          <input
            type="text"
            placeholder="Title (e.g., CEO, Developer)"
            value={formData.authorTitle}
            onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-gray-700/30 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company"
            value={formData.authorCompany}
            onChange={(e) => setFormData({ ...formData, authorCompany: e.target.value })}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-gray-700/30 text-white placeholder:text-gray-500"
          />
          <div>
            <label className="block text-sm text-gray-400 mb-2">Rating (1-5)</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700/30 text-white"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>
          </div>
        </div>

        <textarea
          placeholder="Testimonial comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          required
          rows="4"
          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700/30 text-white placeholder:text-gray-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Display Order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-gray-700/30 text-white"
          />
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            Active
          </label>
        </div>

        {/* Image Upload */}
        <div className="border border-gray-700/30 rounded-lg p-4 space-y-3">
          <label className="block text-sm text-gray-400">Avatar/Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm"
          />
          {imagePreview && (
            <div className="flex items-end gap-3">
              <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => {
                  if (formData.imagePublicId) deleteImage(formData.imagePublicId);
                  setImagePreview(null);
                  setImageFile(null);
                  setFormData({ ...formData, avatarUrl: null, imagePublicId: null });
                }}
                className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="button-primary px-6 py-2 w-full"
        >
          {editingId ? "Update Testimonial" : "Create Testimonial"}
        </button>
      </form>

      {/* Testimonials Grid */}
      {loading ? (
        <p className="text-gray-400">Loading testimonials...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-slate-900/50 border border-gray-700/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 flex-1">
                  {testimonial.avatarUrl && (
                    <img src={testimonial.avatarUrl} alt={testimonial.authorName} className="h-12 w-12 rounded-full object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-white">{testimonial.authorName}</p>
                    {testimonial.authorTitle && <p className="text-xs text-gray-400">{testimonial.authorTitle}</p>}
                    {testimonial.authorCompany && <p className="text-xs text-gray-400">{testimonial.authorCompany}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-300 line-clamp-3">{testimonial.comment}</p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700/30">
                <span className={`text-xs px-2 py-1 rounded ${testimonial.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                  {testimonial.isActive ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-1.5 rounded-lg hover:bg-blue-500/20 text-blue-400 transition"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;

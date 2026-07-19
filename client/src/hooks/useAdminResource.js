import { useCallback, useEffect, useState } from "react";
import api from "../api/api.js";
import { useToast } from "../components/admin/ToastProvider.jsx";

/**
 * Shared CRUD helper for admin resource pages.
 * @param {object} options
 * @param {string} options.endpoint - API path e.g. "/services"
 * @param {string} [options.listKey] - response key for the array (default: last segment)
 * @param {(data: any) => any[]} [options.mapList] - custom list extractor
 * @param {string} [options.query] - query string e.g. "all=true"
 */
const useAdminResource = ({ endpoint, listKey, mapList, query = "all=true" }) => {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const key = listKey || endpoint.replace(/^\//, "").split("/").pop().replace(/-/g, "");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const url = query ? `${endpoint}?${query}` : endpoint;
      const { data } = await api.get(url);
      const list = mapList ? mapList(data) : data[key] || data[`${key}s`] || data.items || [];
      setItems(Array.isArray(list) ? list : []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load data");
      setItems([]);
    } finally {
      setLoading(false);
    }
    // toast is stable from ToastProvider; omit to avoid refetch loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, key, mapList, query]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (payload) => {
    setSaving(true);
    try {
      await api.post(endpoint, payload);
      toast.success("Created successfully");
      await fetchItems();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Create failed");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (id, payload) => {
    setSaving(true);
    try {
      await api.put(`${endpoint}/${id}`, payload);
      toast.success("Updated successfully");
      await fetchItems();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    setDeleting(true);
    try {
      await api.delete(`${endpoint}/${id}`);
      toast.success("Deleted successfully");
      await fetchItems();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    items,
    loading,
    saving,
    deleting,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};

export default useAdminResource;

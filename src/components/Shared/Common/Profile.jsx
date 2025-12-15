import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import coverImg from "../../../assets/coverImage.jpg";

const WinDonut = ({ percent }) => {
  const deg = Math.max(0, Math.min(100, percent)) * 3.6;
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-16 w-16 rounded-full"
        style={{
          background: `conic-gradient(#16a34a ${deg}deg, #e5e7eb 0deg)`,
        }}
      />
      <div>
        <p className="text-sm text-gray-500">Win rate</p>
        <p className="text-xl font-bold text-gray-900">{percent}%</p>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, loading } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1) Load profile from MongoDB
  const { data: me = {}, isLoading: meLoading } = useQuery({
    queryKey: ["me", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/me");
      return res.data;
    },
  });

  // 2) Load stats only for user role (you can load for all; just show for user)
  const { data: stats = { participated: 0, won: 0, winPercentage: 0 } } = useQuery({
    queryKey: ["meStats", user?.email],
    enabled: !!user?.email && !loading && role === "user",
    queryFn: async () => {
      const res = await axiosSecure.get("/me/stats");
      return res.data;
    },
  });

  // Local form state
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", bio: "" });

  useEffect(() => {
    if (!user?.email) return;

    setForm({
      name: me?.name || user?.displayName || "",
      image: me?.image || user?.photoURL || "",
      bio: me?.bio || "",
    });
  }, [me, user]);

  // 3) Update profile mutation
  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch("/me", {
        name: form.name,
        image: form.image,
        bio: form.bio,
      });
    },
    onSuccess: async () => {
      toast.success("Profile updated!");
      setEditing(false);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Update failed");
    },
  });

  const photoSrc = useMemo(
    () => form.image || user?.photoURL || "https://i.ibb.co/2yW4J9Q/user.png",
    [form.image, user]
  );

  if (loading || meLoading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-3">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl overflow-hidden">
        {/* Cover */}
        <img alt="cover" src={coverImg} className="w-full h-56 object-cover" />

        {/* Body */}
        <div className="flex flex-col items-center p-6 -mt-14">
          <img
            alt="profile"
            src={photoSrc}
            referrerPolicy="no-referrer"
            className="mx-auto object-cover rounded-full h-28 w-28 border-4 border-white shadow"
          />

          <span className="mt-3 px-4 py-1 text-xs font-semibold text-white bg-blue-900 rounded-full">
            {role}
          </span>

          <p className="mt-2 text-sm text-gray-500">User Id: {user?.uid}</p>

          {/* Win chart for USER only */}
          {role === "user" && (
            <div className="mt-4 w-full max-w-md rounded-xl border bg-gray-50 p-4">
              <WinDonut percent={stats.winPercentage || 0} />
              <p className="mt-2 text-xs text-gray-500">
                Won: {stats.won} / Participated: {stats.participated}
              </p>
            </div>
          )}

          {/* Info / Edit */}
          <div className="mt-6 w-full rounded-xl border p-5">
            {!editing ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Name: <span className="font-bold">{me?.name || user?.displayName}</span>
                  </p>
                  <p className="text-gray-600">
                    Email: <span className="font-bold">{user?.email}</span>
                  </p>
                  <p className="text-gray-600">
                    Bio: <span className="font-bold">{me?.bio || "—"}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-900 px-6 py-2 rounded-lg text-white hover:rounded-full transition"
                  >
                    Update Profile
                  </button>
                  
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Photo URL</label>
                  <input
                    value={form.image}
                    onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Bio</label>
                  <textarea
                    rows={3}
                    value={form.bio}
                    onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    disabled={isPending}
                    onClick={() => updateProfile()}
                    className="bg-blue-900 px-6 py-2 rounded-lg text-white disabled:opacity-60"
                  >
                    {isPending ? "Saving..." : "Save"}
                  </button>

                  <button
                    disabled={isPending}
                    onClick={() => setEditing(false)}
                    className="bg-gray-100 px-6 py-2 rounded-lg text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

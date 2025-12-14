import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import { useEffect, useMemo, useState } from "react";
import PurchaseModal from "./../Modals/PurchaseModal";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const formatTime = (ms) => {
  if (ms <= 0) return "Contest Ended";
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / (24 * 3600));
  const h = Math.floor((s % (24 * 3600)) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}d ${h}h ${m}m ${sec}s`;
};

const ContestDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // --- Contest data
  const { data: contest = {}, isLoading, isError } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const {
    image,
    name,
    description,
    instruction,
    creator,
    price,
    prize,
    category,
    participant,
    deadline,
    winnerDeclared,
    winner,
  } = contest;

  const participantCount =
    typeof participant === "number" && !isNaN(participant) ? participant : 0;

  // --- Countdown
  const deadlineDate = useMemo(() => {
    const d = deadline ? new Date(deadline) : null;
    return d && !isNaN(d.getTime()) ? d : null;
  }, [deadline]);

  const [timeLeftMs, setTimeLeftMs] = useState(0);

  useEffect(() => {
    if (!deadlineDate) return;
    const tick = () => setTimeLeftMs(deadlineDate.getTime() - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [deadlineDate]);

  const isEnded = deadlineDate ? timeLeftMs <= 0 : false;

  // --- Check if user is registered (paid) for this contest
  const { data: isJoined = false } = useQuery({
    queryKey: ["isJoined", id, user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-joined-contests");
      return res.data?.some((o) => o.contestId === id && o.status === "Paid");
    },
  });

  // --- Load my submission (if any)
  const {
    data: mySubmission = null,
    refetch: refetchMySubmission,
  } = useQuery({
    queryKey: ["mySubmission", id, user?.email],
    enabled: !!user?.email && !!isJoined,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/me?contestId=${id}`);
      return res.data;
    },
  });

  // --- Submission form state
  const [submitText, setSubmitText] = useState("");
  const [submitLink, setSubmitLink] = useState("");

  useEffect(() => {
    if (mySubmission) {
      setSubmitText(mySubmission.text || "");
      setSubmitLink(mySubmission.link || "");
    }
  }, [mySubmission]);

  // ✅ Submit mutation (single source of truth)
  const { mutateAsync: submitEntry, isPending: isSubmittingEntry } = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/submissions", {
        contestId: id,
        text: submitText.trim(),
        link: submitLink.trim(),
      });
    },
    onSuccess: async () => {
      toast.success("Submission saved!");
      await refetchMySubmission();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to submit");
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) {
    return (
      <Container>
        <div className="py-12 text-center text-gray-500">Loading contest...</div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div className="py-12 text-center text-red-500">Failed to load contest.</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-6xl">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="relative h-[280px] w-full">
            <img src={image} alt={name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
              <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800">
                {category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                {name}
              </h1>
            </div>
          </div>

          {/* Top Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Deadline</p>
              <p
                className={`mt-1 text-lg font-semibold ${
                  isEnded ? "text-red-600" : "text-gray-900"
                }`}
              >
                {deadlineDate ? formatTime(timeLeftMs) : "N/A"}
              </p>
              {isEnded && (
                <p className="mt-1 text-xs font-medium text-red-600">Contest Ended</p>
              )}
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Participants</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{participantCount}</p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Entry Fee</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">${price}</p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Prize</p>
              <p className="mt-1 text-lg font-semibold text-green-700">${prize}</p>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Heading title="About this contest" />
              <p className="mt-3 text-gray-600 whitespace-pre-line">{description}</p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Heading title="Task details" />
              <p className="mt-3 text-gray-600 whitespace-pre-line">
                {instruction || "No task details provided."}
              </p>
            </div>

            {/* Submission Bar */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Submit your entry</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Submit a short text and/or a link (Drive, GitHub, Portfolio, etc.).
                  </p>
                </div>

                {mySubmission && (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                    Submitted
                  </span>
                )}
              </div>

              {!user?.email ? (
                <p className="mt-4 text-sm text-red-600 font-medium">Please log in to submit.</p>
              ) : !isJoined ? (
                <p className="mt-4 text-sm text-red-600 font-medium">
                  You must register/pay before submitting.
                </p>
              ) : isEnded ? (
                <p className="mt-4 text-sm text-red-600 font-medium">
                  Contest ended — submissions are closed.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  <textarea
                    value={submitText}
                    onChange={(e) => setSubmitText(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your submission text (optional)..."
                  />

                  <input
                    value={submitLink}
                    onChange={(e) => setSubmitLink(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste your submission link (optional)"
                  />

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => submitEntry()}
                      disabled={isSubmittingEntry || (!submitText.trim() && !submitLink.trim())}
                      className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmittingEntry
                        ? "Submitting..."
                        : mySubmission
                        ? "Update Submission"
                        : "Submit Entry"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Hosted by</h3>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={creator?.image}
                  alt={creator?.name}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-900">{creator?.name}</p>
                  <p className="text-sm text-gray-500">{creator?.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Winner</h3>
              <div className="mt-4">
                {winnerDeclared && winner ? (
                  <div className="flex items-center gap-3 rounded-xl border bg-gray-50 p-3">
                    <img
                      src={winner.image}
                      alt={winner.name}
                      className="h-12 w-12 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{winner.name}</p>
                      <p className="text-xs font-medium text-green-700">Declared</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Winner not declared yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Entry Fee</p>
                <p className="text-xl font-bold text-gray-900">${price}</p>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => setIsOpen(true)}
                  label={isEnded ? "Contest Ended" : isJoined ? "Registered" : "Register"}
                  disabled={isEnded || isJoined}
                />
                {!isEnded && !isJoined && (
                  <p className="mt-2 text-xs text-gray-500">
                    After payment, you can submit your entry instantly.
                  </p>
                )}
              </div>
            </div>

            <PurchaseModal contest={contest} closeModal={closeModal} isOpen={isOpen} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContestDetails;

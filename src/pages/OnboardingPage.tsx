import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();

  const [fullName, setFullName] = useState("");
  const [startWeightKg, setStartWeightKg] = useState("");
  const [targetWeightKg, setTargetWeightKg] = useState("");
  const [weeklyGoalKg, setWeeklyGoalKg] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          startWeightKg: Number(startWeightKg),
          targetWeightKg: Number(targetWeightKg),
          weeklyGoalKg: Number(weeklyGoalKg),
          email: user?.email,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(`Error ${res.status}: ${text}`);
        setLoading(false);
        return;
      }

      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          placeholder="Starting Weight (kg)"
          type="number"
          value={startWeightKg}
          onChange={(e) => setStartWeightKg(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          placeholder="Target Weight (kg)"
          type="number"
          value={targetWeightKg}
          onChange={(e) => setTargetWeightKg(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          placeholder="Weekly Goal (kg)"
          type="number"
          step="0.1"
          value={weeklyGoalKg}
          onChange={(e) => setWeeklyGoalKg(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

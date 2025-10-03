// src/pages/ProfilePage.jsx
import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProfilePage({ data }) {
  // ✅ Normalize backend response (some return { data: {...} })
  const profile = data?.data || data;

  if (!data) {
    return <Loader message="⏳ Waiting for profile data..." />;
  }

  if (!profile || Object.keys(profile).length === 0) {
    return <ErrorMessage message="❌ No profile data available." />;
  }

  return (
    <div className="flex flex-col items-center py-10">
      <ProfileCard profile={profile} />
    </div>
  );
}

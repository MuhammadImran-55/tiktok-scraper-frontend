// src/components/ProfileCard.jsx

export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <img
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt={profile.username}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-500"
        />
      </div>

      {/* Username & Name */}
      <h1 className="text-2xl font-bold">@{profile.username}</h1>
      <h2 className="text-lg text-gray-600">{profile.name || "No name"}</h2>

      {/* Bio */}
      {profile.bio && (
        <p className="mt-4 text-gray-700 whitespace-pre-line">{profile.bio}</p>
      )}

      {/* Stats */}
      <div className="flex justify-around mt-6 text-center">
        <div>
          <p className="text-xl font-semibold">{profile.following || 0}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
        <div>
          <p className="text-xl font-semibold">{profile.followers || 0}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-xl font-semibold">{profile.likes || 0}</p>
          <p className="text-gray-500 text-sm">Likes</p>
        </div>
      </div>

      {/* External Link */}
      {profile.link && (
        <div className="mt-6">
          <a
            href={profile.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline break-words"
          >
            {profile.link}
          </a>
        </div>
      )}
    </div>
  );
}

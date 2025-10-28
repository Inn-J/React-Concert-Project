import React, { useEffect, useState } from 'react';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold">You’re not logged in</h2>
        <p className="text-gray-500 mt-2">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <button
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          localStorage.removeItem('currentUser');
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;

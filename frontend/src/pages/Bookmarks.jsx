import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchBookmarks();
  }, [user]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);

      const { data } = await API.get('/bookmarks');

      setBookmarks(data);
    } catch (err) {
      setError('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (storyId) => {
    try {
      await API.post(`/stories/${storyId}/bookmark`);

      setBookmarks((prev) =>
        prev.filter((story) => story._id !== storyId)
      );
    } catch (err) {
      console.error('Failed to remove bookmark');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-orange-400 text-lg animate-pulse">
          Loading bookmarks...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-orange-500 mb-6">
          🔖 Your Bookmarks
        </h1>

        {bookmarks.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-10 text-center">
            <p className="text-gray-400 text-lg">No bookmarks yet!</p>

            <p className="text-gray-600 text-sm mt-2">
              Go to home and bookmark some stories.
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
            >
              Browse Stories
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((story, index) => (
              <div
                key={story._id}
                className="bg-gray-900 rounded-xl p-5 shadow hover:shadow-orange-500/10 transition"
              >
                <div className="flex items-start gap-3">
                  {/* Index */}
                  <span className="text-orange-500 font-bold text-lg min-w-7">
                    {index + 1}.
                  </span>

                  {/* Story Content */}
                  <div className="flex-1">
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold hover:text-orange-400 transition text-base leading-snug"
                    >
                      {story.title}
                    </a>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-400">
                      <span>⬆️ {story.points} points</span>

                      <span>👤 {story.author}</span>

                      <span>
                        🕒 {new Date(story.postedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove Bookmark Button */}
                  <button
                    onClick={() => handleRemoveBookmark(story._id)}
                    className="text-orange-500 hover:text-red-400 text-xl transition cursor-pointer"
                    title="Remove bookmark"
                  >
                    🔖
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
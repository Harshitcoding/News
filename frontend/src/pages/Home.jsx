import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [bookmarked, setBookmarked] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { user } = useAuth();

    const fetchStories = async () => {
        try {
            setLoading(true);

            const { data } = await API.get(`/stories?page=${page}&limit=10`);

            setStories(data.stories);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to fetch stories');
        } finally {
            setLoading(false);
        }
    };

    const fetchBookmarks = async () => {
        try {
            const { data } = await API.get('/bookmarks');

            setBookmarked(data.map((b) => b._id));
        } catch (err) {
            console.error('Failed to fetch bookmarks');
        }
    };

    useEffect(() => {
        fetchStories();

        if (user) {
            fetchBookmarks();
        }
    }, [page, user]);

    const handleBookmark = async (storyId) => {
        if (!user) {
            alert('Please login to bookmark stories!');
            return;
        }

        try {
            await API.post(`/stories/${storyId}/bookmark`);

            setBookmarked((prev) =>
                prev.includes(storyId)
                    ? prev.filter((id) => id !== storyId)
                    : [...prev, storyId]
            );
        } catch (err) {
            console.error('Bookmark failed');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <p className="text-orange-400 text-lg animate-pulse">
                    Loading stories...
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
                    🔥 Top HackerNews Stories
                </h1>

                <div className="space-y-4">
                    {stories.map((story, index) => (
                        <div
                            key={story._id}
                            className="bg-gray-900 rounded-xl p-5 shadow hover:shadow-orange-500/10 transition"
                        >
                            <div className="flex items-start gap-3">
                                {/* Story Number */}
                                <span className="text-orange-500 font-bold text-lg min-w-7">
                                    {(page - 1) * 10 + index + 1}.
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
                                            🕒 {story.postedAt ? new Date(story.postedAt.split(' ')[0]).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }) : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* Bookmark Button */}
                                <button
                                    onClick={() => handleBookmark(story._id)}
                                    className={`text-xl transition cursor-pointer ${bookmarked.includes(story._id)
                                            ? 'text-orange-500'
                                            : 'text-gray-600 hover:text-orange-400'
                                        }`}
                                    title={
                                        bookmarked.includes(story._id)
                                            ? 'Remove bookmark'
                                            : 'Add bookmark'
                                    }
                                >
                                    {bookmarked.includes(story._id) ? '🔖' : '📑'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition"
                    >
                        ← Prev
                    </button>

                    <span className="text-gray-400 text-sm">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
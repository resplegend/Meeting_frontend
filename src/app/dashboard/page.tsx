'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { meetingsAPI } from '@/lib/api';
import MeetingForm from '@/components/MeetingForm';
import MeetingList from '@/components/MeetingList';
import ErrorModal from '@/components/ErrorModal';
import { extractErrorMessage } from '@/lib/utils';
import { CreateMeetingData, Meeting } from '@/lib/types';

export default function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;
    
    // If user is not authenticated, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }
    
    loadMeetings();
  }, [user, authLoading, router]);

  const loadMeetings = async () => {
    try {
      const data = await meetingsAPI.getAll();
      setMeetings(data);
    } catch (error: unknown) {
      setError(extractErrorMessage(error, 'Error loading meetings.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMeeting = async (meetingData: CreateMeetingData) => {
    try {
      const newMeeting = await meetingsAPI.create(meetingData);
      setMeetings([...meetings, newMeeting]);
      setShowForm(false);
    } catch (error: unknown) {
      setError(extractErrorMessage(error, 'Error creating meeting.'));
    }
  };

  const handleUpdateMeeting = async (data: [number, CreateMeetingData]) => {
    try {
      const [id, meetingData] = data;
      const updatedMeeting = await meetingsAPI.update(id, meetingData);
      setMeetings(meetings.map(m => m.id === id ? updatedMeeting : m));
      setEditingMeeting(null);
      setShowForm(false);
    } catch (error: unknown) {
      setError(extractErrorMessage(error, 'Error updating meeting.'));
    }
  };

  const handleDeleteMeeting = async (id: number) => {
    try {
      await meetingsAPI.delete(id);
      setMeetings(meetings.filter(m => m.id !== id));
    } catch (error: unknown) {
      setError(extractErrorMessage(error, 'Error deleting meeting.'));
    }
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setShowForm(true);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleMeetingFormSubmit = (data: CreateMeetingData | [number, CreateMeetingData]) => {
    if (Array.isArray(data)) {
      return handleUpdateMeeting(data);
    } else {
      return handleCreateMeeting(data);
    }
  };

  // Show loading while auth is being checked
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If no user, don't render anything (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <ErrorModal message={error} onClose={() => setError(null)} />
      )}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Create Meeting
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {showForm ? (
            <MeetingForm
              meeting={editingMeeting}
              onSubmit={handleMeetingFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingMeeting(null);
              }}
            />
          ) : (
            <MeetingList
              meetings={meetings}
              onEdit={handleEditMeeting}
              onDelete={handleDeleteMeeting}
            />
          )}
        </div>
      </main>
    </div>
  );
} 
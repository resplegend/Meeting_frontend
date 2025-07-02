'use client';

import { useState } from 'react';
import { Meeting } from '@/lib/api';
import ConfirmModal from './ConfirmModal';

interface MeetingListProps {
  meetings: Meeting[];
  onEdit: (meeting: Meeting) => void;
  onDelete: (id: number) => void;
}

export default function MeetingList({ meetings, onEdit, onDelete }: MeetingListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const handleDeleteClick = (id: number, title: string) => {
    setSelectedId(id);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
    }
    setModalOpen(false);
    setSelectedId(null);
    setSelectedTitle('');
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedId(null);
    setSelectedTitle('');
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAttendees = (attendees: string[]) => {
    return attendees.join(', ');
  };

  if (meetings.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Meetings</h2>
        <p className="text-gray-500 text-center py-8">No meetings found. Create your first meeting!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <ConfirmModal
        isOpen={modalOpen}
        title="Delete Meeting"
        message={`Are you sure you want to delete the meeting "${selectedTitle}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Meetings</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{meeting.description}</p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-600">{meeting.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Start Time:</span>
                    <span className="ml-2 text-gray-600">{formatDate(meeting.startTime)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">End Time:</span>
                    <span className="ml-2 text-gray-600">{formatDate(meeting.endTime)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Attendees:</span>
                    <span className="ml-2 text-gray-600">{formatAttendees(meeting.attendees)}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Created: {formatDate(meeting.createdAt)}
                  {meeting.updatedAt !== meeting.createdAt && (
                    <span className="ml-4">Updated: {formatDate(meeting.updatedAt)}</span>
                  )}
                </div>
              </div>
              
              <div className="ml-4 flex space-x-2">
                <button
                  onClick={() => onEdit(meeting)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(meeting.id, meeting.title)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
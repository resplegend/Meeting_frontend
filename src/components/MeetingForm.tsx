'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Meeting, CreateMeetingData } from '@/lib/types';

const meetingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  location: z.string().min(1, 'Location is required'),
  attendees: z.string().min(1, 'At least one attendee is required'),
})
.refine((data) => {
  if (!data.startTime || !data.endTime) return true;
  return new Date(data.endTime) > new Date(data.startTime);
}, {
  message: 'End time must be after start time',
  path: ['endTime'],
})
.refine((data) => {
  if (!data.startTime) return true;
  return new Date(data.startTime) > new Date();
}, {
  message: 'Start time must be in the future',
  path: ['startTime'],
});

type MeetingFormData = z.infer<typeof meetingSchema>;

interface MeetingFormProps {
  meeting?: Meeting | null;
  onSubmit: (data: CreateMeetingData | [number, CreateMeetingData]) => void | Promise<void>;
  onCancel: () => void;
}

export default function MeetingForm({ meeting, onSubmit, onCancel }: MeetingFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
    defaultValues: meeting ? {
      title: meeting.title,
      description: meeting.description,
      startTime: new Date(meeting.startTime).toISOString().slice(0, 16),
      endTime: new Date(meeting.endTime).toISOString().slice(0, 16),
      location: meeting.location,
      attendees: meeting.attendees.join(', '),
    } : undefined,
  });

  const handleFormSubmit = async (data: MeetingFormData) => {
    setIsLoading(true);
    try {
      const meetingData: CreateMeetingData = {
        ...data,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        attendees: data.attendees.split(',').map(email => email.trim()),
      };
      
      if (meeting) {
        await onSubmit([meeting.id, meetingData]);
      } else {
        await onSubmit(meetingData);
      }
    } catch (error) {
      console.error('Error submitting meeting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {meeting ? 'Edit Meeting' : 'Create New Meeting'}
      </h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              {...register('startTime')}
              type="datetime-local"
              id="startTime"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              {...register('endTime')}
              type="datetime-local"
              id="endTime"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            {...register('location')}
            type="text"
            id="location"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="attendees" className="block text-sm font-medium text-gray-700">
            Attendees (comma-separated emails)
          </label>
          <input
            {...register('attendees')}
            type="text"
            id="attendees"
            placeholder="john@example.com, jane@example.com"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.attendees && (
            <p className="mt-1 text-sm text-red-600">{errors.attendees.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : (meeting ? 'Update Meeting' : 'Create Meeting')}
          </button>
        </div>
      </form>
    </div>
  );
} 
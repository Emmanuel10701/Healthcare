"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments when component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointment'); // Ensure this endpoint is correct
        console.log(response.data); // Log the response to check its structure
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  // Show error message if there is an issue
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl my-14 font-semibold mb-4 text-center bg-gradient-to-r from-orange-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
        Appointments
      </h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-2 border-b text-slate-600 font-extrabold text-center text-xs sm:text-base">Patient</th>
            <th className="py-2 px-2 border-b text-slate-600 font-extrabold text-center text-xs sm:text-base">Appointment Date</th>
            <th className="py-2 px-2 border-b text-slate-600 font-extrabold text-center text-xs sm:text-base">Doctor Email</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="py-2 px-2 text-slate-600 font-extrabold">
                  {appointment.patientName || 'N/A'}
                </td>
                <td className="py-2 text-blue-700 text-center text-xs sm:text-base">
                  {appointment.date ? formatDate(appointment.date) : 'No Date Available'}
                </td>
                <td className="py-2 text-center text-slate-600 text-xs sm:text-base">
                  {appointment.doctorEmail || 'No Email Available'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No appointments available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";

type Job = {
  _id: string;
  title: string;
  clientName: string;
  status: "in_progress" | "completed";
  rating?: number;
  pricePerHour: number;
  hoursWorked?: number;
  totalPayment?: number;
  jobImage?: string;
};

export default function ProjectsPage() {
  const [inProgressJobs, setInProgressJobs] = useState<Job[]>([]);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingJob, setCompletingJob] = useState<string | null>(null);
  const [hoursWorked, setHoursWorked] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/handyLogin");
        return;
      }

      const response = await fetch("http://localhost:8000/api/jobs/my-jobs", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Job[] = await response.json();
        setInProgressJobs(data.filter((job) => job.status === "in_progress"));
        setCompletedJobs(data.filter((job) => job.status === "completed"));
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCompleteJob = async (jobId: string) => {
    const hours = parseFloat(hoursWorked[jobId] || "0");
    
    if (!hours || hours <= 0) {
      alert("Please enter valid hours worked");
      return;
    }

    if (!confirm(`Complete this job with ${hours} hours worked?`)) {
      return;
    }

    setCompletingJob(jobId);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ hoursWorked: hours }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Job completed! You earned $${data.earnings}`);
        fetchJobs();
        setHoursWorked({ ...hoursWorked, [jobId]: "" });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to complete job");
      }
    } catch (err) {
      console.error("Error completing job:", err);
      alert("Error completing job");
    } finally {
      setCompletingJob(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F0] text-gray-900">
      <header className="bg-[#1a1a1a] shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/handyDashboard">
            <button className="p-2 rounded-full hover:bg-[#2a2a2a] transition text-white">
              <FiArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            My <span className="text-[#D4A574]">Projects</span>
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-[#D4A574] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">In Progress</h2>
            <span className="bg-[#D4A574] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-semibold">
              {inProgressJobs.length}
            </span>
          </div>

          {inProgressJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <p className="text-gray-500 text-lg">No projects in progress</p>
              <Link href="/available-jobs" className="inline-block mt-4 px-6 py-3 bg-[#D4A574] text-[#1a1a1a] rounded-lg hover:bg-[#C4956A] transition font-semibold">
                Browse Available Jobs
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {inProgressJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#D4A574] to-[#C4956A] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl font-bold">
                        {job.title.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1a1a1a] text-lg mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Client: {job.clientName}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          In Progress ⏳
                        </span>
                      </div>
                      <p className="text-[#D4A574] font-bold text-xl mb-4">
                        ${job.pricePerHour}/hr
                      </p>

                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2 font-medium">Complete this job:</p>
                        <div className="flex gap-3">
                          <input
                            type="number"
                            step="0.5"
                            min="0.5"
                            placeholder="Hours worked"
                            value={hoursWorked[job._id] || ""}
                            onChange={(e) => setHoursWorked({ ...hoursWorked, [job._id]: e.target.value })}
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#D4A574] outline-none"
                          />
                          <button
                            onClick={() => handleCompleteJob(job._id)}
                            disabled={completingJob === job._id}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2 disabled:opacity-50"
                          >
                            <FiCheckCircle size={18} />
                            {completingJob === job._id ? "Completing..." : "Complete Job"}
                          </button>
                        </div>
                        {hoursWorked[job._id] && parseFloat(hoursWorked[job._id]) > 0 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Estimated earnings: <span className="font-bold text-green-600">${(job.pricePerHour * parseFloat(hoursWorked[job._id])).toFixed(2)}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Completed</h2>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {completedJobs.length}
            </span>
          </div>

          {completedJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <p className="text-gray-500 text-lg">No completed projects yet</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {completedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl font-bold">
                        {job.title.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-[#1a1a1a] text-lg mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Client: {job.clientName}
                      </p>
                      {job.rating && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`${
                                  i < Math.floor(job.rating!)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-gray-700 font-semibold">
                            {job.rating}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <p className="text-gray-600 text-sm">
                          <span className="font-semibold">Hours:</span> {job.hoursWorked}h
                        </p>
                        <p className="text-green-600 font-bold text-lg">
                          Earned: ${job.totalPayment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>


    </div>
  );
}
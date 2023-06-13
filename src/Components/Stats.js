import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {Pie} from "react-chartjs-2";


function Stats() {

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch("/dashboard/total-jobs")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setTotalJobs(parseInt(data));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("/dashboard/total-users")
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setTotalUsers(parseInt(data));
      })
      .catch((error) => console.error(error));
  }, []);


  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance if it exists
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("chart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Users", "Jobs"],
        datasets: [
          {
            label: "Statistics",
            data: [totalUsers, totalJobs],
            backgroundColor: [
              "rgba(54, 162, 235, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Cleanup function to destroy the chart instance when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [totalUsers, totalJobs]);
  const [jobCategories, setJobCategories] = useState([]);
  const fetchJobCategories = async () => {
    try {
      const response = await fetch('/jobs');
      if (response.ok) {
        const jobs = await response.json();
        const categories = Array.from(new Set(jobs.map((job) => job.jobCategory)));
        const categoryCounts = categories.map((category) => ({
          name: category,
          count: jobs.filter((job) => job.jobCategory === category).length,
        }));
        setJobCategories(categoryCounts);
      } else {
        console.error('Error fetching job categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching job categories:', error);
    }
  };

  console.log("start");
  let totalCount = 0;
  for (let i = 0; i < jobCategories.length; i++) {
    totalCount += jobCategories[i]?.count;
  }
  useEffect(() => {
    fetchJobCategories();
  }, []);
  let percentArray = [];
  console.log(jobCategories);

  for (let i = 0; i < jobCategories.length; i++) {
    let counter = jobCategories[i]?.count;
    console.log("Category:", counter, i);
    let percentage = (counter / totalCount) * 100;
    percentArray[i] = [];
    percentArray[i].push(percentage);
    console.log("Category:", counter, "Percentage:", percentage.toFixed(2) + "%");
  }
  const labels = jobCategories.map((category) => category.name);
  const percents = jobCategories.map((category, i) => {
    const percent = percentArray[i][0];
    return {
      name: category.name,
      percent: percent.toFixed(2),
    };
  });
  const data = jobCategories.map((category) => category.count);
  const chartData = {
    labels: labels.map((label, index) => `${label} (${percents[index].percent}%)`),
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(20, 80, 86, 0.6)',
          'rgba(300, 10, 450, 90)',
        ],
      },
    ],
  };


  console.log(chartData);



  return (
    <div class="py-24 sm:py-32 w-full">
      <div class="">
        <div class="mx-auto max-w-screen-2xl">
          <div class="grid grid-cols-1 gap-8 sm:gap-16 lg:grid-cols-3">
            <div class="bg-gray-50 shadow-md rounded-lg overflow-hidden w-auto">
              <div class="px-6 py-8">
                <div class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 1 21 12.79z"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-700 mb-2">
                  Total Users
                </h2>
                <p class="text-3xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
            <div class="bg-gray-50 shadow-md rounded-lg overflow-hidden">
              <div class="px-6 py-8">
                <div class="flex items-center justify-center w-12 h-12 rounded-md bg-green-500 text-white mb-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-700 mb-2">
                  Total Number of Jobs
                </h2>
                <p class="text-3xl font-bold text-gray-900">{totalJobs}</p>
              </div>
            </div>
            <div class="bg-gray-50 shadow-md rounded-lg overflow-hidden">
              <div class="px-6 py-8">
                <div class="flex items-center justify-center w-12 h-12 rounded-md bg-red-500 text-white mb-4">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-700 mb-2">
                  New users annually
                </h2>
                <p class="text-3xl font-bold text-gray-900">46,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 flex justify-between w-full  mx-auto">
        <canvas id="chart" class="w-1/2 h-fit"></canvas>
        <Pie data={chartData}  className="w-1/3 h-fit"/>
      </div>
    </div>
  );
}

export default Stats;

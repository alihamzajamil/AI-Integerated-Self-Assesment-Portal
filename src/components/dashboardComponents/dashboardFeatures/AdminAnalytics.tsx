'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import { UserIcon, ChartBarIcon } from '@heroicons/react/outline';

function AdminAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/dashboard/admin/analytics`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap items-center gap-10 px-5">
        {[...Array(2)].map((_, index) => (
          <Card
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 animate-pulse"
            x-chunk={`dashboard-05-chunk-${index + 1}`}
          >
            <CardHeader className="pb-2">
              <CardDescription>Loading...</CardDescription>
              <CardTitle className="text-4xl">----</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">----</div>
            </CardContent>
            <CardFooter>
              <Progress value={0} aria-label="Loading..." />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-10">
      {data.map((userData, index) => {
        const attemptsProgress = (userData.totalQuizzes / 10) * 100; // Example calculation
        const scoreProgress = (userData.totalScore / 100) * 100; // Example calculation

        return (
          <Card key={index} className="w-full p-5 shadow-lg rounded-lg border border-gray-200">
            <CardHeader className="pb-4 flex items-center">
              <UserIcon className="h-10 w-10 text-gray-500 mr-3" />
              <div>
                <CardTitle className="text-xl font-semibold text-gray-700">{userData.user.fullName}</CardTitle>
                <CardDescription className="text-sm text-gray-500">@{userData.user.userName}</CardDescription>
                <CardDescription className="text-sm text-gray-500">@{userData.user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex items-center mb-3">
                <ChartBarIcon className="h-6 w-6 text-gray-400 mr-2" />
                <span className="text-lg font-medium text-gray-700">Attempts: {userData.totalQuizzes}</span>
              </div>
              <Progress value={attemptsProgress} aria-label="Attempts progress" className="h-2 bg-blue-500 rounded" />
              <div className="flex items-center mt-5 mb-3">
                <ChartBarIcon className="h-6 w-6 text-gray-400 mr-2" />
                <span className="text-lg font-medium text-gray-700">Total Score: {userData.totalScore}</span>
              </div>
              <Progress value={scoreProgress} aria-label="Score progress" className="h-2 bg-green-500 rounded" />
            </CardContent>
            <CardFooter className="pt-4 text-sm text-gray-500">
              Last updated: {new Date(userData.user.updatedAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default AdminAnalytics;

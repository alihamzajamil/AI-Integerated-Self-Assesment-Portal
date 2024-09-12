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
  
  
  function Analytics() {
    const [data, setData] = useState({ totalAttempts: 0, totalScore: 0 });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/quiz/analytics`);
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
  
    // Calculate progress
    const attemptsProgress = (data.totalAttempts / 10) * 100; // Example calculation
    const scoreProgress = (data.totalScore / 100) * 100; // Example calculation
  
    return (
      <div className="flex flex-wrap items-center gap-10 px-5">
        <Card className="w-full sm:w-1/2 lg:w-1/3" x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>Total Attempts</CardDescription>
            <CardTitle className="text-4xl">{data.totalAttempts}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +25% from last week
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={attemptsProgress} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card className="w-full sm:w-1/2 lg:w-1/3" x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Score</CardDescription>
            <CardTitle className="text-4xl">{data.totalScore}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={scoreProgress} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  export default Analytics;
  
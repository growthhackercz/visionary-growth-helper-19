
import React from "react";
import { Skeleton } from "./skeleton";
import { Card } from "./card";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>

      {/* Goals skeleton */}
      <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-2 w-full" />
        </div>
      </Card>

      {/* Quick actions skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-8 w-full" />
          </Card>
        ))}
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      ))}
    </div>
  );
};

export const ListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
};

import React from "react";

function TransactionShimmerSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4 p-4 bg-slate-500 animate-pulse rounded-lg">
        <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
        <div className="flex flex-col flex-1 gap-2">
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-3 bg-slate-700 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-slate-700 rounded w-16"></div>
      </div>
    </div>
  );
}

export default TransactionShimmerSkeleton;

"use client";

import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene({ scene, className, ...props }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      {/* Remaining props (onLoad, event callbacks, …) are forwarded so callers
          can reach the Spline Application instance after it loads. */}
      <Spline scene={scene} className={className} {...props} />
    </Suspense>
  );
}

"use client"

import * as React from 'react'
import { Skeleton } from '../components/ui/skeleton'
import { Card, CardContent, CardHeader } from '../components/ui/card'

interface PluginSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const DefaultSuspenseFallback = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-4 w-32" />
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
  </Card>
)

export function PluginSuspense({ 
  children, 
  fallback = <DefaultSuspenseFallback /> 
}: PluginSuspenseProps) {
  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  )
}
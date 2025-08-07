import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>, 
ref?: React.ForwardedRef<HTMLElement> // remove if error
) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>,
ref?: React.ForwardedRef<HTMLImageElement> // remove if error
) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      ref={ref}
      className={cn("aspect-square w-full h-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>,
ref?: React.ForwardedRef<HTMLElement>
) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      ref={ref}
      className={cn(
        "bg-muted flex h-full w-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

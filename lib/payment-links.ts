export const pricingCheckoutLinks = {
  rctlabs: process.env.NEXT_PUBLIC_STRIPE_LINK_RCTLABS ?? "",
  "artent-ai": process.env.NEXT_PUBLIC_STRIPE_LINK_ARTENT_AI ?? "",
  "signed-ai": process.env.NEXT_PUBLIC_STRIPE_LINK_SIGNED_AI ?? "",
} as const

export const hasHostedCheckoutLinks = Object.values(pricingCheckoutLinks).some(Boolean)
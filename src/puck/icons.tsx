/**
 * Icon registry — maps icon names (stored in Puck data) to JSX elements.
 * Import this in any component that uses the iconName select field.
 */

import type { ReactNode } from 'react'
import {
  AutomationIcon,
  GrowthIcon,
  SecurityIcon,
  DataIcon,
  EcosystemIcon,
  ExchangeIcon,
  BankIcon,
  CardIcon,
  PartnerIcon,
} from '@/components/ui/Icons'

export const ICONS: Record<string, ReactNode> = {
  AutomationIcon: <AutomationIcon />,
  GrowthIcon:     <GrowthIcon />,
  SecurityIcon:   <SecurityIcon />,
  DataIcon:       <DataIcon />,
  EcosystemIcon:  <EcosystemIcon />,
  ExchangeIcon:   <ExchangeIcon />,
  BankIcon:       <BankIcon />,
  CardIcon:       <CardIcon />,
  PartnerIcon:    <PartnerIcon />,
}

/** Derive select options from the ICONS registry */
export const iconOptions = Object.keys(ICONS).map((k) => ({
  label: k.replace('Icon', ''),
  value: k,
}))

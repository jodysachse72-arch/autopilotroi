/* ═══════════════════════════════════════════════════════════════
   BACKEND PRIMITIVES — barrel
   Import from '@/components/backend' to keep page imports tidy.
   ═══════════════════════════════════════════════════════════════ */

export { default as SidebarShell } from './SidebarShell'
export type { SidebarLink, SidebarShellProps } from './SidebarShell'

export {
  Card,
  SectionHeader,
  StatCard,
  ActionCard,
  EmptyState,
} from './cards'
export type {
  CardProps,
  SectionHeaderProps,
  StatCardProps,
  StatTrend,
  ActionCardProps,
  EmptyStateProps,
} from './cards'

export {
  FormField,
  FormInput,
  FormSelect,
  FormTextarea,
  FormButton,
  FormRow,
} from './forms'
export type {
  FormFieldProps,
  FormInputProps,
  FormSelectProps,
  FormTextareaProps,
  FormButtonProps,
  FormButtonVariant,
  FormButtonSize,
  FormRowProps,
} from './forms'

export {
  DataTable,
  FilterPill,
  StatusBadge,
  Toolbar,
} from './data'
export type {
  DataColumn,
  DataTableProps,
  FilterPillProps,
  StatusBadgeProps,
  StatusTone,
  ToolbarProps,
} from './data'

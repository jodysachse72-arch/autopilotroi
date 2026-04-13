'use client'

/* ═══════════════════════════════════════════════════════════════
   PASSWORD STRENGTH METER — Visual weak/medium/strong indicator
   Usage: <PasswordStrengthMeter password={password} />
   ═══════════════════════════════════════════════════════════════ */

interface Props {
  password: string
}

function getStrength(pw: string): { score: number; label: string; color: string; barColor: string } {
  if (!pw) return { score: 0, label: '', color: '', barColor: 'bg-white/10' }

  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 2) return { score: 1, label: 'Weak', color: 'text-red-400', barColor: 'bg-red-500' }
  if (score <= 4) return { score: 2, label: 'Medium', color: 'text-amber-400', barColor: 'bg-amber-500' }
  return { score: 3, label: 'Strong', color: 'text-emerald-400', barColor: 'bg-emerald-500' }
}

export default function PasswordStrengthMeter({ password }: Props) {
  const strength = getStrength(password)
  if (!password) return null

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              level <= strength.score ? strength.barColor : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${strength.color}`}>
        {strength.label}
        {strength.score < 3 && (
          <span className="text-white/30 ml-2">
            {strength.score === 1 ? 'Add uppercase, numbers & symbols' : 'Add symbols or more length'}
          </span>
        )}
      </p>
    </div>
  )
}

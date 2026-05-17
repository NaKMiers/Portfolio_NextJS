'use client'

import CountUp from 'react-countup'
import { useInView, useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'

type ParsedValue = {
  prefix: string
  suffix: string
  value: number | null
  decimals: number
}

type AnimatedCounterProps = {
  value: string
}

function parseCountValue(rawValue: string): ParsedValue {
  const raw = rawValue.trim()
  const match = raw.match(/^([^0-9-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/)
  if (!match) {
    return { prefix: '', suffix: '', value: null, decimals: 0 }
  }

  const [, prefix, numericPart, suffix] = match
  const normalized = numericPart.replace(/,/g, '')
  const value = Number(normalized)
  if (!Number.isFinite(value)) {
    return { prefix: '', suffix: '', value: null, decimals: 0 }
  }

  const decimals = normalized.includes('.') ? normalized.split('.')[1]?.length ?? 0 : 0

  return {
    prefix,
    suffix,
    value,
    decimals,
  }
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.75 })
  const prefersReducedMotion = useReducedMotion()
  const parsed = useMemo(() => parseCountValue(value), [value])

  if (parsed.value === null) {
    return <span>{value}</span>
  }

  const { prefix, suffix, value: endValue, decimals } = parsed

  return (
    <span ref={ref}>
      {isInView || prefersReducedMotion ? (
        <CountUp
          start={0}
          end={endValue}
          duration={prefersReducedMotion ? 0 : 2.3}
          separator=','
          decimals={decimals}
          decimal='.'
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}

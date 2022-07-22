import React from 'react'

type ArrowProps = {
  filled: boolean
}

function Arrow({ filled }: ArrowProps) {
  const fill = filled ? 'var(--black-400)' : 'white'
  const stroke = filled ? 'white' : 'var(--black-400)'

  return (
    <svg className="Arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill={fill} />
      <path d="M6 4L10 8L6 12" stroke={stroke} strokeWidth="2" />
    </svg>
  )
}

export default Arrow

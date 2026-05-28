import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function IPhoneFrame({ children }: Props) {
  return (
    <div className="relative mx-auto" style={{ width: 320, height: 660 }}>
      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[48px] p-[10px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 50%, #2c2c2e 100%)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[120px] w-[3px] h-[28px] bg-[#3a3a3c] rounded-l" />
        <div className="absolute -left-[2px] top-[165px] w-[3px] h-[50px] bg-[#3a3a3c] rounded-l" />
        <div className="absolute -left-[2px] top-[225px] w-[3px] h-[50px] bg-[#3a3a3c] rounded-l" />
        <div className="absolute -right-[2px] top-[180px] w-[3px] h-[70px] bg-[#3a3a3c] rounded-r" />

        {/* Screen bezel */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-black">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-[100px] h-[28px] bg-black rounded-full" />

          {/* Screen content */}
          <div className="relative w-full h-full overflow-hidden">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/30 rounded-full z-30" />
        </div>
      </div>
    </div>
  )
}

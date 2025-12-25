import { useEffect, useState, type JSX } from "react"

interface HealthCheckResponse {
  status: string
  message: string
  timestamp: number
}

export default function IndexPage(): JSX.Element {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://localhost:3000/api/health_check")
      .then((response) => response.json())
      .then((data) => {
        setHealthData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-normal sm:justify-center p-4">
      <div className="bg-white rounded-lg p-8 border-0 sm:border border-neutral-200 max-w-[unset] sm:max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Tuono</h1>
        <p className="text-gray-600 text-center mb-6">
          This is a simple example of how to use Tailwind CSS utility classNamees in
          Tuono.
        </p>

        {/* Health Check Response */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Health Check Response:</h2>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {healthData && (
            <pre className="text-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(healthData, null, 2)}
            </pre>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://tuono.dev"
            target="_blank"
            className="text-blue-600 underline hover:text-black flex items-center gap-1">
            Tuono Documentation
          </a>
        </div>

        <div className="w-[200px] h-[300px] relative border border-solid border-white/40 rounded-2xl overflow-hidden">
          <div className="w-full h-full p-1 absolute bg-purple-400">
            <div className="w-full h-full rounded-xl rounded-tr-[100px] rounded-br-[40px] bg-[#222]"></div>
          </div>

          <div className="w-full h-full flex items-center justify-center relative backdrop-blur-lg rounded-2xl">
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-orange-300 animate-spin"
              // style="animation-duration: 12s;"
              style={{ animationDuration: "12s" }}></div>
          </div>

          <div className="w-full h-full p-2 flex justify-between absolute inset-0">
            <div className="w-3/5 p-2 pt-3 pb-1.5 flex flex-col rounded-xl backdrop-blur-lg bg-gray-50/10 text-gray-200 font-medium font-mono">
              <span className="text-xl font-medium">Card</span>
              <span className="text-xs text-gray-400">text</span>
              <div className="w-full mt-auto flex items-center justify-center">
                <span className="text-xs text-gray-400">2025</span>
              </div>
            </div>
            <div className="h-full pt-2 flex flex-col items-end text-white/50">
              <span className="text-[10px] leading-[12px]">UIverse</span>
              <span className="text-[10px] leading-[13px]">card</span>
              <div className="w-8 h-8 mt-auto flex items-center justify-center rounded-full backdrop-blur-lg bg-gray-50/20 cursor-pointer transition-all duration-300 hover:bg-gray-50/30">
                <span className="font-serif text-white/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 12 12"
                    className="w-4 h-4">
                    <g fill="none">
                      <path
                        d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
                        fill="currentColor"></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

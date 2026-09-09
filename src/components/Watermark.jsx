export default function Watermark({ className = '' }) {
  return (
    <div
      className={`watermark-overlay ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index}>
          PMA.WTF
        </span>
      ))}
    </div>
  )
}
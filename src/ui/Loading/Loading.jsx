// ------------ CSS ----------------
import './Loading.css'

export default function Ring({size = 80, style }) {
  const circles = [...Array(4)].map((_, index) => {
    return (
      <div
        key={index}
        style={{
          borderColor: `#7a7a7a transparent transparent transparent`,
          width: size * 0.8,
          height: size * 0.8,
          margin: size * 0.1,
          borderWidth: size * 0.1,
        }}
      ></div>
    )
  })

  return (
    <div className='lds-ring' style={{ width: size, height: size, ...style }}>
      <h2>LOADING</h2> {circles}
    </div>
  )
}
import Spline from '@splinetool/react-spline'
import { ReactTyped } from 'react-typed'


export default function Narrative() {
  return (
    <div className="max-w-1xl px-30 mx-auto pb-24 flex gap-8">
      <div className="w-1/3 p-5">
         <Spline 
           scene="https://prod.spline.design/Q3VQCB2bq1JfEgrA/scene.splinecode"
           style={{ width: '150%', height: '100%' }}
         />
       </div>
       <div className="w-2/3 p-8 flex items-center text-2xl">
        <ReactTyped
          strings={["I'm a photographer and videographer who enjoys documenting people, places, and stories with a simple, honest approach. My work focuses on natural light, clean composition, and capturing moments as they unfold. Whether it's a portrait, an event, or a short film, I aim to create images and video that feel genuine and easy to connect with."]}
          typeSpeed={20}
          backSpeed={0}
          showCursor={true}
          loop={false} //only once
        />
      </div> 
    </div>
  )
}

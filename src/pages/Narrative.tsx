import { ReactTyped } from 'react-typed'
import SocialRail from '@/components/SocialRail'


export default function Narrative() {
  return (
    <div className="">
      

       <div className="p-8 flex items-center text-slate-300">
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

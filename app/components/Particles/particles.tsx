'use client' 

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine"
// import { loadAll } from "@tsparticles/all" // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles" // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim" // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic" // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export default function ParticleComponent() {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine)
      //await loadFull(engine)
      await loadSlim(engine)
      //await loadBasic(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container)
  }

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      particles: {
        color: { value: ["#3443627", "#7f5539", "#b08968", "#ddb892", "#e6ccb2", "ede0d4"] },
        links: { enable: false },
        move: { enable: true },
        number: { value: 30 },
        opacity: { value: { min: 0.1, max: 1 }},
        shape: { type: 'circle' },  
        size: { value: { min: 3, max: 5 }},
        animation: { enable: true, speed: 1, sync: false },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "",
          },
          onClick: {
            enable: true,
            mode: "",
          },
        },
        modes: {
          grab: {
            distance: 400,
            links: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
        },
        resize: true,
      },
    }), []
  )

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="w-full h-full z-[-1]"
      />
    )
  }

  return <></>
}
import { Head } from '@inertiajs/react'

export default function Home() {
  return (
    <>
      <Head title="Galería dinosaurios" />
      <section className="gallery">
        <img src="https://pbs.twimg.com/media/EsGm-vaXYAAYV8N.jpg:large" alt="dino1" />
        <img src="https://i.pinimg.com/736x/36/00/58/360058b9fffacc0f988840f7b37a9cd5.jpg" alt="dino2" />
        <img src="https://i.pinimg.com/736x/36/00/58/360058b9fffacc0f988840f7b37a9cd5.jpg" alt="dino3" />
        <img src="https://i.pinimg.com/736x/d3/52/5a/d3525a0fb09708ae339a86a59a7ced81.jpg" alt="dino4" />
        <img src="https://i.pinimg.com/736x/6c/6c/2e/6c6c2e8300437fd1a48841308f3b896a.jpg" alt="dino5" />
      </section>
    </>
  )
}
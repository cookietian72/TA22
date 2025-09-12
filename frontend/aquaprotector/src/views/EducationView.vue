<script setup lang="ts">
import { ref } from "vue";
import EduCarousel, { type EduItem } from "../components/EduCarousel.vue";
import EduDetailOverlay from "../components/EduDetailOverlay.vue";


/* ---------- IMAGES ---------- */
/* Minerals */
import imgNa from "@/assets/edu/minerals/sodium.png";
import imgCl from "@/assets/edu/minerals/chloride.png";
import imgMg from "@/assets/edu/minerals/magnesium.png";
import imgCa from "@/assets/edu/minerals/calcium.png";
import imgK from "@/assets/edu/minerals/potassium.png";
import imgSO4 from "@/assets/edu/minerals/sulfate.png";
import imgO2 from "@/assets/edu/minerals/oxygen.png";
import imgCO2 from "@/assets/edu/minerals/carbon-dioxide.png";
/* Diseases */
import imgEColi from "@/assets/edu/diseases/e-coli.png";
import imgLegionella from "@/assets/edu/diseases/legionella.png";
import imgGiardia from "@/assets/edu/diseases/giardia.png";
import imgCholera from "@/assets/edu/diseases/cholera.png";
import imgSalmonella from "@/assets/edu/diseases/salmonella.png";
/* Bacteria */
import imgSpirillum from "@/assets/edu/bacteria/spirillum.png";
import imgXenophilius from "@/assets/edu/bacteria/xenophilius.png";
import imgMethylobacterium from "@/assets/edu/bacteria/methylobacterium.png";
import imgRhodococcus from "@/assets/edu/bacteria/rhodococcus.png";

/* ---------- DATA ---------- */
const minerals: EduItem[] = [
  { key:"na", title:"Sodium (Na⁺)", pron:"“SO-dee-um”", img:imgNa, accent:"blue",
    blurb:"Hi, I’m Sodium! I love to join with Chloride to make salty taste in seawater. Without me, the ocean wouldn’t be salty!" },
  { key:"cl", title:"Chloride (Cl⁻)", pron:"“KLOR-ide”", img:imgCl, accent:"blue",
    blurb:"Hello, I’m Chloride! I’m Sodium’s best friend. Together, we are the reason you taste salt when you swim in the sea." },
  { key:"mg", title:"Magnesium (Mg²⁺)", pron:"“Mag-NEE-zee-um”", img:imgMg, accent:"blue",
    blurb:"Hi, I’m Magnesium! I keep the ocean healthy and help tiny sea plants grow strong." },
  { key:"ca", title:"Calcium (Ca²⁺)", pron:"“KAL-see-um”", img:imgCa, accent:"blue",
    blurb:"Hi, I’m Calcium! Shells, corals, and crabs love me, because I help build their strong shells." },
  { key:"k", title:"Potassium (K⁺)", pron:"“Puh-TASS-ee-um”", img:imgK, accent:"blue",
    blurb:"Hey, I’m Potassium! I’m also in bananas. In the sea, I help seaweed and tiny creatures stay healthy." },
  { key:"so4", title:"Sulfate (SO₄²⁻)", pron:"“SUL-fate”", img:imgSO4, accent:"blue",
    blurb:"Hi, I’m Sulfate! I float around in seawater and help keep the water clean and balanced." },
  { key:"o2", title:"Oxygen (O₂)", pron:"“OK-si-jen”", img:imgO2, accent:"blue",
    blurb:"Hi, I’m Oxygen! Fish and crabs breathe me in the water, just like you breathe me in the air." },
  { key:"co2", title:"Carbon Dioxide (CO₂)", pron:"“KAR-bun Dye-ox-side”", img:imgCO2, accent:"blue",
    blurb:"Hello, I’m Carbon Dioxide! Sea plants use me to make food and give back oxygen." },
];

const diseases: EduItem[] = [
  { key:"ecoli", title:"E. coli", pron:"“Ee KO-lie”", img:imgEColi, accent:"orange",
    blurb:"I live in tummies. Most of the time I’m helpful, but some naughty kinds can cause tummy aches." },
  { key:"legionella", title:"Legionella", pron:"“LEE-juh-nel-uh”", img:imgLegionella, accent:"orange",
    blurb:"I like warm water in hot tubs, fountains, and pipes. Tiny water sprays with me inside can make lungs feel sick." },
  { key:"giardia", title:"Giardia", pron:"“JEE-ar-dee-uh”", img:imgGiardia, accent:"orange",
    blurb:"I live in lakes and streams. Drinking dirty water with me inside can cause a tummy bug." },
  { key:"cholera", title:"Cholera (Vibrio cholerae)", pron:"“KOL-uh-ruh”", img:imgCholera, accent:"orange",
    blurb:"I sneak into dirty water and food and can cause watery diarrhea. Clean water keeps me away!" },
  { key:"salmonella", title:"Salmonella", pron:"“SAL-muh-nel-uh”", img:imgSalmonella, accent:"orange",
    blurb:"I hang out on raw chicken, eggs, and sometimes veggies. If food isn’t cooked well, I can cause food poisoning." },
];

const bacteria: EduItem[] = [
  { key:"spirillum", title:"Spirillum", pron:"“Spy-RILL-um”", img:imgSpirillum, accent:"teal",
    blurb:"I swim with my spiral shape—like a tiny corkscrew! Usually harmless in ponds and rivers." },
  { key:"xenophilius", title:"Xenophilius", pron:"“ZEN-oh-fill-us”", img:imgXenophilius, accent:"teal",
    blurb:"A recycling helper that thrives in tough places. Friendly neighbor!" },
  { key:"methylobacterium", title:"Methylobacterium", pron:"“METH-ih-low-bak-TEER-ee-um”", img:imgMethylobacterium, accent:"teal",
    blurb:"Lives on leaves and helps plants grow by giving vitamins. Mostly a helper." },
  { key:"rhodococcus", title:"Rhodococcus", pron:"“ROW-doe-kok-us”", img:imgRhodococcus, accent:"teal",
    blurb:"A super cleaner microbe that breaks down oily, dirty stuff and helps clean pollution." },
];

/* overlay selection */
const selected = ref<EduItem | null>(null);
const open = (item: EduItem) => (selected.value = item);
const close = () => (selected.value = null);
</script>

<template>
  <main class="page">
    <section class="intro">
      <h1>Education Page</h1>
      <p>This is where we explain clean water concepts, bacteria, etc.</p>
    </section>

    <header class="hero">
      <h1>Water Knowledge</h1>
      <p>Learn minerals, diseases and bacteria in a friendly, kid-safe way.</p>
    </header>

    <EduCarousel title="Minerals"  :items="minerals"  accent="blue"   @open="open" />
    <EduCarousel title="Diseases"  :items="diseases"  accent="orange" @open="open" />
    <EduCarousel title="Bacteria"  :items="bacteria"  accent="teal"   @open="open" />

    <EduDetailOverlay :item="selected" @close="close" />
  </main>
</template>

<style scoped>
.page { padding: 10px 0 40px; }
.intro { margin: 10px 20px; }
.hero {
  margin: 8px 16px 18px;
  border-radius: 16px;
  padding: 28px 20px;
  background: linear-gradient(135deg, #60a5fa, #22d3ee);
  color: white;
  box-shadow: 0 10px 30px rgba(34,211,238,.25);
}
.hero h1 { margin: 0 0 6px; font-size: 32px; font-weight: 900; letter-spacing: .3px; }
.hero p { margin: 0; opacity: .95; }
@media (min-width: 900px) { .hero { margin: 16px auto 22px; max-width: 980px; } }
</style>

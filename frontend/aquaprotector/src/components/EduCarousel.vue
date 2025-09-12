<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";

export type EduItem = {
  key: string;
  title: string;
  pron?: string;
  img: string;
  blurb: string;
  accent?: "blue" | "orange" | "teal";
};

const props = withDefaults(
  defineProps<{
    title: string;
    items: EduItem[];
    accent?: "blue" | "orange" | "teal";
  }>(),
  {
    title: "Education",
    items: () => [],
    accent: "blue",
  }
);

const emit = defineEmits<{
  (e: "open", item: EduItem): void;
}>();

const onOpen = (it: EduItem) => emit("open", it);

const color = (accent?: string) =>
  accent === "orange" ? "#f59e0b" : accent === "teal" ? "#14b8a6" : "#3b82f6";
</script>

<template>
  <section class="wrap">
    <div class="title" :style="{ '--accent': color(props.accent) }">
      <h2>{{ props.title }}</h2>
      <div class="line" />
    </div>

    <div v-if="props.items.length" class="scroller">
      <article
        v-for="it in props.items"
        :key="it.key"
        class="card"
        :style="{ '--accent': color(it.accent || props.accent) }"
        @click="onOpen(it)"
        role="button"
      >
        <img :src="it.img" :alt="it.title" loading="lazy" />
        <h3>{{ it.title }}</h3>
        <p class="pron" v-if="it.pron">{{ it.pron }}</p>
        <p class="blurb">{{ it.blurb }}</p>
        <button class="btn" type="button">Learn more</button>
      </article>
    </div>

    <p v-else class="empty">No content yet.</p>
  </section>
</template>

<style scoped>
.wrap { padding: 24px 16px; }
.title { display:flex; align-items:center; gap:16px; margin-bottom:12px; }
.title h2 { font-size: 28px; font-weight: 800; color: var(--accent); margin:0; }
.title .line { height: 3px; flex:1; background: linear-gradient(90deg, var(--accent), transparent); border-radius: 999px; }

.scroller {
  display: grid;
  grid-auto-columns: minmax(240px, 1fr);
  grid-auto-flow: column;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-snap-type: x mandatory;
}
.scroller::-webkit-scrollbar { height: 8px; }
.scroller::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 999px; }

.card {
  scroll-snap-align: start;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: 16px;
  background: white;
  box-shadow: 0 6px 18px rgba(0,0,0,.04);
  transition: transform .15s ease, box-shadow .15s ease;
  cursor: pointer;
}
.card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.08); }

.card img { width: 64px; height: 64px; object-fit: contain; }
.card h3 { margin: 10px 0 2px; font-size: 18px; }
.pron { color:#64748b; font-size: 13px; margin:0 0 8px; }
.blurb { color:#475569; font-size: 14px; min-height: 42px; }
.btn {
  margin-top: 10px;
  border: 0; padding: 8px 12px; border-radius: 10px; font-weight: 600;
  background: var(--accent); color: white;
}
.empty { color:#94a3b8; font-size:14px; padding: 8px 2px; }
@media (min-width: 900px) {
  .scroller { grid-auto-columns: minmax(280px, 1fr); }
  .card img { width: 72px; height: 72px; }
}
</style>
